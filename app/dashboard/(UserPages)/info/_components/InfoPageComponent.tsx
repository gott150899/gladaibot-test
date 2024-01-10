'use client'

import { AppContext } from "@/app/providers/appContext";
import { getCustomerInfoApi, updateInfo, userClaimInterestApi } from "@/app/utils/apis";
import { DEFAULT_COPY_TEXT, MOBILE_QUERY, STATIC_ENDPOINT } from "@/app/utils/constants";
import { GetCustomerInfoData } from "@/app/utils/models";
import { CircularProgress, Tooltip, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Wrapper } from "./styles";
import CommonUploadImage from "@/app/components/common/CommonUploadImage";
import VerifiedIcon from "@/app/components/icons/VerifiedIcon";
import WrongIcon from "@/app/components/icons/WrongIcon";
import { formatAmount } from "@/app/utils/commonFunc";

const goodCardImg = ''
const noCutImg = ''
const noBlurCardImg = ''
const noReflectiveCardImg = ''

interface FormData {
    identityCardFront: any;
    identityCardBack: any;
    avatar: any;
}

const ROOT_DOMAIN = process.env.ROOT_DOMAIN + ''

const InfoPageComponent = () =>{
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();
  
    const [loading, setLoading] = useState(true);
    const [loadingUpdateInfo, setLoadingUpdateInfo] = useState(false);
    const [loadingClaim, setLoadingClaim] = useState(false);
    const { userInfo, setToast, getUserInfo } = useContext(AppContext);
    const [copyTitle, setCopyTitle] = useState(DEFAULT_COPY_TEXT);
    const [customerInfo, setCustomerInfo] = useState({} as GetCustomerInfoData);
    const isMobile = useMediaQuery(MOBILE_QUERY);
    const [avatarSrc, setAvatarSrc] = useState('');
    const [cardFrontSrc, setCardFrontSrc] = useState('');
    const [cardBackSrc, setCardBackSrc] = useState('');
  
    const getCustomerInfo = async () => {
      try {
        setLoading(true);
        const res = await getCustomerInfoApi(userInfo.id);
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Get data fail',
            type: 'error',
          });
        }
  
        setCustomerInfo(res.data);
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
        handleUpdateInfo(form);
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
  
    const handleUpdateInfo = async (formData: FormData) => {
      try {
        const { avatar, identityCardFront, identityCardBack } = formData;
  
        setLoadingUpdateInfo(true);
        const res = await updateInfo({
          avatar,
          identityCardFront,
          identityCardBack,
        });
        setLoadingUpdateInfo(false);
  
        if (res.error) {
          setToast({
            msg: res.error,
            type: 'error',
          });
          return;
        }
  
        setCustomerInfo(res.data);
        getUserInfo();
        setToast({
          msg: 'Update successfully',
          type: 'success',
        });
      } catch (error: any) {
        setLoadingUpdateInfo(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    const clickUpdateInfo = async () => {
      onSubmit();
      if (Object.keys(errors)) return;
    };
  
    const onClickCopy = (text: string) => {
      navigator.clipboard.writeText(text);
  
      if (isMobile) {
        setToast({
          msg: 'Copied',
          type: 'success',
        });
      } else {
        setCopyTitle('Copied');
      }
    };
  
    const onExitedCopy = () => {
      setCopyTitle(DEFAULT_COPY_TEXT);
    };
  
    const claimInterest = async () => {
      try {
        setLoadingClaim(true);
        const res = await userClaimInterestApi(userInfo.id);
        setLoadingClaim(false);
  
        if (!res.success) {
          setToast({
            msg: 'Claim interest fail',
            type: 'error',
          });
        }
  
        setToast({
          msg: 'Claim interest successfully',
          type: 'success',
        });
        getCustomerInfo();
      } catch (error: any) {
        setLoadingClaim(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    useEffect(() => {
      if (userInfo.id) {
        getCustomerInfo();
      }
    }, [userInfo]);
  
    useEffect(() => {
      if (customerInfo.id) {
        userInfo?.avatar && setAvatarSrc(STATIC_ENDPOINT + userInfo.avatar);
        userInfo?.identityCardFront &&
          setCardFrontSrc(STATIC_ENDPOINT + userInfo.identityCardFront);
        userInfo?.identityCardBack &&
          setCardBackSrc(STATIC_ENDPOINT + userInfo.identityCardBack);
      }
    }, [customerInfo]);
  
    return (
      <Wrapper>
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">User Info</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        {!loading && (
          <>
            <div className="el__box">
              <p>
                <span>First Name: </span>
                <span>{customerInfo.firstName}</span>
              </p>
              <p>
                <span>Lase Name: </span>
                <span>{customerInfo.lastName}</span>
              </p>
              <p>
                <span>Email: </span>
                <span>{customerInfo.email}</span>
              </p>
              <p>
                <span>Wallet Address: </span>
                <span>{customerInfo.walletAddress}</span>
              </p>
              <p>
                <span>Refer By: </span>
                <span>{customerInfo.refBy}</span>
              </p>
              {/* <p>
                <span>Ref Left: </span>
                <span>{customerInfo.refCodeLeft}</span> 
              </p>
              <p>
                <span>Ref Right: </span>
                <span>{customerInfo.refCodeRight}</span>
                 
              </p> */}
  
   <p>
                <p>Ref Link Left: </p>
                <a  style={{textDecoration: 'underline', fontWeight:'bold'}} target={'_blank'} href={`${ROOT_DOMAIN}/register?refCode=${userInfo.refCodeLeft
                        }`}>{customerInfo.refCodeLeft}</a>
                <Tooltip
                  title={copyTitle}
                  placement="right"
                  TransitionProps={{
                    onExited: onExitedCopy,
                  }}
                  arrow
                >
                  <button
                    type="button"
                    className="el__box__copy js-item-copy"
                    onClick={() =>
                      onClickCopy(
                        `${ROOT_DOMAIN}/register?refCode=${userInfo.refCodeLeft
                        }`
                      )
                    }
                  >
                    Copy Link
                  </button>
                </Tooltip>
              </p>
              <p>
                <p>Ref Link Right: </p>
                <a style={{textDecoration: 'underline', fontWeight:'bold'}} href={ `${ROOT_DOMAIN}/register?refCode=${userInfo.refCodeRight
                        }`} target={'_blank'}> {customerInfo.refCodeRight}</a>
                <Tooltip
                  title={copyTitle}
                  placement="right"
                  TransitionProps={{
                    onExited: onExitedCopy,
                  }}
                  arrow
                >
                  <button
                    type="button"
                    className="el__box__copy js-item-copy"
                    onClick={() =>
                      onClickCopy(
                        `${ROOT_DOMAIN}/register?refCode=${userInfo.refCodeRight
                        }`
                      )
                    }
                  >
                    Copy Link
                  </button>
                </Tooltip>
              </p>
  
  
              <form>
                <label>Avatar:</label>
                <br />
                <CommonUploadImage
                  title="Avatar"
                  src={avatarSrc}
                  setSrc={setAvatarSrc}
                  inputRegister={register('avatar')}
                  width={150}
                  height={150}
                  circle
                  objectFit="cover"
                />
  
                <div className="identity_wrap">
                  <div className="title">Identity Verification</div>
                  <div className="card_imgs">
                    <div className="card_sample">
                      <img src={goodCardImg} />
                      <div className="text">Good</div>
                    </div>
                    <div className="card_sample">
                      <img src={noCutImg} />
                      <div className="text">Not cropped</div>
                    </div>
                    <div className="card_sample">
                      <img src={noBlurCardImg} />
                      <div className="text">Not blur</div>
                    </div>
                    <div className="card_sample">
                      <img src={noReflectiveCardImg} />
                      <div className="text">Not reflective</div>
                    </div>
                  </div>
                  <div className="requirements">
                    <p>
                      <VerifiedIcon /> Government-issued
                    </p>
                    <p>
                      <VerifiedIcon /> Original full-size, unedited documents
                    </p>
                    <p>
                      <VerifiedIcon /> Place documents against a single-coloured
                      background
                    </p>
                    <p>
                      <VerifiedIcon /> Readable, well-lit, coloured images
                    </p>
                    <p>
                      <WrongIcon /> No black and white images
                    </p>
                    <p>
                      <WrongIcon /> No edited or expired documents
                    </p>
                  </div>
                  <div className="file_text">
                    File size must be between 10KB and 5120KB in ..jpg/.jpeg/.png
                    format.
                  </div>
  
                  <div className="upload">
                    <CommonUploadImage
                      title="Identity Card Front"
                      src={cardFrontSrc}
                      setSrc={setCardFrontSrc}
                      inputRegister={register('identityCardFront')}
                      objectFit="contain"
                    />
                    <CommonUploadImage
                      title="Identity Card Back"
                      src={cardBackSrc}
                      setSrc={setCardBackSrc}
                      inputRegister={register('identityCardBack')}
                      objectFit="contain"
                    />
                  </div>
                </div>
  
                <div className="col-md-12 text-center">
                  <button
                    type="button"
                    className="el__box__btn"
                    onClick={clickUpdateInfo}
                  >
                    {loadingUpdateInfo ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Update Info'
                    )}
                  </button>
                </div>
              </form>
            </div>
  
            <div className="el__box">
              <h6 className="mb-1">
                <strong>
                  Available Interest: {formatAmount(customerInfo.totalInterest)}{' '}
                  BNB
                </strong>
              </h6>
              <div className="col-md-12 text-center">
                <button
                  type="button"
                  className="el__box__btn"
                  onClick={claimInterest}
                >
                  {loadingClaim ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    'Claim Interest'
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </Wrapper>
    );
  };

export default InfoPageComponent