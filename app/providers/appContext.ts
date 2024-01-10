import { createContext, Dispatch, SetStateAction } from 'react';
import { ToastContent, Theme } from 'react-toastify';
import { GetUserInfoData } from '../models/user.model';

export interface AppState {
  userInfo: GetUserInfoData;
  setUserInfo: Dispatch<SetStateAction<GetUserInfoData>>;
  getUserInfo: () => void;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  toast: Toast;
  setToast: Dispatch<SetStateAction<Toast>>;
}

export interface Toast {
  msg: ToastContent;
  type: 'error' | 'success' | 'info' | 'warn' | 'dark';
  theme?: Theme;
}

export const AppContext = createContext({} as AppState);
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
