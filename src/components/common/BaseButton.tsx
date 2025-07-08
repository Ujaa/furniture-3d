interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function BaseButton({ label, ...props }: BaseButtonProps) {
  return (
    <button
      {...props}
      className={`w-full flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 py-3 px-4 rounded-lg text-sm text-blue-50 font-semibold transition-colors duration-500 ${
        props.className ?? ""
      }`}
    >
      {label}
    </button>
  );
}
