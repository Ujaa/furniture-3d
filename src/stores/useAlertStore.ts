import { create } from "zustand/react";

/**
 * 전역 Alert Dialog (모달) 상태를 관리하는 Store.
 */

interface AlertState {
  visible: boolean;
  alert: IAlert;
  showAlert: (alert: IAlert) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  alert: {
    message: "",
    mainButtonLabel: "",
    onMainButtonClick: () => {},
    cancelButtonLabel: "",
    cancelButtonClick: () => {},
  },
  showAlert: (alert) =>
    set({
      visible: true,
      alert,
    }),
  hideAlert: () =>
    set({
      visible: false,
      alert: {
        message: "",
        mainButtonLabel: "",
        onMainButtonClick: () => {},
        cancelButtonLabel: "",
        cancelButtonClick: () => {},
      },
    }),
}));
