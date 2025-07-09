import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRoomStore } from "@/stores/useRoomStore";

export default function GlobalPointerMove() {
  const { gl, camera } = useThree();
  const selectedRef = useRoomStore((s) => s.selectedRef);
  const mode = useRoomStore((s) => s.mode);

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const intersectionPoint = new THREE.Vector3();

    const handlePointerMove = (e: PointerEvent) => {
      if (!selectedRef?.current || mode === "none") return;
      e.stopPropagation();

      const mouse = getNormalizedMouseCoords(e, gl.domElement);
      raycaster.setFromCamera(mouse, camera);

      if (mode === "moveHorizontal") {
        moveHorizontally(raycaster, selectedRef.current, intersectionPoint);
      } else if (mode === "moveVertical") {
        moveVertically(
          raycaster,
          camera,
          selectedRef.current,
          intersectionPoint
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

function getNormalizedMouseCoords(
  e: PointerEvent,
  domElement: HTMLCanvasElement
) {
  const rect = domElement.getBoundingClientRect();
  return new THREE.Vector2(
    ((e.clientX - rect.left) / rect.width) * 2 - 1,
    -((e.clientY - rect.top) / rect.height) * 2 + 1
  );
}

function moveHorizontally(
  raycaster: THREE.Raycaster,
  object: THREE.Object3D,
  intersectionPoint: THREE.Vector3
) {
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -object.position.y);
  raycaster.ray.intersectPlane(plane, intersectionPoint);
  object.position.set(
    intersectionPoint.x,
    object.position.y,
    intersectionPoint.z
  );
}

function moveVertically(
  raycaster: THREE.Raycaster,
  camera: THREE.Camera,
  object: THREE.Object3D,
  intersectionPoint: THREE.Vector3
) {
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  const plane = new THREE.Plane();
  plane.setFromNormalAndCoplanarPoint(cameraDirection, object.position);

  raycaster.ray.intersectPlane(plane, intersectionPoint);
  object.position.set(
    object.position.x,
    intersectionPoint.y,
    object.position.z
  );
}
