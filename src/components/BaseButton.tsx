interface BaseButtonProps {
  disabled?: boolean;
  label: string;
  onClick: () => void;
}

export default function BaseButton({
  disabled = false,
  label,
  onClick,
}: BaseButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full flex-1 bg-blue-600 disabled:bg-blue-300 py-3 px-4 rounded-lg text-sm text-blue-50 font-semibold transition-colors duration-500"
    >
      {label}
    </button>
  );
}
