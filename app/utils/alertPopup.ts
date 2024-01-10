import { Dispatch, SetStateAction } from 'react';
import { Toast } from '../providers/appContext';

export const PopupMessageError = (
  toastDispatcher: Dispatch<SetStateAction<Toast>>,
  message: string | Object
) => PopupMessage(toastDispatcher, message);

export const PopupMessageWarning = (
  toastDispatcher: Dispatch<SetStateAction<Toast>>,
  message: string | Object
) => PopupMessage(toastDispatcher, message, 'warn');

export const PopupMessageSuccess = (
  toastDispatcher: Dispatch<SetStateAction<Toast>>,
  message: string | Object
) => PopupMessage(toastDispatcher, message, 'success');

function PopupMessage(
  toastDispatcher: Dispatch<SetStateAction<Toast>>,
  message: string | Object | 'Some thing went wrong',
  type: 'error' | 'success' | 'info' | 'warn' | 'dark' = 'error'
): void {
  if (message instanceof Object) {
    message = JSON.stringify(message);
  }

  toastDispatcher({
    msg: message.toString(),
    type,
  });
}

export const ToastDispatcher = (
  value: SetStateAction<Toast>
): void => {
};
