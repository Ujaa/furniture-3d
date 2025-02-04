import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useRoomStore } from "../../stores/useRoomStore";
import ContextMenu from "./components/ContextMenu";

import SidePanel from "./components/SidePanel";
import * as THREE from "three";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import GlobalPointerMove from "./components/GlobalPointerMove";
import PostEffect from "./components/PostEffect";
import Lights from "./components/Lights";
import LoadingBouncingBall from "@/components/LoadingBouncingBall";
import AlertDialog from "@/components/AlertDialog";
import BaseButton from "@/components/BaseButton";
import BoxHelper from "./components/BoxHelper";
import Scene from "./components/Scene";

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
      <div className="fixed right-4 top-4">
        <BaseButton label={"저장"} onClick={() => {}} />
      </div>

      <div className="fixed right-4 bottom-4 text-sm text-slate-700">
        Interior Environment mady by{" "}
        <a className="underline" href="https://sketchfab.com/Adelaide_Essex">
          Adelaide Essex
        </a>
      </div>
    </main>
  );
}
