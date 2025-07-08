import FurnitureInfoItem from "./\bFurnitureInfoItem";

interface FurnitureInfoListProps {
  size: ISize;
  isWallMountable: boolean;
}

export default function FurnitureInfoList({
  size,
  isWallMountable,
}: FurnitureInfoListProps) {
  const infoItems = [
    { label: "가로", value: `${size.width}cm` },
    { label: "세로", value: `${size.depth}cm` },
    { label: "높이", value: `${size.height}cm` },
    { label: "벽 배치", value: isWallMountable ? "가능" : "불가능" },
  ];

  return (
    <ul className="flex flex-col gap-1.5">
      {infoItems.map((item) => (
        <FurnitureInfoItem
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </ul>
  );
}
