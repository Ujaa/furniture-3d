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

  scale: { width: number; height: number; depth: number };
  setScale: (scale: { width: number; height: number; depth: number }) => void;

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

  scale: { width: 0, height: 0, depth: 0 },
  setScale: (scale) => set({ scale }),

  resetFurniture: () =>
    set({
      imageFile: null,
      previewUrl: null,
      isWallMountable: false,
      glbUrl: null,
      scale: { width: 0, height: 0, depth: 0 },
    }),
}));
