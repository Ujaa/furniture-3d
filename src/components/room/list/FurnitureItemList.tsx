import FurnitureItem from "./FurnitureItem";
import { getUserId } from "@/shared/utils/user";
import { getFurnitureList } from "@/api/furniture/furniture.api";
import { useEffect } from "react";
import EmptyView from "@/components/common/EmptyView";
import { useFurnituresStore } from "@/stores/useFurnituresStore";

interface FurnitureItemListProps {
  isSample?: boolean;
}

export default function FurnitureItemList({
  isSample = false,
}: FurnitureItemListProps) {
  const { furnitures, initFurnitures } = useFurnituresStore();
  useEffect(() => {
    const fetchFurniture = async () => {
      const id = isSample ? "sample" : getUserId();
      const data = await getFurnitureList(id);
      initFurnitures(data);
    };

    fetchFurniture();
  }, [isSample, initFurnitures]);

  if (furnitures.length === 0)
    return (
      <EmptyView>
        <p>가구가 없습니다.</p>
      </EmptyView>
    );
  return (
    <ul className="grid grid-cols-1 gap-4">
      {furnitures.map((furniture) => (
        <FurnitureItem
          key={furniture.id!}
          id={furniture.id!}
          size={furniture.size}
          previewUrl={furniture.previewUrl!}
          isWallMountable={furniture.isWallMountable}
          glbUrl={furniture.glbUrl!}
        />
      ))}
    </ul>
  );
}
