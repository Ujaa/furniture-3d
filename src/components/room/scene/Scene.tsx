import { useFrame } from "@react-three/fiber";
import { detectCollision } from "@/shared/utils/collision";
import { useRoomStore } from "@/stores/useRoomStore";
import House from "./House";
import SceneMeshes from "./SceneMehses";
import { useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const selectedRef = useRoomStore((s) => s.selectedRef);
  const houseRef = useRoomStore((s) => s.houseRef);
  const mergedHouse = useRoomStore((s) => s.mergedHouse);
  const mode = useRoomStore((s) => s.mode);
  const previousPosition = useRef<{ x: number; y: number; z: number } | null>(
    null
  );

  const directions = [
    new THREE.Vector3(1, 0, 0), // +X
    new THREE.Vector3(-1, 0, 0), // -X
    new THREE.Vector3(0, 1, 0), // +Y
    new THREE.Vector3(0, -1, 0), // -Y
    new THREE.Vector3(0, 0, 1), // +Z
    new THREE.Vector3(0, 0, -1), // -Z
  ];

  function isOutsideHouse(object: THREE.Object3D, house: THREE.Object3D) {
    const raycaster = new THREE.Raycaster();
    const objectCenter = new THREE.Box3()
      .setFromObject(object)
      .getCenter(new THREE.Vector3());

    const validRayCount = directions.reduce((count, dir) => {
      raycaster.set(objectCenter, dir);
      const intersects = raycaster.intersectObject(house, true);
      return count + (intersects.length > 0 ? 1 : 0);
    }, 0);

    return validRayCount !== 6;
  }

  useFrame(() => {
    if (
      !selectedRef?.current ||
      !mergedHouse ||
      !houseRef?.current ||
      mode === "none" ||
      mode === "rotate"
    ) {
      return;
    }

    const object = selectedRef.current;

    if (!previousPosition.current) {
      previousPosition.current = object.position.clone();
    }

    const hasCollision = detectCollision(object, mergedHouse);
    const isOutside = isOutsideHouse(object, houseRef.current);

    if (hasCollision || isOutside) {
      object.position.copy(previousPosition.current);
    } else {
      previousPosition.current = object.position.clone();
    }
  });

  return (
    <>
      <House />
      <SceneMeshes />
    </>
  );
}
