import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useRoomStore } from "../../../stores/useRoomStore";

export default function FloorPlanModel() {
  const floorPlanRef = useRef();
  const { scene } = useGLTF("/assets/house.glb");
  const { setFloorPlanRef } = useRoomStore();

  useEffect(() => {
    setFloorPlanRef(floorPlanRef);
  }, []);

  return <primitive object={scene} ref={floorPlanRef} />;
}
