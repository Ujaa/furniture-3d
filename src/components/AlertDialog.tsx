import { useState } from "react";
import BaseButton from "./BaseButton";

interface AlertDialogProps {
  message: string;
  mainButtonLabel: string;
  onMainButtonClick: () => void;
  cancelButtonLabel?: string;
}

export default function AlertDialog({
  message,
  mainButtonLabel,
  onMainButtonClick,
  cancelButtonLabel,
}: AlertDialogProps) {
  const [visible, setVisible] = useState(true);

  const closeAlert = () => setVisible(false);
  const handleMainButtonClick = () => {
    if (onMainButtonClick) onMainButtonClick();
    closeAlert();
  };

  if (!visible) return null;

  return (
    <div className="fixed w-screen h-screen bg-slate-900/40 backdrop-blur-md z-30 flex items-center justify-center ">
      <div
        className={`p-7 pb-6 bg-slate-950 rounded-xl shadow-lg flex flex-col gap-2 items-center min-w-72`}
      >
        <p className="text-sm text-slate-50 font-medium">{message}</p>
        <div className="mt-4 flex w-full gap-2">
          {cancelButtonLabel && (
            <button
              onClick={closeAlert}
              className="flex-1 font-semibold px-4 py-2 bg-slate-900 text-sm text-slate-400 rounded-lg hover:bg-gray-400 transition"
            >
              {cancelButtonLabel}
            </button>
          )}
          <BaseButton label={mainButtonLabel} onClick={handleMainButtonClick} />
        </div>
      </div>
    </div>
  );
}
