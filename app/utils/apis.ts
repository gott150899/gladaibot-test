import { TRANSACTION_STATUS, TRANSACTION_TYPES } from './constants';
import globalAxios from './globalAxios';
import {
  CancelRequestWithdrawRes,
  CancelStakingRes,
  CreateCustomerProgramingProps,
  CreateProgramRes,
  CreateTransactionProps,
  CreateTransactionRes,
  CreateTransferProps,
  CustomerProgramRes,
  DepositAmountToUserPros,
  DepositAmountToUserRes,
  DisableProgramsRes,
  ForgotPassRes,
  ForgotProps,
  GetCustomerInfoRes,
  GetCustomerLowLevelRes,
  GetProgramRes,
  GetProgramSavingRes,
  GetProgramsRes,
  GetReStakingRes,
  GetTransactionRes,
  GetUserInfoRes,
  GetUserNetworkRes,
  GetUserRes,
  GetUsersRes,
  LockUserRes,
  LoginProps,
  LoginRes, ResendVerifyEmailRes,
  ResetProps,
  ResetRes,
  SignupProps,
  SignupRes,
  UpdateInfoProps,
  UpdateInfoRes,
  UpdateInterestRateRes,
  UpdateProgramRes,
  UserClaimInterestRes,
  UserProfileReq,
  UserProfileRes,
  VerifyEmailRes
} from './models';

export const forgotPasswordApi = async (props: ForgotProps) => {
  const { email } = props;
  const data: ForgotPassRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Account/ForgotPassword`,
      {
        email,
      }
    )
  ).data;
  return data;
};

export const resetPassword = async (props: ResetProps) => {
  const { email, password, confirmPassword, code } = props;
  const data: ResetRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Account/ResetPassword`,
      {
        email,
        password,
        confirmPassword,
        code,
      }
    )
  ).data;
  return data;
};

export const updateInfo = async (
  props: UpdateInfoProps
): Promise<UpdateInfoRes> => {
  const { avatar, identityCardBack, identityCardFront } = props;
  let bodyFormData = new FormData();
  bodyFormData.append('identityCardBack', identityCardBack[0]);
  bodyFormData.append('identityCardFront', identityCardFront[0]);
  bodyFormData.append('avatar', avatar[0]);

  const data: UpdateInfoRes = (
    await globalAxios({
      method: 'post',
      url: `${(process.env.API_ENDPOINT + '').replace(
        'testnet',
        ''
      )}/Account/UploadFiles`,
      data: bodyFormData,
    })
  ).data;

  return data;
};

export const loginApi = async (props: LoginProps) => {
  const { email, password } = props;
  const data: LoginRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Account/Login`,
      {
        email,
        password,
      }
    )
  ).data;
  return data;
};

export const signupApi = async (props: SignupProps) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    walletAddress,
    parentCode,
  } = props;
  const data: SignupRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Account/Register`,
      {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        walletAddress,
        parentCode,
      }
    )
  ).data;

  return data;
};

export const getUserInfoApi = async () => {
  const data: GetUserInfoRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/Account/GetUserInfo`
    )
  ).data;
  return data;
};

export const verifyEmailApi = async (emailToken: string, email: string) => {
  const data: VerifyEmailRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Account/ConfirmEmailRegister?email=${email}&token=${emailToken}`
    )
  ).data;
  return data;
};

export const resendVerifyEmailApi = async (email: string) => {
  const data: ResendVerifyEmailRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Account/ResendMailRegister?email=${email}`
    )
  ).data;
  return data;
};

export const getCustomerInfoApi = async (userId: number) => {
  const data: GetCustomerInfoRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/Customer/GetCustomerInfo/${userId}`
    )
  ).data;
  return data;
};

export const getProgramSavingApi = async () => {
  const data: GetProgramSavingRes = (
    await globalAxios.get(`${process.env.API_ENDPOINT}/ProgramSaving`)
  ).data;
  return data;
};

export const getProgramsApi = async () => {
  const data: GetProgramsRes = (
    await globalAxios.get(`${process.env.API_ENDPOINT}/admin/Programs`)
  ).data;
  return data;
}

