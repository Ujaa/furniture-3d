import { useRoomStore } from "@/stores/useRoomStore";
import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FurnitureMeshProps {
  mesh: IMesh;
}

export default function FurnitureMesh({ mesh }: FurnitureMeshProps) {
  const { setSelectedRef, mode, setMode, resetSelectedRef } = useRoomStore();
  const { scene } = useGLTF(mesh.glbUrl);
  const meshRef = useRef<ThreeRefType>(null);

  useEffect(() => {
    if (meshRef.current) {
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
  }, [scene]);

  const onPointerMissed = () => {
    resetSelectedRef();
  };

  const handleOnClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (mode === "moveHorizontal" || mode === "moveVertical") {
      setMode("none");
      resetSelectedRef();
    } else {
      setSelectedRef(meshRef);
    }
  };

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
