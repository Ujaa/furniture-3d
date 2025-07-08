import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureScaleInput from "./FurnitureScaleInput";

export default function HeightInput() {
  const height = useFurnitureStore((state) => state.size.height);
  const setSize = useFurnitureStore((state) => state.setSize);

  return (
    <FurnitureScaleInput
      label="높이"
      value={height}
      onChange={(event) => {
        const newValue = Math.min(1000, parseInt(event.target.value) || 0);
        setSize((prev) => ({ ...prev, height: newValue }));
      }}
    />
  );
}