export const updateFlagProgramApi = async (id: number, originFlag: 'D' | '') => {
  const newFlag = originFlag === 'D' ? null : 'D';

  const data: DisableProgramsRes = (
    await globalAxios.patch(`${process.env.API_ENDPOINT}/admin/UpdateFlagProgram/${id}`,
      { flag: newFlag })
  ).data;
  return data;
}

export const getProgramApi = async (id: number) => {
  const data: GetProgramRes = (
    await globalAxios.get(`${process.env.API_ENDPOINT}/admin/Programs/${id}`)
  ).data;
  return data;
}

export const getReStakingApi = async () => {
  const data: GetReStakingRes = (
    await globalAxios.get(`${process.env.API_ENDPOINT}/Customer/GetCustomerReStaking`)
  ).data;
  return data;
}

export const createProgramApi = async (program: any) => {
  const data: CreateProgramRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/admin/CreateProgram`,
      program
    )
  ).data;
  return data;
}

export const updateProgramApi = async (id: number, program: any) => {
  const data: UpdateProgramRes = (
    await globalAxios.patch(
      `${process.env.API_ENDPOINT}/admin/UpdateProgram/${id}`,
      program
    )
  ).data;
  return data;
}

export const getTransactionApi = async (
  walletAddress: string,
  types: string[] = []
) => {
  // transactionType = null equivalent to all types
  const typeFilter = `&transactionType=${types.join(',')}`;

  const data: GetTransactionRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Transaction/GetTransactionFromAddress?address=${walletAddress}` +
      typeFilter
    )
  ).data;
  return data;
};

export const getTransactionInterestAndCommisionFromAddressApi = async (
  walletAddress: string,
  types: string[] = []
) => {
  const data: GetTransactionRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Transaction/getTransactionInterestAndCommisionFromAddress?address=${walletAddress}`
    )
  ).data;
  return data;
};

export const getTransactionRequestApi = async (types: string[] = []) => {
  // transactionType = null equivalent to all types
  const typeFilter = `?transactionType=${types.join(',')}`;

  const data: GetTransactionRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Transaction/GetTransactionAddressRequest` + typeFilter
    )
  ).data;
  return data;
};

export const lockUserApi = async (
  userId: string,
  lock: boolean = true
): Promise<LockUserRes | undefined> => {
  const data: LockUserRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/admin/userLock`,
      {
        userId,
        lock,
      }
    )
  ).data;

  return data;
};

export const getUsersApi = async (
  prev: number = 0,
  next: number = 0,
  limit: number = 20
): Promise<GetUsersRes | undefined> => {
  const typeFilter = `?limit=${limit}&next=${next}&prev=${prev}`;

  const data: GetUsersRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/admin/users` + typeFilter
    )
  ).data;

  return data;
};

export const getUserApi = async (
  query: string
): Promise<GetUserRes | undefined> => {
  const data: GetUserRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/admin/users/${query}`
    )
  ).data;

  return data;
};

export const updateUserProfileApi = async (
  props: UserProfileReq
): Promise<UserProfileRes | undefined> => {
  const {
    identityCardBack,
    identityCardFront,
    avatar,
    firstName,
    lastName,
    email,
    walletAddress,
    userId,
    userName,
    password,
    phoneNumber,
  } = props;

  let bodyFormData = new FormData();
  bodyFormData.append('identityCardFront', identityCardFront[0]);
  bodyFormData.append('identityCardBack', identityCardBack[0]);
  bodyFormData.append('avatar', avatar[0]);
  bodyFormData.append('firstName', firstName);
  bodyFormData.append('lastName', lastName);
  bodyFormData.append('email', email);
  bodyFormData.append('phoneNumber', phoneNumber);
  bodyFormData.append('walletAddress', walletAddress);
  bodyFormData.append('userId', userId);
  bodyFormData.append('userName', userName);
  bodyFormData.append('password', password);

  const data: UserProfileRes | undefined = (
    await globalAxios({
      method: 'post',
      url: `${process.env.API_ENDPOINT}/admin/UpdateUserProfile`,
      data: bodyFormData,
    })
  ).data;

  return data;
};

export const createTransactionApi = async (props: CreateTransactionProps) => {
  const { type, amount, walletAdress } = props;

  const requestData = {
    type,
    amount,
    addressPayment:
      type === TRANSACTION_TYPES.deposit || TRANSACTION_TYPES.staking
        ? walletAdress
        : process.env.WALLET_ADDRESS, // type withdraw must be addressPayment is system address
    addressReceive: type === TRANSACTION_TYPES.withdraw ? walletAdress : '',
    status: TRANSACTION_STATUS.sending,
  };
  const data: CreateTransactionRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Transaction`,
      requestData
    )
  ).data;

  return data;
};

