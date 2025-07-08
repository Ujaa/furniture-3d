import { useState } from "react";
import FurnitureItemList from "../list/FurnitureItemList";
import TabButton from "./TabButton";

const TABS = {
  MY_FURNITURE: "내 가구",
  SAMPLE_FURNITURE: "샘플 가구",
} as const;

type TabType = (typeof TABS)[keyof typeof TABS];

export default function TabSection() {
  const [tab, setTab] = useState<TabType>(TABS.MY_FURNITURE);

  return (
    <>
      <div className="flex gap-2 w-full justify-between mb-3">
        <TabButton
          label={TABS.MY_FURNITURE}
          isActive={tab === TABS.MY_FURNITURE}
          onClick={() => setTab(TABS.MY_FURNITURE)}
        />
        <TabButton
          label={TABS.SAMPLE_FURNITURE}
          isActive={tab === TABS.SAMPLE_FURNITURE}
          onClick={() => setTab(TABS.SAMPLE_FURNITURE)}
        />
      </div>
      {tab === TABS.MY_FURNITURE && <FurnitureItemList />}
      {tab === TABS.SAMPLE_FURNITURE && <FurnitureItemList isSample />}
    </>
  );
}
