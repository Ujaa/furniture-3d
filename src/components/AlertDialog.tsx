import BaseButton from "./BaseButton";
import { useAlertStore } from "@/stores/useAlertStore";

export default function AlertDialog() {
  const { visible, alert, hideAlert } = useAlertStore();

  const handleMainButtonClick = () => {
    alert.onMainButtonClick();
    hideAlert();
  };

  if (!visible) return null;

  return (
    <div className="fixed w-screen h-screen bg-slate-900/40 backdrop-blur-md z-30 flex items-center justify-center ">
      <div
        className={`p-7 pb-6 bg-slate-950 rounded-xl shadow-lg flex flex-col gap-2 items-center min-w-72`}
      >
        <p className="text-sm text-slate-50 font-medium">{alert.message}</p>
        <div className="mt-4 flex w-full gap-2">
          {alert.cancelButtonLabel && (
            <button
              onClick={() => hideAlert()}
              className="flex-1 font-semibold px-4 py-2 bg-slate-900 text-sm text-slate-400 rounded-lg hover:bg-slate-800 transition"
            >
              {alert.cancelButtonLabel}
            </button>
          )}
          <BaseButton
            label={alert.mainButtonLabel}
            onClick={handleMainButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
