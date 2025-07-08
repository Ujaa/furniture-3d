import { useFrame } from "@react-three/fiber";
import { detectCollision } from "@/shared/utils/collision";
import { useRoomStore } from "@/stores/useRoomStore";
import House from "./House";
import SceneMeshes from "./SceneMehses";
import { useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const { selectedRef, houseRef, mergedHouse, mode } = useRoomStore();
  const previousPosition = useRef<{ x: number; y: number; z: number } | null>(
    null
  );

  useFrame(() => {
    if (
      selectedRef &&
      selectedRef.current &&
      mergedHouse &&
      mode !== "none" &&
      mode !== "rotate"
    ) {
      const object = selectedRef.current;

      if (!previousPosition.current) {
        previousPosition.current = {
          x: object.position.x,
          y: object.position.y,
          z: object.position.z,
        };
      }

      const collision = detectCollision(selectedRef.current, mergedHouse);

      const raycaster = new THREE.Raycaster();
      const directions = [
        new THREE.Vector3(1, 0, 0), // +X
        new THREE.Vector3(-1, 0, 0), // -X
        new THREE.Vector3(0, 1, 0), // +Y
        new THREE.Vector3(0, -1, 0), // -Y
        new THREE.Vector3(0, 0, 1), // +Z
        new THREE.Vector3(0, 0, -1), // -Z
      ];

      const objectCenter = new THREE.Vector3();
      new THREE.Box3().setFromObject(object).getCenter(objectCenter);

      let validRayCount = 0;
      const houseMesh = houseRef?.current as THREE.Object3D;

      for (const dir of directions) {
        raycaster.set(objectCenter, dir);
        const intersects = raycaster.intersectObject(houseMesh, true);
        if (intersects.length > 0) {
          validRayCount++;
        }
      }

      if (collision || validRayCount !== 6) {
        if (previousPosition.current) {
          object.position.set(
            previousPosition.current.x,
            previousPosition.current.y,
            previousPosition.current.z
          );
        }
      } else {
        previousPosition.current = {
          x: object.position.x,
          y: object.position.y,
          z: object.position.z,
        };
      }
    }
  });

  return (
    <>
      <House />
      <SceneMeshes />
    </>
  );
}
