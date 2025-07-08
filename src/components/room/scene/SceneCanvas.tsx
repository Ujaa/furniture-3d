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
import { useRoomStore } from "@/stores/useRoomStore";

export default function SceneCanvas() {
  const selectedRef = useRoomStore((state) => state.selectedRef);
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <LoadingBouncingBall />
        </div>
      }
    >
      <Canvas
        camera={{
          position: [500, 600, -200],
          fov: 40,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, 0);
        }}
        gl={{ antialias: true }}
      >
        <Scene />
        <Lights />
        {selectedRef && <ContextMenu />}
        <OrbitControls /> <BoxHelper />
        <GlobalPointerMove />
        <BoxHelper />
        <PostEffect />
      </Canvas>
    </Suspense>
  );
}
