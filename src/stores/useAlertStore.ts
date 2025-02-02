import { create } from "zustand/react";

interface AlertState {
  visible: boolean;
  message: string;
  mainButtonLabel?: string;
  cancelButtonLabel?: string;
  onMainButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  message: "",
  mainButtonLabel: undefined,
  cancelButtonLabel: undefined,
  onMainButtonClick: undefined,
  onCancelButtonClick: undefined,
  hideAlert: () =>
    set({
      visible: false,
      message: "",
      mainButtonLabel: undefined,
      cancelButtonLabel: undefined,
      onMainButtonClick: undefined,
      onCancelButtonClick: undefined,
    }),
}));
