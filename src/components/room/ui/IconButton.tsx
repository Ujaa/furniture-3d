interface IIconButton {
  disabled?: boolean;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function IconButton({
  disabled = false,
  text,
  Icon,
  onClick,
}: IIconButton) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="transition-colors duration-500 disabled:bg-slate-900/90 disabled:text-slate-600 w-14 h-14 rounded-xl hover:bg-slate-950 bg-slate-900/90 border border-slate-700 font-semibold text-slate-200 text-xs flex flex-col items-center justify-center gap-0"
    >
      <Icon /> <span>{text}</span>
    </button>
  );
}
