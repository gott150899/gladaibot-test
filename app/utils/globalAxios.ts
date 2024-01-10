import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { clearAllLS } from './commonFunc';

const getCancelToken = () => axios.CancelToken;

const globalAxios = axios.create();

// globalAxios.defaults.baseURL = process.env.REACT_APP_BACKEND;
// globalAxios.defaults.timeout = 10000;
// globalAxios.defaults.withCredentials = true;

const AxiosInterceptor = ({ children }: any) => {
  useEffect(() => {
    const requestConfig = (config: InternalAxiosRequestConfig<any>) => {
      if (config?.headers) {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    };

    const responseCallback = (response: AxiosResponse<any, any>) => {
      return response;
    };

    const errCallback = (error: any) => {
      if (error.response.status === 401) {
        clearAllLS();
      }

      let msg = 'Something went wrong';
      const errors = error.response?.data?.errors;
      const errorKeys = errors ? Object.keys(errors) : null;

      if (errorKeys?.length) {
        msg = errors[errorKeys[0]][0];
      } else if (error?.response?.data?.error) {
        msg = error.response.data.error;
      } else if (error?.message) {
        msg = error.message;
      }

      return Promise.reject(msg);
    };

    const requestInterceptor = globalAxios.interceptors.request.use(
      requestConfig,
      errCallback
    );

    const responseInterceptor = globalAxios.interceptors.response.use(
      responseCallback,
      errCallback
    );

    return () => {
      globalAxios.interceptors.request.eject(requestInterceptor);
      globalAxios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return children;
};

export { getCancelToken, AxiosInterceptor };

export default globalAxios;
