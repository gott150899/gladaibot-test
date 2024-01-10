'use client'

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AppContext } from "@/app/providers/appContext";
import { loginApi } from "@/app/utils/apis";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import styled from 'styled-components';

const Wrapper = styled.div`
  .wpuf-submit-button {
    cursor: pointer;
    text-align: center;
  }
`;

interface FormData {
    password: string;
    email: string;
}

const LoginComponent = () =>{
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>();
    const { setToken, setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const callSignup = async (formData: FormData) => {
        try {
          const { email, password } = formData;
          setLoading(true);
          const res = await loginApi({ email, password });
          setLoading(false);
    
          if (res.error) {
            setToast({
              msg: res.error,
              type: 'error',
            });
            return;
          }
    
          localStorage.setItem('access_token', res.data.accessToken);
          setToken(res.data.accessToken);
        } catch (error: any) {
          setLoading(false);
          setToast({
            msg: error,
            type: 'error',
          });
        }
    };

    const clickLogin = () => {
        onSubmit();
        if (Object.keys(errors)) return;
    };

    const onSubmit = handleSubmit(
        (data) => {
          const form: FormData = { ...data };
          callSignup(form);
        },
        (errors) => {
          if (errors) {
            setToast({
              msg: `${errors}`,
              type: 'warn',
            });
            return;
          }
        }
      );

    return (
        <Wrapper>
      <div>
        <h1 className="login__box__title text-center">Log In</h1>
        <form>
          <div className="input__wrap -icon mb-3 mb-xxl-5">
            <i className="icon-user"></i>
            <input
              type="text"
              className="input form-control"
              placeholder="johnsmith@mail.com"
              {...register('email', {
                required: true,
              })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  clickLogin();
                }
              }}
            />
          </div>
          <div className="input__wrap -icon mb-3 mb-xxl-5">
            <i className="icon-lock"></i>
            <input
              type="password"
              className="input form-control"
              placeholder="**********"
              {...register('password', {
                required: true,
              })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  clickLogin();
                }
              }}
            />
          </div>
          <div className="form-group text__wrap">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>

          <p className="login__box__text">
            <Link href="/register">
              <strong>Create a new account</strong>
            </Link>
          </p>

          <div className="form-group mb-3 text-center">
            <div className="wpuf-submit-button" onClick={clickLogin}>
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                'SIGN IN'
              )}
            </div>

            {/* <div className="login__socical">
              <p className="login__socical__text">or with</p>
              <div className="login__socical__wrap position-relative">
                <ul className="login__socical__list">
                  <li>
                    <CommonLink to="">
                      <span className="icon-instagram"></span>
                    </CommonLink>
                  </li>
                  <li>
                    <CommonLink to="">
                      <span className="icon-facebook"></span>
                    </CommonLink>
                  </li>
                  <li>
                    <CommonLink to="">
                      <span className="icon-twitter"></span>
                    </CommonLink>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </form>
      </div>
    </Wrapper>
    );
}

export default LoginComponent