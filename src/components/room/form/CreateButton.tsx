import { useFurnitureStore } from "@/stores/useFurnitureStore";
import BaseButton from "@/components/common/BaseButton";
import { useFurnituresStore } from "@/stores/useFurnituresStore";
import { uploadGLBToStorage } from "@/api/furniture/furniture.api";
import toast from "react-hot-toast";
import { useShallow } from "zustand/shallow";

export default function CreateButton() {
  const { imageFile, size, setGlbUrl } = useFurnitureStore(
    useShallow((state) => ({
      imageFile: state.imageFile,
      size: state.size,
      setGlbUrl: state.setGlbUrl,
    }))
  );
  const { isCreating, setIsCreating } = useFurnituresStore(
    useShallow((state) => ({
      isCreating: state.isCreating,
      setIsCreating: state.setIsCreating,
    }))
  );
  const handleCreateGLB = async () => {
    if (!imageFile) return;
    setIsCreating(true);
    try {
      const glbUrl = await uploadGLBToStorage(imageFile);
      setGlbUrl(glbUrl);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const isDisabled =
    isCreating || !(size.width > 0 && size.height > 0 && size.depth > 0);

  return (
    <BaseButton
      disabled={isDisabled}
      onClick={handleCreateGLB}
      label={isCreating ? "3D 가구 생성중..." : "3D 가구 생성하기"}
    />
  );
}
