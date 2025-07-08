import { useFurnitureStore } from "@/stores/useFurnitureStore";

export default function CancelButton() {
  const resetFurniture = useFurnitureStore((state) => state.resetFurniture);

  return (
    <button
      onClick={() => resetFurniture()}
      className="flex-2 bg-slate-900 hover:bg-slate-950 transition-colors duration-300 py-2 px-4 rounded-lg text-sm text-slate-400 font-semibold"
    >
      취소하기
    </button>
  );
}
