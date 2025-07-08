interface FurnitureInfoItemProps {
  label: string;
  value: string;
}

export default function FurnitureInfoItem({
  label,
  value,
}: FurnitureInfoItemProps) {
  return (
    <li className="font-medium text-slate-300 text-xs flex gap-3">
      <span className="min-w-9">{label}</span>
      <span className="font-semibold">{value}</span>
    </li>
  );
}
