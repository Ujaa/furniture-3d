import { useState } from "react";
import FurnitureGenerator from "../furniture/FurnitureGenerator";
import SidePanelToggleButton from "./SidePanelToggleButton";
import FurnitureItemList from "../list/FurnitureItemList";

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("내 가구");
  return (
    <div
      className={`z-10 absolute left-0 top-0 h-full py-4 flex items-start transition-transform duration-500 ease-in-out ${
        isOpen ? "-translate-x-[25rem]" : "translate-x-0"
      }`}
    >
      <div className="border-r border-solid ms-4 border-slate-800 rounded-2xl bg-slate-900/95 backdrop-blur-md w-96 h-full px-4 py-4 overflow-y-auto">
        <h1 className="mb-4 font-bold text-base text-slate-50">가구</h1>
        <FurnitureGenerator />
        <div className="flex gap-2 w-full justify-between mb-3">
          <button
            onClick={() => setTab("내 가구")}
            className={`flex-1 text-xs transition-colors duration-500 ease-in-out font-semibold mb-2 backdrop-blur-md p-3 rounded-lg ${
              tab === "내 가구"
                ? "text-slate-100 bg-slate-400/20"
                : "text-slate-400 bg-slate-950"
            }`}
          >
            내 가구
          </button>
          <button
            onClick={() => setTab("샘플 가구")}
            className={`flex-1 text-xs transition-colors duration-500 ease-in-out font-semibold  mb-2 backdrop-blur-md p-3 rounded-lg ${
              tab === "샘플 가구"
                ? "text-slate-100 bg-slate-400/20 "
                : "text-slate-400 bg-slate-950"
            }`}
          >
            샘플 가구
          </button>
        </div>
        {tab === "내 가구" && <FurnitureItemList />}
        {tab === "샘플 가구" && <FurnitureItemList isSample />}
      </div>
      <SidePanelToggleButton onClick={() => setIsOpen((open) => !open)} />
    </div>
  );
}
