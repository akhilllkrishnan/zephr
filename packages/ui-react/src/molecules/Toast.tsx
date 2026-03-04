import { Alert, AlertProps } from "./Alert";

export interface ToastProps extends Omit<AlertProps, "variant" | "dismissible"> {
  open?: boolean;
  onClose?: () => void;
}

export function Toast({ open = true, onClose, ...props }: ToastProps) {
  if (!open) {
    return null;
  }

  return (
    <Alert
      {...props}
      variant="stroke"
      dismissible
      onDismiss={onClose}
      className={props.className}
    />
  );
}
