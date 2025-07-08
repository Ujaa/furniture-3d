import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useRoomStore } from "@/stores/useRoomStore";
import * as THREE from "three";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import LoadingBouncingBall from "@/components/common/LoadingBouncingBall";
import AlertDialog from "@/components/common/AlertDialog";
import SidePanel from "@/components/room/ui/SidePanel";
import Scene from "@/components/room/scene/Scene";
import Lights from "@/components/room/scene/Lights";
import ContextMenu from "@/components/room/ui/ContextMenu";
import BoxHelper from "@/components/room/scene/BoxHelper";
import GlobalPointerMove from "@/components/room/scene/GlobalPointerMove";
import PostEffect from "@/components/room/scene/PostEffect";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default function Room() {
  const { selectedRef } = useRoomStore();
  return (
    <main className="w-screen h-screen">
      <SidePanel />
      <AlertDialog />
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
      {/* <div className="fixed right-4 top-4">
        <BaseButton label={"저장"} onClick={() => {}} />
      </div> */}

      <div className="fixed right-4 bottom-4 text-xs text-slate-700">
        Interior Environment mady by{" "}
        <a className="underline" href="https://sketchfab.com/Adelaide_Essex">
          Adelaide Essex
        </a>
      </div>
    </main>
  );
}
