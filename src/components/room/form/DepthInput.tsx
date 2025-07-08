import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureScaleInput from "./FurnitureScaleInput";

export default function DepthInput() {
  const depth = useFurnitureStore((state) => state.size.depth);
  const setSize = useFurnitureStore((state) => state.setSize);

  return (
    <FurnitureScaleInput
      label="세로"
      value={depth}
      onChange={(event) => {
        const newValue = Math.min(1000, parseInt(event.target.value) || 0);
        setSize((prev) => ({ ...prev, depth: newValue }));
      }}
    />
  );
}
