import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { db, storage } from "@/api/firebase";
import { v4 as uuidv4 } from "uuid";
import { generateFurnitureModel } from "../stability/stability.api";

const SAMPLE_GLB_URL =
  "https://firebasestorage.googleapis.com/v0/b/planner-859ca.firebasestorage.app/o/furniture%2F1f2155d2-ddd3-48af-8338-11491b07566a.glb?alt=media&token=347a28c1-44f0-4bfe-b976-787907272bbf";

/**
 * Firestore에 가구 데이터를 생성
 * @param furnitureData 생성할 가구 데이터
 * @returns 생성된 가구 데이터
 */
const createFurniture = async (userId: string, furnitureData: IFurniture) => {
  const furnitureId = uuidv4();
  const furnitureRef = doc(db, "users", userId, "furniture", furnitureId);
  await setDoc(furnitureRef, furnitureData);
  return furnitureData;
};

/**
 * GLB 모델 파일을 Firebase Storage에 업로드
 * @param file 업로드할 파일
 * @returns 업로드된 파일의 URL
 */
const uploadGLBToStorage = async (file: File) => {
  if (file) return SAMPLE_GLB_URL;
  const glbBuffer = await generateFurnitureModel(file);
  const storageRef = ref(storage, `furniture/${uuidv4()}.glb`);
  await uploadBytes(storageRef, glbBuffer, {
    contentType: "model/gltf-binary",
  });
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/**
 * 프리뷰 이미지를 Firebase Storage에 업로드합니다.
 * @param previewImage 업로드할 Base64 인코딩된 이미지
 * @returns 업로드된 이미지의 URL
 */
const uploadPreviewToStorage = async (previewImage: string) => {
  const uuid = uuidv4();
  const storageRef = ref(storage, `furniture/${uuid}_preview.png`);
  await uploadString(storageRef, previewImage.split(",")[1], "base64", {
    contentType: "image/png",
  });
  const previewURL = await getDownloadURL(storageRef);
  return previewURL;
};

/**
 * 특정 사용자 ID로 Firestore에서 가구 목록을 조회합니다.
 * @param userId 사용자 ID
 * @returns 가구 목록 배열
 */
const getFurnitureList = async (userId: string) => {
  const furnitureCollection = collection(db, "users", userId, "furniture");
  const querySnapshot = await getDocs(furnitureCollection);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      previewUrl: data.previewUrl ?? null,
      isWallMountable: data.isWallMountable ?? false,
      glbUrl: data.glbUrl ?? null,
      size: {
        width: data.size?.width ?? 0,
        depth: data.size?.depth ?? 0,
        height: data.size?.height ?? 0,
      },
      createdAt: data.createdAt ?? new Date().toISOString(),
    } as IFurniture;
  });
};

/**
 * Firestore에서 특정 가구 데이터를 삭제합니다.
 * @param furnitureId 삭제할 가구 ID
 */
const deleteFurniture = async (userId: string, furnitureId: string) => {
  const furnitureRef = doc(db, "users", userId, "furniture", furnitureId);
  await deleteDoc(furnitureRef);
};

export const furnitureService = {
  createFurniture,
  uploadGLBToStorage,
  uploadPreviewToStorage,
  getFurnitureList,
  deleteFurniture,
};
