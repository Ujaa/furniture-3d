import { useState } from "react";
import SidePanelToggleButton from "./SidePanelToggleButton";
import FurnitureGenerator from "../generator/FurnitureGenerator";
import TabSection from "../list/TabSection";

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`z-10 absolute left-0 top-0 h-full py-4 flex items-start transition-transform duration-500 ease-in-out ${
        isOpen ? "-translate-x-[25rem]" : "translate-x-0"
      }`}
    >
      <div className="border-r border-solid ms-4 border-slate-800 rounded-2xl bg-slate-900/95 backdrop-blur-md w-96 h-full px-4 py-4 overflow-y-auto">
        <h1 className="mb-4 font-bold text-base text-slate-50">가구</h1>
        <FurnitureGenerator />
        <TabSection />
      </div>
      <SidePanelToggleButton onClick={handleToggle} />
    </div>
  );
}
