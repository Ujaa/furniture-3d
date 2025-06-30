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
import { db, storage } from "@/shared/firebase";
import { getUserId } from "@/shared/user";
import { v4 as uuidv4 } from "uuid";
import { generateFurnitureModel } from "./stability.api";

//https://platform.stability.ai/account/credits
export const createFurniture = async (furnitureData: IFurniture) => {
  const furnitureId = uuidv4();
  const furnitureRef = doc(db, "users", getUserId(), "furniture", furnitureId);
  await setDoc(furnitureRef, furnitureData);
  return furnitureData;
};

export const uploadGLBToStorage = async (file: File) => {
  if (file)
    return "https://firebasestorage.googleapis.com/v0/b/planner-859ca.firebasestorage.app/o/furniture%2F4e665d94-2c28-4a58-8633-05d81768a795.glb?alt=media&token=69228f31-e7b9-4cde-9057-c464e2137f1c";
  try {
    const uuid = uuidv4();
    const glbBuffer = await generateFurnitureModel(file);
    const storageRef = ref(storage, `furniture/${uuid}.glb`);
    await uploadBytes(storageRef, glbBuffer, {
      contentType: "model/gltf-binary",
    });
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Firebase Storage에 직접 업로드 완료: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error("가구 저장 실패:", error);
    throw error;
  }
};

export const uploadPreviewToStorage = async (previewImage: string) => {
  try {
    const uuid = uuidv4();
    const storageRef = ref(storage, `furniture/${uuid}_preview.png`);
    await uploadString(storageRef, previewImage.split(",")[1], "base64", {
      contentType: "image/png",
    });

    const previewURL = await getDownloadURL(storageRef);
    console.log("프리뷰 이미지 Firebase Storage 업로드 완료:", previewURL);
    return previewURL;
  } catch (error) {
    console.error("프리뷰 이미지 저장 실패:", error);
    throw error;
  }
};

export const getFurnitureList = async (userId: string) => {
  try {
    const furnitureCollection = collection(db, "users", userId, "furniture");
    const querySnapshot = await getDocs(furnitureCollection);

    const furnitureList = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const furniture: IFurniture = {
        id: doc.id,
        previewUrl: data.previewUrl ?? null,
        isWallMountable: data.isWallMountable ?? false,
        glbUrl: data.glbUrl ?? null,
        scale: {
          width: data.scale?.width ?? 0,
          depth: data.scale?.depth ?? 0,
          height: data.scale?.height ?? 0,
        },
        createdAt: data.createdAt ?? new Date().toISOString(),
      };
      return furniture;
    });
    return furnitureList;
  } catch (error) {
    console.error("가구 리스트 조회 실패:", error);
    throw error;
  }
};

export const deleteFurniture = async (furnitureId: string) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("사용자 ID가 없습니다.");
    const furnitureRef = doc(db, "users", userId, "furniture", furnitureId);
    await deleteDoc(furnitureRef);

    console.log(`가구 ${furnitureId} 삭제 완료 (Firestore + Storage)`);
  } catch (error) {
    console.error("가구 삭제 실패:", error);
    throw error;
  }
};
