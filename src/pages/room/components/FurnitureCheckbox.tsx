import { useFurnitureStore } from "@/stores/useFurnitureStore";

export default function FurnitureCheckbox() {
  const { isWallMountable, setIsWallMountable } = useFurnitureStore();
  return (
    <div className="flex w-full mt-3 items-center">
      <input
        checked={isWallMountable}
        onChange={(event) => setIsWallMountable(event.target.checked)}
        id="check"
        type="checkbox"
        className="hidden"
      />
      <label
        htmlFor="check"
        className="flex items-center cursor-pointer text-sm font-medium text-slate-300 text-nowrap"
      >
        <span className="w-5 h-5 mr-2 p-[3px] border border-slate-700 bg-slate-700/20 rounded flex items-center justify-center transition-colors duration-200">
        <span className={`w-full h-full transition-opacity duration-200 bg-blue-600 ${isWallMountable ? "opacity-100": "opacity-0"} rounded-sm`}></span> 
        </span>
        벽에 거는 가구입니다.
      </label>
    </div>
  );
}
