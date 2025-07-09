import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import { useRoomStore } from "@/stores/useRoomStore";

export default function House() {
  const houseUrl =
    "https://firebasestorage.googleapis.com/v0/b/planner-859ca.firebasestorage.app/o/house.glb?alt=media&token=4f0e8cae-9002-4517-98f8-347a5c5a92cc";
  const houseRef = useRef();
  const setHouseRef = useRoomStore((s) => s.setHouseRef);
  const setMergedHouse = useRoomStore((s) => s.setMergedHouse);
  const { scene } = useGLTF(houseUrl);

  useEffect(() => {
    setHouseRef(houseRef);
  }, [setHouseRef]);

  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    scene.position.y = -box.min.y;
    //@ts-expect-error: any 타입이라서 오류날 수도 있음
    const geometries = [];
    scene.traverse((child) => {
      //@ts-expect-error: isMesh가 없을 수 있음
      if (child.isMesh) {
        //@ts-expect-error: geometry가 없을 수 있음
        const clonedGeom = child.geometry.clone();
        child.updateMatrixWorld(true);
        clonedGeom.applyMatrix4(child.matrixWorld);
        geometries.push(clonedGeom);

        // 재질의 side를 설정하여 안쪽이 보이도록 조정
        //@ts-expect-error: material이 없을 수 있음
        if (Array.isArray(child.material)) {
          // 메터리얼이 배열일 수도
          //@ts-expect-error: material이 없을 수 있음
          child.material.forEach((mat) => (mat.side = THREE.BackSide));
          //@ts-expect-error: material이 없을 수 있음
        } else if (child.material) {
          // 단일 메터리얼일 수도
          //@ts-expect-error: material이 없을 수 있음
          child.material.side = THREE.FrontSide;
        }
      }
    });

    const mergedGeometry = BufferGeometryUtils.mergeGeometries(
      //@ts-expect-error: any
      geometries,
      false
    );
    if (mergedGeometry) {
      mergedGeometry.computeBoundsTree();
      setMergedHouse(mergedGeometry);
    }
  }, [scene, setMergedHouse]);

  return <primitive scale={[40, 40, 40]} ref={houseRef} object={scene} />;
}
