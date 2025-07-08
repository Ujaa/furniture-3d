import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureScaleInput from "./FurnitureScaleInput";

export default function WidthInput() {
  const width = useFurnitureStore((state) => state.size.width);
  const setSize = useFurnitureStore((state) => state.setSize);

  return (
    <FurnitureScaleInput
      label="가로"
      value={width}
      onChange={(event) => {
        const newValue = Math.min(1000, parseInt(event.target.value) || 0);
        setSize((prev) => ({ ...prev, width: newValue }));
      }}
    />
  );
}
