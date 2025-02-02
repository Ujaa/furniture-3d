import { useFurnitureStore } from "@/stores/useFurnitureStore";

export default function FurnitureCheckbox() {
  const { isWallMountable, setIsWallMountable } = useFurnitureStore();
  return (
    <div className="flex w-full justify-end mt-2 items-center">
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
        <span className="w-5 h-5 mr-2 p-[3.5px] border border-slate-500 rounded-full flex items-center justify-center transition-colors duration-200">
          {isWallMountable && (
            <span className="w-full h-full bg-blue-600 rounded-full"></span> // Custom checkmark
          )}
        </span>
        벽에 거는 가구입니다.
      </label>
    </div>
  );
}
