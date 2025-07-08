import FurnitureItemList from "./FurnitureItemList";
import TabButton from "./TabButton";
import { TABS } from "@/shared/constants/constants";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

export default function TabSection() {
  const currentTab = useFurnituresStore((state) => state.currentTab);
  const setTab = useFurnituresStore((state) => state.setTab);
  return (
    <>
      <div className="flex gap-2 w-full justify-between mb-3">
        <TabButton
          label={TABS.MY_FURNITURE}
          isActive={currentTab === TABS.MY_FURNITURE}
          onClick={() => setTab(TABS.MY_FURNITURE)}
        />
        <TabButton
          label={TABS.SAMPLE_FURNITURE}
          isActive={currentTab === TABS.SAMPLE_FURNITURE}
          onClick={() => setTab(TABS.SAMPLE_FURNITURE)}
        />
      </div>
      {currentTab === TABS.MY_FURNITURE && <FurnitureItemList />}
      {currentTab === TABS.SAMPLE_FURNITURE && <FurnitureItemList isSample />}
    </>
  );
}
