import { useFurnitureStore } from "@/stores/useFurnitureStore";
import ImageUploader from "./ImageUploader";
import { useShallow } from "zustand/shallow";
import FurnitureFormWithPreview from "./FurnitureFormWithPreview";
import GLBPreviewContainer from "../preview/GLBPreviewContainer";

export default function FurnitureGenerator() {
  const { glbUrl, previewUrl } = useFurnitureStore(
    useShallow((state) => ({
      glbUrl: state.glbUrl,
      previewUrl: state.previewUrl,
      resetFurniture: state.resetFurniture,
    }))
  );
  return (
    <div className="w-full mb-6">
      {!previewUrl && <ImageUploader />}
      {!glbUrl && previewUrl && <FurnitureFormWithPreview />}
      {glbUrl && <GLBPreviewContainer />}
    </div>
  );
}
