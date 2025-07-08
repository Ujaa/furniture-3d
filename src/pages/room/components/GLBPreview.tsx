import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { createFurniture, uploadPreviewToStorage } from "@/api/furniture.api";
import Lights from "./Lights";
import PostEffect from "./PostEffect";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

const GLBPreview = () => {
  const {addFurniture, setIsCreating } = useFurnituresStore();
  const { isWallMountable, previewUrl, scale, glbUrl, setPreviewUrl } =
    useFurnitureStore();
  const [hasCaptured, setHasCaptured] = useState(false);
  const { scene } = useGLTF(glbUrl!);

  const CaptureHelper = () => {
    const { gl, scene, camera } = useThree();

    useFrame(() => {
      if (hasCaptured) return;

      gl.render(scene, camera);
      const imageUrl = gl.domElement.toDataURL("image/png");
      setPreviewUrl(imageUrl);
      setHasCaptured(true);
    });

    return null;
  };

  useEffect(() => {
    if (hasCaptured && previewUrl) {
      const create = async () => {
        const imageUrl = await uploadPreviewToStorage(previewUrl);
        const data: IFurniture = {
          isWallMountable,
          previewUrl: imageUrl,
          glbUrl,
          scale,
          createdAt: new Date().toISOString(),
        };
        const newFurniture = await createFurniture(data);
        addFurniture(newFurniture); 
        setIsCreating(false);
      };
      create();
    }
  }, [hasCaptured]);

  return (
    <div className="w-full aspect-square rounded-xl bg-slate-950/70 border border-slate-800 backdrop-blur-md">
      <Canvas camera={{ position: [0, 10, -20], fov: 50 }}>
        <CaptureHelper />
        <Lights />
        <PostEffect />
        <primitive object={scene} scale={[15, 15, 15]} position={[0, -3, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default GLBPreview;
