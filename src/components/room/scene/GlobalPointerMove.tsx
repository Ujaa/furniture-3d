import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRoomStore } from "@/stores/useRoomStore";

export default function GlobalPointerMove() {
  const { gl, camera } = useThree();
  const { selectedRef, mode } = useRoomStore();

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!selectedRef || !selectedRef.current || mode === "none") return;

      e.stopPropagation();
      const rect = gl.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersectionPoint = new THREE.Vector3();

      if (mode === "moveHorizontal") {
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        raycaster.ray.intersectPlane(plane, intersectionPoint);
        selectedRef.current.position.set(
          intersectionPoint.x,
          selectedRef.current.position.y,
          intersectionPoint.z
        );
      } else if (mode === "moveVertical") {
        const plane = new THREE.Plane(
          new THREE.Vector3(0, 0, 1),
          selectedRef.current.position.z
        );
        raycaster.ray.intersectPlane(plane, intersectionPoint);
        selectedRef.current.position.set(
          selectedRef.current.position.x,
          intersectionPoint.y,
          selectedRef.current.position.z
        );
      }
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, camera, selectedRef, mode]);

  return null;
}
