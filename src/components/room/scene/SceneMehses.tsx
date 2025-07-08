import { useRoomStore } from "@/stores/useRoomStore";
import FurnitureMesh from "./FurnitureMesh";

export default function SceneMeshes() {
  const { meshes } = useRoomStore();

  return (
    <>
      {Object.values(meshes).map((mesh) => (
        <FurnitureMesh key={mesh.id} mesh={mesh} />
      ))}
    </>
  );
}
