import { useFurnitureStore } from "@/stores/useFurnitureStore";
import { useId } from "react";
import { useShallow } from "zustand/shallow";

export default function FurnitureCheckbox() {
  const checkboxId = useId();
  const { isWallMountable, setIsWallMountable } = useFurnitureStore(
    useShallow((state) => ({
      isWallMountable: state.isWallMountable,
      setIsWallMountable: state.setIsWallMountable,
    }))
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsWallMountable(event.target.checked);
  };

  return (
    <div className="flex w-full mt-3 items-center">
      <input
        id={checkboxId}
        type="checkbox"
        checked={isWallMountable}
        onChange={handleChange}
        className="hidden"
      />
      <label
        htmlFor={checkboxId}
        className="flex items-center cursor-pointer text-sm font-medium text-slate-300 text-nowrap"
      >
        <span className="w-5 h-5 mr-2 p-[3px] border border-slate-700 bg-slate-700/20 rounded flex items-center justify-center transition-colors duration-200">
          <span
            className={`w-full h-full transition-opacity duration-200 bg-blue-600 ${
              isWallMountable ? "opacity-100" : "opacity-0"
            } rounded-sm`}
          ></span>
        </span>
        벽에 거는 가구입니다.
      </label>
    </div>
  );
}
