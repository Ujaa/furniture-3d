import { useRoomStore } from "@/stores/useRoomStore";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FurnitureMeshProps {
  mesh: IMesh;
}

export default function FurnitureMesh({ mesh }: FurnitureMeshProps) {
  const setSelectedRef = useRoomStore((s) => s.setSelectedRef);
  const mode = useRoomStore((s) => s.mode);
  const setMode = useRoomStore((s) => s.setMode);
  const resetSelectedRef = useRoomStore((s) => s.resetSelectedRef);
  const { scene } = useGLTF(mesh.glbUrl);
  const meshRef = useRef<ThreeRefType>(null);

  function alignMeshToGround(scene: THREE.Group) {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry.boundingBox === null) {
          mesh.geometry.computeBoundingBox();
        }
        const bbox = mesh.geometry.boundingBox!;
        const yOffset = bbox.min.y;
        mesh.geometry.translate(0, -yOffset, 0);
      }
    });
  }

  useEffect(() => {
    alignMeshToGround(scene);
  }, [scene]);

  const handleOnClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (mode === "moveHorizontal" || mode === "moveVertical") {
      setMode("none");
      resetSelectedRef();
    } else {
      setSelectedRef(meshRef);
    }
  };

  const onPointerMissed = () => resetSelectedRef();

  return (
    <primitive
      ref={meshRef}
      object={scene}
      name={mesh.id}
      scale={mesh.scale}
      position={mesh.position}
      rotation={mesh.rotation}
      userData={{
        isWallMountable: mesh.isWallMountable,
      }}
      onClick={handleOnClick}
      onPointerMissed={onPointerMissed}
    />
  );
}
