'use client'

import { AppContext } from "@/app/providers/appContext";
import { resendVerifyEmailApi, verifyEmailApi } from "@/app/utils/apis";
import { CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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

  .MuiCircularProgress-root {
    margin: 0 auto;
    display: flex;
  }
`;

const VerifySignupComponent = () =>{
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const emailToken = searchParams.get('token');
    const { setToast } = useContext(AppContext);
    const [verifyFail, setVerifyFail] = useState(false);
    const [isResend, setIsResend] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
  
    const resendVerifyEmail = async () => {
      if (email) {
        try {
          setLoadingResend(true);
          const res = await resendVerifyEmailApi(email);
  
          if (res.error) {
            setToast({
              msg: res.error,
              type: 'error',
            });
            return;
          }
  
          setToast({
            msg: 'Resend verification email successfully',
            type: 'success',
          });
  
          setIsResend(true);
          setLoadingResend(false);
        } catch (error: any) {
          setLoadingResend(false);
          setToast({
            msg: error,
            type: 'error',
          });
        }
      }
    };
  
    useEffect(() => {
      if (emailToken && email) {
        try {
          (async () => {
            const res = await verifyEmailApi(emailToken, email);
  
            if (res.error) {
              setToast({
                msg: res.error,
                type: 'error',
              });
              return;
            }
  
            if (!res.data.succeeded) {
              setVerifyFail(true);
              return;
            }
  
            setToast({
              msg: 'Verify email successfully',
              type: 'success',
            });
  
            router.push('/login');
          })();
        } catch (error: any) {
          setToast({
            msg: error,
            type: 'error',
          });
        }
      }
    }, [emailToken, email]);
  
    return (
      <Wrapper>
        <h1 className="login__box__title text-center">Verify Account</h1>
  
        {!verifyFail && !loadingResend && !isResend && (
          <>
            <div className="text">
              We sent a verification link to your email <strong>{email}</strong>.
              Please click on that link to complete signup process.
            </div>
            <br />
            <div className="text">
              If you still haven't received it. Please try{' '}
              <span className="link" onClick={resendVerifyEmail}>
                clicking here
              </span>{' '}
              to send a new one.
            </div>
          </>
        )}
  
        {verifyFail && !loadingResend && (
          <div className="text">
            Something went wrong with verification link. Please try{' '}
            <div className="link" onClick={resendVerifyEmail}>
              clicking here
            </div>{' '}
            to send a new one.
          </div>
        )}
  
        {loadingResend && <CircularProgress />}
  
        {isResend && (
          <div className="text">
            We have resend the verification link to your email{' '}
            <strong>{email}</strong>. Please click on that link to complete signup
            process.
          </div>
        )}
      </Wrapper>
    );
  };

export default VerifySignupComponent