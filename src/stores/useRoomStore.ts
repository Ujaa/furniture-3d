import { BufferGeometry } from "three";
import { create } from "zustand";

interface RoomState {
  mode: modeType;
  selectedRef: ThreeRefType | null;
  mergedHouse: BufferGeometry | null;
  houseRef: ThreeRefType | null;
  meshes: Record<string, IMesh>;
  setMode: (mode: modeType) => void;
  setMergedHouse: (mergedHouse: BufferGeometry) => void;
  addMesh: (mesh: IMesh) => void;
  deleteMesh: (id: string) => void;
  setSelectedRef: (ref: ThreeRefType) => void;
  setHouseRef: (ref: ThreeRefType) => void;
  resetSelectedRef: () => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  mode: "none",
  selectedRef: null,
  houseRef: null,
  mergedHouse: null,
  meshes: {},
  setMode: (mode) => set({ mode }),
  setMergedHouse: (mergedHouse) => set({ mergedHouse }),
  addMesh: (mesh) =>
    set((state) => ({
      meshes: { ...state.meshes, [mesh.id]: mesh },
    })),
  deleteMesh: (id) =>
    set((state) => {
      const newMeshes = { ...state.meshes };
      delete newMeshes[id];
      return { meshes: newMeshes };
    }),
  setHouseRef: (ref) => set({ houseRef: ref }),
  setSelectedRef: (ref) => set({ selectedRef: ref }),
  resetSelectedRef: () => set({ selectedRef: null }),
}));
