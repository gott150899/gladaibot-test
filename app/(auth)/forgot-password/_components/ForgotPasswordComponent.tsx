'use client'

import { AppContext } from "@/app/providers/appContext";
import { forgotPasswordApi } from "@/app/utils/apis";
import { CircularProgress } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  .text {
    color: black;
  }

  .link {
    color: blue;
    cursor: pointer;
    transition: color 0.3s ease-in;

    :hover {
      color: lightblue;
    }
  }

  .wpuf-submit-button {
    cursor: pointer;
    text-align: center;
  }

  .MuiCircularProgress-root {
    margin: 0 auto;
    display: flex;
  }
`;

interface FormData {
    email: string;
}

const ForgotPasswordComponent = () =>{
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>();
  
    const [email, setEmail] = useState('');
  
    const { setToast } = useContext(AppContext);
  
    const [loading, setLoading] = useState(false);
    const [isSendSuccess, setIsSendSuccess] = useState(false);
    const [isResend, setIsResend] = useState(false);
  
    const handleForgotPassword = async (formData: FormData) => {
      try {
        const { email } = formData;
        setLoading(true);
        const res = await forgotPasswordApi({ email });
        setLoading(false);
  
        if (res.error) {
          setToast({
            msg: res.error,
            type: 'error',
          });
          return;
        }
        setIsSendSuccess(true);
      } catch (error: any) {
        setLoading(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    const resendResetEmail = async () => {
      await forgotPasswordApi({ email });
      setIsResend(true);
    };
  
    const clickForgotPassword = async () => {
      onSubmit();
      if (Object.keys(errors)) return;
    };
  
    const onSubmit = handleSubmit(
      (data) => {
        const form: FormData = { ...data };
        handleForgotPassword(form);
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
        <h1 className="login__box__title text-center">Forgot Password</h1>
  
        {!isSendSuccess && (
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
                    clickForgotPassword();
                  }
                }}
              />
            </div>
  
            <div className="form-group mb-3 text-center">
              <div className="wpuf-submit-button" onClick={clickForgotPassword}>
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  'RESET PASSWORD'
                )}
              </div>
            </div>
          </form>
        )}
  
        {isSendSuccess && !isResend && (
          <>
            <div className="text">
              We sent a reset password link to your email <strong>{email}</strong>
              . Please click on that link to complete reset password process.
            </div>
            <br />
            <div className="text">
              If you still haven't received it. Please try{' '}
              <span className="link" onClick={resendResetEmail}>
                clicking here
              </span>{' '}
              to send a new one.
            </div>
          </>
        )}
      </Wrapper>
    );
  };

export default ForgotPasswordComponent