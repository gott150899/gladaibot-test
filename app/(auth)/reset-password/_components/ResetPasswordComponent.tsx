'use client'

import { AppContext } from "@/app/providers/appContext";
import { resetPassword } from "@/app/utils/apis";
import { CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
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
    password: string;
    confirmPassword: string;
}

const ResetPasswordComponent = () =>{
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>();
  
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('email') as string;
    const code = searchParams.get('code') as string;
    const { setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
  
    const handleResetPassword = async (formData: FormData) => {
      try {
        const { password, confirmPassword } = formData;
        if (password != confirmPassword) {
          setToast({
            msg: 'Password and Confirm Password are not the same',
            type: 'error',
          });
          return;
        }
  
        setLoading(true);
        const res: any = await resetPassword({ email, code, password, confirmPassword, });
        setLoading(false);
  
        if (res.error) {
          setToast({
            msg: res.error,
            type: 'error',
          });
          return;
        }
  
        router.push('/login');
      } catch (error: any) {
        setLoading(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    const clickResetPassword = async () => {
      onSubmit();
      if (Object.keys(errors)) return;
    };
  
    const onSubmit = handleSubmit(
      (data) => {
        const form: FormData = { ...data };
        handleResetPassword(form);
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
        <h1 className="login__box__title text-center">Reset Password</h1>
  
        <form>
          <label>Email *</label>
          <div className="input__wrap -icon mb-3 mb-xxl-4">
            <i className="icon-user"></i>
            <input
              disabled
              type="email"
              className="input form-control"
              value={email}
            />
          </div>
          <label>Password *</label>
          <div className="input__wrap -icon mb-3 mb-xxl-4">
            <i className="icon-lock"></i>
            <input
              type="password"
              className="input form-control"
              {...register('password', {
                required: true,
              })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  clickResetPassword();
                }
              }}
            />
          </div>
  
          <label>Confirm Password *</label>
          <div className="input__wrap -icon mb-3 mb-xxl-4">
            <i className="icon-lock"></i>
            <input
              type="password"
              className="input form-control"
              {...register('confirmPassword', {
                required: true,
              })}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  clickResetPassword();
                }
              }}
            />
          </div>
  
          <div className="form-group mb-3 text-center">
            <div className="wpuf-submit-button" onClick={clickResetPassword}>
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                'RESET PASSWORD'
              )}
            </div>
          </div>
        </form>
      </Wrapper>
    );
  };

export default ResetPasswordComponent