export const createTransferApi = async (props: CreateTransferProps) => {
  const { amount, fromAddress, toAddress, otp } = props;
  const data: SignupRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Transaction/Transfer?otp=${otp}`,
      {
        amount,
        addressPayment: fromAddress,
        addressReceive: toAddress,
        status: TRANSACTION_STATUS.sending,
      }
    )
  ).data;

  return data;
};

export const sentOtpTransferApi = async (props: CreateTransferProps) => {
  const { amount, fromAddress, toAddress } = props;
  const data: SignupRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Transaction/SendOtpTransfer`,
      {
        amount,
        addressPayment: fromAddress,
        addressReceive: toAddress,
        status: TRANSACTION_STATUS.sending,
      }
    )
  ).data;

  return data;
};

export const getUserNetworkApi = async (userId: number) => {
  const data: GetUserNetworkRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/Customer/CustomerNetwork/${userId}`
    )
  ).data;
  return data;
};

export const getUserNetworkApiV2 = async (userId: number) => {
  const data: GetUserNetworkRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/Customer/CustomerNetworkV2/${userId}`
    )
  ).data;
  return data;
};

export const createFullCustomerProgramingApi = async (
  props: CreateCustomerProgramingProps
) => {
  const { programId, customerId, amount, daysLock } = props;
  const data: SignupRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/CustomerProgram/FullStaking${daysLock > 0 ? ('?daysLock=' + daysLock) : ''}`,
      {
        programId,
        amount,
        customerId,
        status: TRANSACTION_STATUS.success,
      }
    )
  ).data;

  return data;
};

export const createPartialCustomerProgramingApi = async (
  props: CreateCustomerProgramingProps
) => {
  const { programId, customerId, amount } = props;
  const data: SignupRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/CustomerProgram/PartialStaking`,
      {
        programId,
        amount,
        customerId,
        status: TRANSACTION_STATUS.success,
      }
    )
  ).data;

  return data;
};

export const userClaimInterestApi = async (userId: number) => {
  const data: UserClaimInterestRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/Customer/ClaimInterest/${userId}`
    )
  ).data;
  return data;
};

export const cancelStakingApi = async (customerProgramId: number) => {
  const data: CancelStakingRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/CustomerProgram/CancelStaking/${customerProgramId}`
    )
  ).data;
  return data;
};

export const cancelWithdrawRequestApi = async (transactionId: number) => {
  const data: CancelRequestWithdrawRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Transaction/CancelRequestWithdraw/${transactionId}`
    )
  ).data;
  return data;
};

export const getCustomerProgramApi = async (userId: number) => {
  const data: CustomerProgramRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT}/CustomerProgram/${userId}`
    )
  ).data;
  return data;
};

export const updateInterestRateApi = async (userId: number, interestRate: number) => {
  const data: UpdateInterestRateRes = (
    await globalAxios.patch(
      `${process.env.API_ENDPOINT}/admin/interestRate/${userId}`,
      {
        interestRate
      }
    )
  ).data;
  return data;
};

export const depositAmountToUserApi = async (
  props: DepositAmountToUserPros
) => {
  const { userIds, amount } = props;
  const data: DepositAmountToUserRes = (
    await globalAxios.post(
      `${process.env.API_ENDPOINT}/Admin/PayAmountToUser`,
      {
        userIds,
        amount,
      }
    )
  ).data;
  return data;
};

export const getCustomerLowLevel = async (userId: number) => {
  const data: GetCustomerLowLevelRes = (
    await globalAxios.get(
      `${process.env.API_ENDPOINT
      }/Customer/GetCustomerLowlevel/${userId}`
    )
  ).data;
  return data;
};

export const getRevenueInMonth = async () => {
  const data: number = (
    await globalAxios.get(`${process.env.API_ENDPOINT}/Customer/GetRevenueInMonth`)
  ).data.data;
  return data;
};