import { TABS } from "@/shared/constants/constants";
import { create } from "zustand";

/**
 * 가구 전체 목록 및 가구 생성 상태를 관리하는 Store.
 */

interface FurnituresState {
  furnitures: IFurniture[];
  currentTab: TabType;
  setTab: (tab: TabType) => void;
  addFurniture: (furniture: IFurniture) => void;
  editFurniture: (updatedFurniture: IFurniture) => void;
  deleteFurniture: (id: string) => void;
  resetFurnitures: () => void;
  initFurnitures: (furnitures: IFurniture[]) => void;
}

export const useFurnituresStore = create<FurnituresState>((set) => ({
  furnitures: [],
  currentTab: TABS.MY_FURNITURE,
  setTab: (tab) => set({ currentTab: tab }),
  addFurniture: (furniture) =>
    set((state) => ({ furnitures: [...state.furnitures, furniture] })),
  editFurniture: (updatedFurniture) =>
    set((state) => ({
      furnitures: state.furnitures.map((furniture) =>
        furniture.id === updatedFurniture.id ? updatedFurniture : furniture
      ),
    })),
  deleteFurniture: (id) =>
    set((state) => ({
      furnitures: state.furnitures.filter((furniture) => furniture.id !== id),
    })),
  resetFurnitures: () => set({ furnitures: [] }),
  initFurnitures: (furnitures) => set({ furnitures }),
}));
