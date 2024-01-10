'use client'

import CommonField from '@/app/components/common/CommonField';
import CommonUploadImage from '@/app/components/common/CommonUploadImage';
import NetworkV2PageComponent from '@/app/dashboard/(UserPages)/network-v2/_components/NetworkV2PageComponent';
import { AppContext } from '@/app/providers/appContext';
import { PopupMessageError, PopupMessageSuccess, PopupMessageWarning } from '@/app/utils/alertPopup';
import { getUserApi, updateUserProfileApi } from '@/app/utils/apis';
import { formatAmount } from '@/app/utils/commonFunc';
import { STATIC_ENDPOINT } from '@/app/utils/constants';
import { GetUserRes, UserData, UserProfileReq, UserProfileRes } from '@/app/utils/models';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import CustomerProgramsPageComponent from './CustomerProgramsPageComponent';
import { useRouter } from 'next/router';

const Wrapper = styled.div`

`;

interface FormData {
    identityCardFront: any;
    identityCardBack: any;
    avatar: any;
}

const UserDetailPageComponent = () =>{
    const router = useRouter();
    const id = router.query['id'] as string;

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserData>({} as UserData);
    const { setToast } = useContext(AppContext);
  
    useEffect(() => {
      getUser(id);
    }, [id]);
  
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();
  
    const actionHanler = handleSubmit(
      async (data) => {
        const form: FormData = { ...data };
  
        const req: UserProfileReq = {
          userId: id || "",
          firstName, lastName, email,
          userName, phoneNumber,
          walletAddress, password,
          ...form
        }
  
        const res: UserProfileRes | undefined = await updateUserProfileApi(req);
        if (!res?.success) {
          PopupMessageError(setToast, "Update failed");
  
          setUserName(user.userName);
          setPassword("");
          setWalletAddress(user.walletAddress);
          setEmail(user.email);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNumber(user.phoneNumber);
  
          setAvatarSrc(STATIC_ENDPOINT + user.avatar);
          setIdentityCardFrontSrc(STATIC_ENDPOINT + user.identityCardFront);
          setIdentityCardBackSrc(STATIC_ENDPOINT + user.identityCardBack);
        }
  
        PopupMessageSuccess(setToast, "Update succeed");
      },
      (errors) => {
        PopupMessageWarning(setToast, errors);
      }
    );
  
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [avatarSrc, setAvatarSrc] = useState<string>('');
    const [identityCardFrontSrc, setIdentityCardFrontSrc] = useState<string>('');
    const [identityCardBackSrc, setIdentityCardBackSrc] = useState<string>('');
  
    useEffect(() => {
      setUserName(user.userName);
      setPassword("");
      setWalletAddress(user.walletAddress);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
  
      setAvatarSrc(STATIC_ENDPOINT + user.avatar);
      setIdentityCardFrontSrc(STATIC_ENDPOINT + user.identityCardFront);
      setIdentityCardBackSrc(STATIC_ENDPOINT + user.identityCardBack);
    }, [user]);
    const getUser = async (query: string) => {
      try {
        if (!query) {
          PopupMessageWarning(setToast, 'UserId or Email is invalid');
          return;
        }
  
        const res: GetUserRes | undefined = await getUserApi(query);
  
        if (!res?.success || !res.data) {
          PopupMessageError(setToast, 'Get user is failed');
          return;
        }
  
        setUser(res.data);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      }
    };
  
    return (
      <Wrapper>
        {/* <Helmet>
          <title>User Detail Management</title>
        </Helmet> */}
  
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">User Detail Management</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">USER</h6>
        </header>
  
        {!loading && (
          <>
            <div className="row">
              <div className="col-lg-3 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Available</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.available)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Deposit</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.totalDeposit)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Withdraw</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.totalWithdraw)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Staking</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.totalStaking)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Interest</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.totalInterest)} BNB
                  </p>
                </div>
              </div>
  
              <div className="col-lg-3 col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <p>Total Earned RACA</p>
                  <p className="el__box__textlarge">
                    {formatAmount(user.totalRaca)} RACA
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
  
        <hr></hr>
  
        <CustomerProgramsPageComponent customerId={user?.id} />
  
        <hr></hr>
  
        {/* Edit Profile */}
        <header className="ac__header mb-0">
          <div className="sub_dashbard_header mb-2">
            <h3 className="el__box__title">Edit User info</h3>
            <h6 className="ac__header__sub mt-3">{user.email}</h6>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        {!loading && (
          <div>
            <button
              className="el__box__btn my-3"
              onClick={() => actionHanler()}
            >
              Save Profile
            </button>
  
            <div className="row">
              <div className="col-md-4">
                <p className="mb-1">UserName</p>
                <CommonField
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
  
              <div className="col-md-4">
                <p className="mb-1">Password</p>
                <CommonField
                  type="password"
                  name="password"
                  placeholder="Input your new Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <div className="col-md-4">
                <p className="mb-1">WalletAddress</p>
                <CommonField
                  type="text"
                  name="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
  
              <div className="col-md-4 mt-4">
                <p className="mb-1">Email</p>
                <CommonField
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div className="col-md-4 mt-4">
                <p className="mb-1">First Name</p>
                <CommonField
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
  
              <div className="col-md-4 mt-4">
                <p className="mb-1">Last Name</p>
                <CommonField
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
  
              <div className="col-md-4 mt-4">
                <p className="mb-1">PhoneNumber</p>
                <CommonField
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
  
              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <p className="mb-1">Avatar</p>
                    <CommonUploadImage
  
                      title="Avatar"
                      src={avatarSrc}
                      setSrc={setAvatarSrc}
                      width={150}
                      height={150}
                      circle
                      objectFit="cover"
                      inputRegister={register('avatar')}
                    />
                  </div>
                  <div className="col-md-4">
                    <p className="mb-1">Identity Card Front</p>
                    <CommonUploadImage
  
                      title="Identity Front"
                      src={identityCardFrontSrc}
                      setSrc={setIdentityCardFrontSrc}
                      width={150}
                      height={150}
                      circle
                      objectFit="cover"
                      inputRegister={register('identityCardFront')}
                    />
                  </div>
                  <div className="col-md-4">
                    <p className="mb-1">Identity Card Back</p>
                    <CommonUploadImage
                      title="Identity Back"
                      src={identityCardBackSrc}
                      setSrc={setIdentityCardBackSrc}
                      width={150}
                      height={150}
                      circle
                      objectFit="cover"
                      inputRegister={register('identityCardBack')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
  
        <hr></hr>
  
        {user?.id && <NetworkV2PageComponent id={user?.id} />}
  
      </Wrapper>
    );
  }

export default UserDetailPageComponent