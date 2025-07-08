import { useFurnitureStore } from "@/stores/useFurnitureStore";
import FurnitureForm from "./FurnitureForm";

export default function FurnitureFormWithPreview() {
  const previewUrl = useFurnitureStore((state) => state.previewUrl);
  return (
    <div className="furniture-container flex flex-col gap-4 items-center">
      <img
        src={previewUrl ?? ""}
        alt="미리보기"
        className="w-full aspect-square object-contain rounded-lg mb-3"
      />
      <FurnitureForm />
    </div>
  );
}
