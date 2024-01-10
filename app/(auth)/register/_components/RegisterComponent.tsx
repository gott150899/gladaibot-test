'use client'

import { AppContext } from "@/app/providers/appContext";
import { signupApi } from "@/app/utils/apis";
import { CircularProgress } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  .wpuf-submit-button {
    cursor: pointer;
    text-align: center;
  }
`;

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    firstName: string;
    lastName: string;
    walletAddress: string;
    parentCode: string;
}

const RegisterComponent = () =>{
    const searchParams = useSearchParams();
    const refCode = searchParams.get('refCode');
    const router = useRouter()
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm<FormData>();
    const { setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

  const callSignup = async (formData: FormData) => {
    try {
      const { email, password, confirmPassword, firstName, lastName, walletAddress, parentCode, } = formData;
      setLoading(true);
      const res = await signupApi({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        walletAddress,
        parentCode,
      });
      setLoading(false);

      if (res.error) {
        setToast({
          msg: res.error,
          type: 'error',
        });
        return;
      }

      setToast({
        msg: 'Signup successfully',
        type: 'success',
      });

      router.push(`/verify-signup?email=${email}`);
    } catch (error: any) {
      setLoading(false);
      setToast({
        msg: error,
        type: 'error',
      });
    }
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

  const clickSignup = () => {
    onSubmit();
    if (Object.keys(errors)) return;
  };

    useEffect(() => {
        if (refCode) {
            setValue('parentCode', refCode);
        }
    }, [refCode, setValue]);

    return (
        <div className="h-full">
            <Wrapper>
                <form>
                    <h1 className="login__box__sub">Create a new account</h1>

                    <label>Email *</label>
                    <div className="input__wrap -icon mb-3 mb-xxl-4">
                    <i className="icon-user"></i>
                    <input
                        type="text"
                        className="input form-control"
                        {...register('email', {
                        required: true,
                        })}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            clickSignup();
                        }
                        }}
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
                            clickSignup();
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
                            clickSignup();
                        }
                        }}
                    />
                    </div>

                    <label>First Name *</label>
                    <div className="input__wrap -icon mb-3 mb-xxl-4">
                    <i className="icon-user"></i>
                    <input
                        type="text"
                        className="input form-control"
                        {...register('firstName', {
                        required: true,
                        })}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            clickSignup();
                        }
                        }}
                    />
                    </div>

                    <label>Last Name *</label>
                    <div className="input__wrap -icon mb-3 mb-xxl-4">
                    <i className="icon-user"></i>
                    <input
                        type="text"
                        className="input form-control"
                        {...register('lastName', {
                        required: true,
                        })}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            clickSignup();
                        }
                        }}
                    />
                    </div>

                    <label>Wallet Address * (Binance Smart Chain)</label>
                    <div className="input__wrap -icon mb-3 mb-xxl-4">
                    <i className="icon-user"></i>
                    <input
                        type="text"
                        className="input form-control"
                        {...register('walletAddress', {
                        required: true,
                        })}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            clickSignup();
                        }
                        }}
                    />
                    </div>

                    <label>Referral Code</label>
                    <div className="input__wrap -icon mb-3 mb-xxl-4">
                    <i className="icon-user"></i>
                    <input
                        type="text"
                        className="input form-control"
                        {...register('parentCode')}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            clickSignup();
                        }
                        }}
                    />
                    </div>

                    <div className="form-group mb-3 text-center pb-3">
                        <div className="wpuf-submit-button" onClick={clickSignup}>
                            {loading ? (
                            <CircularProgress size={30} color="inherit" />
                            ) : (
                            'SIGN UP'
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
            </Wrapper>
        </div>
    )
}

export default RegisterComponent