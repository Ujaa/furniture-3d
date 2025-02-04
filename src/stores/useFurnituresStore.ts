import { create } from "zustand";

interface FurnituresState {
  furnitures: IFurniture[];
  addFurniture: (furniture: IFurniture) => void;
  editFurniture: (updatedFurniture: IFurniture) => void;
  deleteFurniture: (id: string) => void;
  resetFurnitures: () => void;
  initFurnitures: (furnitures: IFurniture[]) => void;
}

export const useFurnituresStore = create<FurnituresState>((set) => ({
  furnitures: [],
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
