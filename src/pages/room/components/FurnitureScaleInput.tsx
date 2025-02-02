interface FurnitureScaleInputProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FurnitureScaleInput({
  label,
  value,
  onChange,
}: FurnitureScaleInputProps) {
  return (
    <div className="flex items-center">
      <label
        htmlFor={label}
        className="text-sm font-semibold text-slate-300 mr-6 text-nowrap"
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={label}
        type="number"
        placeholder="000"
        max={1000}
        className="focus:outline-none w-full text-right bg-slate-900 rounded-lg px-2 py-2 text-sm font-normal text-slate-50 placeholder:text-slate-400"
      />
      <label
        htmlFor={label}
        className="text-sm font-medium text-slate-300 ml-2"
      >
        cm
      </label>
    </div>
  );
}
