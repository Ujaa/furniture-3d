import { create } from "zustand";

interface FurnitureState {
  imageFile: File | null;
  setImageFile: (file: File) => void;

  previewUrl: string | null;
  setPreviewUrl: (url: string) => void;

  isWallMountable: boolean;
  setIsWallMountable: (value: boolean) => void;

  glbUrl: string | null;
  setGlbUrl: (url: string) => void;

  size: ISize;
  setSize: (size: ISize) => void;

  resetFurniture: () => void;
}

export const useFurnitureStore = create<FurnitureState>((set) => ({
  imageFile: null,
  setImageFile: (file) => set({ imageFile: file }),

  previewUrl: null,
  setPreviewUrl: (url) => set({ previewUrl: url }),

  isWallMountable: false,
  setIsWallMountable: (value) => set({ isWallMountable: value }),

  glbUrl: null,
  setGlbUrl: (url) => set({ glbUrl: url }),

  size: { width: 0, height: 0, depth: 0 },
  setSize: (size) => set({ size }),

  resetFurniture: () =>
    set({
      imageFile: null,
      previewUrl: null,
      isWallMountable: false,
      glbUrl: null,
      size: { width: 0, height: 0, depth: 0 },
    }),
}));
