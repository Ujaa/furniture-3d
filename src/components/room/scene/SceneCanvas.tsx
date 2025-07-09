import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LoadingBouncingBall from "@/components/common/LoadingBouncingBall";
import Scene from "@/components/room/scene/Scene";
import Lights from "@/components/room/scene/Lights";
import ContextMenu from "@/components/room/ui/ContextMenu";
import BoxHelper from "@/components/room/scene/BoxHelper";
import GlobalPointerMove from "@/components/room/scene/GlobalPointerMove";
import PostEffect from "@/components/room/scene/PostEffect";

const CAMERA_CONFIG = {
  position: [500, 600, -200] as const,
  fov: 40,
  lookAt: [0, 0, 0] as const,
} as const;

const RENDERER_CONFIG = {
  antialias: true,
} as const;

export default function SceneCanvas() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Canvas
        camera={{
          position: CAMERA_CONFIG.position,
          fov: CAMERA_CONFIG.fov,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(...CAMERA_CONFIG.lookAt);
        }}
        gl={RENDERER_CONFIG}
      >
        <Scene />
        <Lights />
        <OrbitControls />
        <ContextMenu />
        <BoxHelper />
        <GlobalPointerMove />
        <PostEffect />
      </Canvas>
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LoadingBouncingBall />
    </div>
  );
}
