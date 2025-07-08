import { useEffect, useState, useCallback } from "react";
import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useFurnituresStore } from "@/stores/useFurnituresStore";
import {
  createFurniture,
  uploadPreviewToStorage,
} from "@/api/furniture/furniture.api";
import { getUserId } from "@/shared/utils/user";
import toast from "react-hot-toast";

export function useGLBPreviewLogic() {
  const { isWallMountable, previewUrl, size, glbUrl, setPreviewUrl } =
    useFurnitureStore((state) => ({
      isWallMountable: state.isWallMountable,
      previewUrl: state.previewUrl,
      size: state.size,
      glbUrl: state.glbUrl,
      setPreviewUrl: state.setPreviewUrl,
    }));

  const { addFurniture, setIsCreating } = useFurnituresStore((state) => ({
    addFurniture: state.addFurniture,
    setIsCreating: state.setIsCreating,
  }));

  const [hasCaptured, setHasCaptured] = useState(false);

  const onCapture = useCallback(
    (imageUrl: string) => {
      setPreviewUrl(imageUrl);
      setHasCaptured(true);
    },
    [setPreviewUrl]
  );

  useEffect(() => {
    if (!hasCaptured || !previewUrl) return;

    const saveFurniture = async () => {
      try {
        const imageUrl = await uploadPreviewToStorage(previewUrl);
        const userId = getUserId();
        if (!userId) {
          toast.error("사용자 아이디가 없습니다.");
          return;
        }

        const newFurnitureData: IFurniture = {
          isWallMountable,
          previewUrl: imageUrl,
          glbUrl,
          size,
          createdAt: new Date().toISOString(),
        };

        const newFurniture = await createFurniture(userId, newFurnitureData);
        addFurniture(newFurniture);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsCreating(false);
      }
    };

    saveFurniture();
  }, [
    hasCaptured,
    previewUrl,
    isWallMountable,
    glbUrl,
    size,
    addFurniture,
    setIsCreating,
  ]);

  return { glbUrl, onCapture, hasCaptured };
}
