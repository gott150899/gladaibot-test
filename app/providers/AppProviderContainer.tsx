'use client'

import { useEffect, useState } from "react";
import { GetUserInfoData } from "../models/user.model";
import { AppProvider, Toast } from "./appContext";
import { clearAllLS } from "../utils/commonFunc";
import { ToastContainer, toast } from "react-toastify";
import { getUserInfoApi } from "../utils/apis";
// import '../_styles/boostrap/main.css';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
    children: React.ReactNode
}

const AppProviderContainer = ({ children }: Props) =>{
    const [token, setToken] = useState('');
    const [userInfo, setUserInfo] = useState({} as GetUserInfoData);
    const [toastAlert, setToastAlert] = useState<Toast>({} as Toast);

    useEffect(() => {
        const tokenLS = localStorage.getItem('access_token');
        // user logged
        if (tokenLS) {
          setToken(tokenLS);
        } else {
          doLogout();
        }
    }, []);

    useEffect(() => {
      if (token) {
        getUserInfo();
      }
    }, [token]);

    const doLogout = () => {
        setUserInfo({} as GetUserInfoData);
        clearAllLS();
    };

    const getUserInfo = async () => {
        try {
          const res = await getUserInfoApi();
          if (!res.success) {
            setToastAlert({
                msg: 'Get user info fail',
                type: 'error',
            });
            return;
          }
          setUserInfo(res.data);
        } catch (error: any) {
            setToastAlert({
                msg: error,
                type: 'error',
            });
        }
    };

    useEffect(() => {
        if (toastAlert && toast[toastAlert.type]) {
          toast[toastAlert.type](toastAlert.msg, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: toastAlert.theme || 'colored',
          });
        }
    }, [toastAlert]);

    return(
        <AppProvider
          value={{
              token: token,
              setToken: setToken,
              userInfo: userInfo,
              setUserInfo: setUserInfo,
              getUserInfo: getUserInfo,
              toast: toastAlert,
              setToast: setToastAlert,
          }}
        >
          {children}
          <ToastContainer />
        </AppProvider>
    )
}

export default AppProviderContainer