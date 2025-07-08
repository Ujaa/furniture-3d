export default function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-xs transition-colors duration-500 ease-in-out font-semibold mb-2 backdrop-blur-md p-3 rounded-lg ${
        isActive
          ? "text-slate-100 bg-slate-400/20"
          : "text-slate-400 bg-slate-950"
      }`}
    >
      {label}
    </button>
  );
}
