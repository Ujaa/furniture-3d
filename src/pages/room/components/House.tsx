import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import * as THREE from "three";
import { useRoomStore } from "@/stores/useRoomStore";

export default function House() {
  const houseUrl =
    "https://firebasestorage.googleapis.com/v0/b/planner-859ca.firebasestorage.app/o/house.glb?alt=media&token=4f0e8cae-9002-4517-98f8-347a5c5a92cc";
  const houseRef = useRef();
  const { setHouseRef, setMergedHouse } = useRoomStore();
  const { scene } = useGLTF(houseUrl);

  useEffect(() => {
    setHouseRef(houseRef);
  }, [setHouseRef]);

  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    scene.position.y = -box.min.y;
    console.log(scene.position.y);

    const geometries = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        const clonedGeom = child.geometry.clone();
        child.updateMatrixWorld(true);
        clonedGeom.applyMatrix4(child.matrixWorld);
        geometries.push(clonedGeom);

        // 재질의 side를 BackSide로 설정하여 안쪽이 보이도록 조정
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => (mat.side = THREE.BackSide));
        } else if (child.material) {
          child.material.side = THREE.FrontSide;
        }
      }
    });

    const mergedGeometry = BufferGeometryUtils.mergeGeometries(
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
