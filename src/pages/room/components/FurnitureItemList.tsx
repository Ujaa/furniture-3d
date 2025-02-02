import FurnitureItem from "./FurnitureItem";
import { getUserId } from "@/shared/user";
import { getFurnitureList } from "@/api/furniture.api";
import { useEffect, useState } from "react";
import EmptyView from "@/components/EmptyView";

interface FurnitureItemListProps {
  isSample?: boolean;
}

export default function FurnitureItemList({
  isSample = false,
}: FurnitureItemListProps) {
  const [furnitureList, setFurnitureList] = useState<IFurniture[]>([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      const id = isSample ? "sample" : getUserId();
      const data = await getFurnitureList(id);
      setFurnitureList(data);
    };

    fetchFurniture();
  }, []);

  if (furnitureList.length === 0)
    return (
      <EmptyView>
        <p>가구가 없습니다.</p>
      </EmptyView>
    );
  return (
    <ul className="grid grid-cols-1 gap-4">
      {furnitureList.map((furniture) => (
        <FurnitureItem
          key={furniture.id!}
          id={furniture.id!}
          scale={furniture.scale}
          previewUrl={furniture.previewUrl!}
          isWallMountable={furniture.isWallMountable}
          glbUrl={furniture.glbUrl!}
        />
      ))}
    </ul>
  );
}
