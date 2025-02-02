interface AlertOptions {
  type?: AlertType;
  message: string;
  mainButtonLabel: string;
  cancelButtonLabel?: string;
  onMainButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  onClose?: () => void;
}
interface AlertState {
  visible: boolean;
  type: AlertType;
  message: string;
  mainButtonLabel: string;
  cancelButtonLabel?: string;
  onMainButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  onClose?: () => void;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  type: "info",
  message: "",
  mainButtonLabel: "확인",
  cancelButtonLabel: undefined,
  onMainButtonClick: undefined,
  onCancelButtonClick: undefined,
  onClose: undefined,
  showAlert: ({
    type = "info",
    message,
    mainButtonLabel,
    cancelButtonLabel,
    onMainButtonClick,
    onCancelButtonClick,
    onClose,
  }) =>
    set({
      visible: true,
      type,
      message,
      mainButtonLabel,
      cancelButtonLabel,
      onMainButtonClick,
      onCancelButtonClick,
      onClose,
    }),
  hideAlert: () =>
    set({
      visible: false,
      type: "info",
      message: "",
      mainButtonLabel: "확인",
      cancelButtonLabel: undefined,
      onMainButtonClick: undefined,
      onCancelButtonClick: undefined,
      onClose: undefined,
    }),
}));
