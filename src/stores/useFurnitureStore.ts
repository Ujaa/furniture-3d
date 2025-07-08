import { create } from "zustand";

/**
 * 현재 생성/편집 중인 단일 가구 상태를 관리하는 Store.
 */

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
  setSize: ((size: ISize) => void) &
    ((updater: (prev: ISize) => ISize) => void);

  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;

  resetFurniture: () => void;
}

export const useFurnitureStore = create<FurnitureState>((set, get) => ({
  imageFile: null,
  setImageFile: (file) => set({ imageFile: file }),

  previewUrl: null,
  setPreviewUrl: (url) => {
    // 기존 URL이 있으면 해제
    const prev = get().previewUrl;
    if (prev && prev.startsWith("blob:")) {
      URL.revokeObjectURL(prev);
    }
    set({ previewUrl: url });
  },

  isWallMountable: false,
  setIsWallMountable: (value) => set({ isWallMountable: value }),

  glbUrl: null,
  setGlbUrl: (url) => set({ glbUrl: url }),

  size: { width: 0, height: 0, depth: 0 },
  setSize: (updater) =>
    set((state) => ({
      size: typeof updater === "function" ? updater(state.size) : updater,
    })),

  isCreating: false,
  setIsCreating: (isCreating) => set({ isCreating }),

  resetFurniture: () =>
    set({
      imageFile: null,
      previewUrl: null,
      isWallMountable: false,
      glbUrl: null,
      size: { width: 0, height: 0, depth: 0 },
    }),
}));
