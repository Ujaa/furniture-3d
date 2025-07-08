import * as THREE from "three";
import { acceleratedRaycast, computeBoundsTree } from "three-mesh-bvh";
import AlertDialog from "@/components/common/AlertDialog";
import SidePanel from "@/components/room/ui/SidePanel";
import ModelAttribution from "@/components/room/ui/ModelAttribution";
import SceneCanvas from "@/components/room/scene/SceneCanvas";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

export default function Room() {
  return (
    <main className="w-screen h-screen">
      <SidePanel />
      <AlertDialog />
      <SceneCanvas />
      <ModelAttribution />
    </main>
  );
}
