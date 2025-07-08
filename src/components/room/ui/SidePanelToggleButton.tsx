import { MouseEvent } from "react";
import FurnitureIcon from "@/assets/icons/ic_furniture.svg?react";

interface SidePanelToggleButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function SidePanelToggleButton({
  onClick,
}: SidePanelToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-4 h-16 w-12 bg-blue-600 text-white rounded-r-xl flex justify-center items-center"
    >
      <FurnitureIcon />
    </button>
  );
}
