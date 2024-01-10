export interface ForgotProps {
  email: string;
}

export interface ForgotPassRes {
  success: boolean;
  error?: string;
  data?: ForgotPassData;
}

export interface ForgotPassData {
  destination: string;
  subject: string;
  body: string;
}

export interface ResetProps {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export interface ResetRes {
  success: boolean;
  error?: string;
  data?: string;
}

export interface UpdateInfoProps {
  identityCardFront: any;
  identityCardBack: any;
  avatar: any;
}

export interface UpdateInfoRes {
  success: boolean;
  error?: string;
  data: GetCustomerInfoData;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginRes {
  success: boolean;
  error?: any;
  data: LoginData;
  redirectUrl: string;
}

export interface LoginData {
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  role: string;
  createAt: string;
  expireAt: string;
}

export interface SignupProps {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  walletAddress: string;
  parentCode: string;
}

export interface SignupRes {
  success: boolean;
  error?: any;
  data: SignupData;
  redirectUrl: string;
}

export interface SignupData {
  code: string;
  content: string;
  subtitle: string;
}
export interface GetUserInfoData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  parentCode: string;
  refCodeLeft: string;
  refCodeRight: string;
  refRevenue: number;
  totalCommission: number;
  totalBonus: number;
  totalInterest: number;
  totalRevenueLeft: number;
  totalRevenueRight: number;
  totalDeposit: number;
  totalWithdraw: number;
  available: number;
  freeze: number;
  userBrand: number;
  walletAddress: string;
  userId: string;
  id: number;
  flag?: any;
  created: string;
  updated: string;
  avatar?: string;
  identityCardFront?: string;
  identityCardBack?: string;
  identityVerify?: boolean;
  role: string;
}
export interface GetUserInfoRes {
  success: boolean;
  error: string;
  data: GetUserInfoData;
}
export interface VerifyEmailRes {
  succeeded: boolean;
  errors: any[];
}

export interface VerifyEmailRes {
  success: boolean;
  error: string;
  data: VerifyEmailData;
  redirectUrl?: any;
}
export interface CreateTransactionProps {
  type: string;
  amount: number;
  walletAdress: string;
}
export interface CreateTransferProps {
  amount: number;
  fromAddress: string;
  toAddress: string;
  otp: string;
}
export interface CreateTransactionRes {
  success: boolean;
  error: string;
  data: CreateTransactionData;
}
export interface GetUserNetworkRes {
  success: boolean;
  error: string;
  data: NetworkUserData;
}
export interface CreateCustomerProgramingProps {
  programId: number;
  customerId: number;
  amount: number;
  daysLock: number
}

export interface CancelStakingRes {
  success: boolean;
  error: string;
  data: boolean;
}
export interface CancelRequestWithdrawRes {
  success: boolean;
  error: string;
  data: boolean;
}

export interface GetCustomerLowLevelRes {
  success: boolean;
  error: string;
  data: GetCustomerLowLevelData[];
}

export interface GetCustomerLowLevelData {
  name: string;
  email: string;
  refCodeLeft: string;
  refCodeRight: string;
  id: number;
  userId: string;
  walletAddress: string;
}
export interface GetCustomerOptionData {
   
  label: string; 
  value: string;
}

export interface CustomerProgramRes {
  success: boolean;
  error: string;
  data: CustomerProgramData[];
}

export interface DepositAmountToUserPros {
  userIds: string;
  amount: number;
}

export interface DepositAmountToUserRes {
  success: boolean;
  error: string;
  data: string;
}

export interface CustomerProgramData {
  depositId: number;
  programId: number;
  customerId: number;
  amount: number;
  total?: number;
  interestRate: number;
  begin: string;
  beginProgram: string;
  warning: string;
  end: string;
  endProgram: string;
  expire?: any;
  status: string;
  type?: string;
  correlation?: string;
  id: number;
  flag: string;
  created: string;
  updated: string;
}
export interface UserClaimInterestData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  parentCode: string;
  refCodeLeft: string;
  refCodeRight: string;
  refRevenue: number;
  indexRef: number;
  totalCommission: number;
  totalBonus: number;
  totalInterest: number;
  totalRevenueLeft: number;
  totalRevenueRight: number;
  totalDeposit: number;
  totalStaking: number;
  allStaking: number;
  totalWithdraw: number;
  totalRaca: number;
  available: number;
  freeze: number;
  userBrand: number;
  walletAddress: string;
  userId: string;
  identityCardFront?: any;
  identityCardBack?: any;
  avatar: string;
  identityVerify: boolean;
  role?: any;
  id: number;
  flag?: any;
  created: string;
  updated: string;
}

export interface UserClaimInterestRes {
  success: boolean;
  error: string;
  data: UserClaimInterestData;
}
export interface NetworkUserData {
  customerId: number;
  firstName: string;
  lastName: string;
  email: string;
  level: string;
  totalMember: number;
  deposit: number;
  revenueLeft: number;
  revenueRight: number;
  commission: number;
  commissionInterest: number;
  commissionBalance: number;
  brandLeft?: NetworkUserData;
  brandRight?: NetworkUserData;
  child?: NetworkUserData[];
}

export interface CreateTransactionData {
  programId?: any;
  type: string;
  amount: number;
  amountReceived: number;
  addressPayment: string;
  addressReceive: string;
  description: string;
  transactionHash: string;
  userId: string;
  requestId: string;
  date: string;
  status: string;
  id: number;
  flag?: any;
  created: string;
  updated: string;
}
export interface VerifyEmailData {
  succeeded: boolean;
  errors: any[];
}
export interface TransactionData {
  transactionFrom?: any;
  programId: number;
  type: string;
  amount: number;
  withdrawAfterFee: number;
  fee: number;
  amountReceived: number;
  addressPayment: string;
  addressReceive: string;
  description: string;
  transactionHash: string;
  userId: string;
  requestId: string;
  date: string;
  status: string;
  id: number;
  flag?: any;
  created: string;
  updated: string;
  beginProgram: string;
  endProgram: string;
  customerEmail: string;
  customerReceiveEmail: string;
}

export interface GetCustomerInfoData {
  totalMemberBrandLeft: number;
  totalMemberBrandRight: number;
  dailyInterest: number;
  balanceAvailable: number;
  total: number;
  refBy: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  parentCode: string;
  refCodeLeft: string;
  refCodeRight: string;
  refRevenue: number;
  indexRef: number;
  totalCommission: number;
  totalBonus: number;
  totalInterest: number;
  totalRevenueLeft: number;
  totalRevenueRight: number;
  totalDeposit: number;
  totalStaking: number;
  allStaking: number;
  totalWithdraw: number;
  totalRaca: number;
  available: number;
  freeze: number;
  userBrand: number;
  walletAddress: string;
  userId: string;
  identityCardFront?: any;
  identityCardBack?: any;
  avatar: string;
  identityVerify: boolean;
  role?: any;
  id: number;
  flag?: any;
  created: string;
  updated: string;
}

export interface ResendVerifyEmailRes {
  success: boolean;
  error?: any;
  data: ResendVerifyEmailData;
  redirectUrl?: any;
}

export interface ResendVerifyEmailData {
  destination: string;
  subject: string;
  body: string;
}

export interface GetCustomerInfoRes {
  success: boolean;
  error: string;
  data: GetCustomerInfoData;
}

export interface UpdateProgramRes {
  success: boolean;
  error?: any;
  data: boolean;
}

export interface CreateProgramRes {
  success: boolean;
  error?: any;
  data: number;
}

export interface GetProgramRes {
  success: boolean;
  error?: any;
  data: ProgramSavingData;
}

export interface GetProgramsRes {
  success: boolean;
  error?: any;
  data: ProgramSavingData[];
}

export interface DisableProgramsRes {
  success: boolean;
  error?: any;
  data: boolean;
}

export interface ProgramSavingData {
  programColor: string | undefined;
  name: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  dayBlock: number;
  id: number;
  flag?: any;
  created: string;
  updated: string;
}
export interface GetProgramSavingRes {
  success: boolean;
  error?: any;
  data: ProgramSavingData[];
  redirectUrl?: any;
}
export interface GetTransactionRes {
  success: boolean;
  error?: any;
  data: TransactionData[];
  redirectUrl?: any;
}

export interface GetProgramsRes {

}

export interface GetProgramsReq {

}

export interface GetUsersRes {
  success: boolean;
  error: string;
  data: UserData[];
}

export interface UserProfileRes {
  success: boolean;
  error: string;
  data: any;
}
export interface UserProfileReq {
  userId: string;
  walletAddress: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
  identityCardFront: any;
  identityCardBack: any;
  avatar: any;
}

export interface GetReStakingRes {
  success: boolean;
  error: string;
  data: ReStakingData[];
}

export interface ReStakingData {
  id: number;
  userId: string;
  email: string;
  reStakingCount: number;
  racaWithdraw: number;
  customerPrograms: CustomerProgramData[];
}

export interface UpdateInterestRateRes {
  success: boolean;
  error: string;
  data: boolean;
}

export interface ProgramInfo {
  id: number;
  name: string;
  interest_rate: number;
  min_amount: number;
  max_amount: number;
  day_block: number;
  created: string;
  updated: string;
  programColor: string;
}

export interface UserProgramsData {
  id: number;
  program_id: number;
  customer_id: number;
  amount: number;
  interest_rate: number;
  begin: string;
  end: string;
  status: string;
  flag: string;
  created: string;
  updated: string;
  deposit_id: number;
  total: number;
  type: string;
  warning: string;
  begin_program: string;
  end_program: string;
  end_staking: string;
  cancel_charge_fee: number;
  programInfo: ProgramInfo[];
  correlation?: string;
}

export interface UserData {
  id: number;
  phoneNumber: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  isDisable: boolean;
  isLockedOut: boolean;
  totalCommission: number;
  totalBonus: number;
  totalInterest: number;
  totalRevenueLeft: number;
  totalRevenueRight: number;
  totalDeposit: number;
  totalStaking: number;
  dailyInterest: number;
  balanceAvailable: number;
  total: number;
  allStaking: number;
  totalWithdraw: number;
  totalRaca: number;
  available: number;
  freeze: number;
  walletAddress: string;
  userId: string;
  identityCardFront?: any;
  identityCardBack?: any;
  avatar?: any;
  identityVerify: boolean;
  groupId: number;
  userProgramsData: UserProgramsData[];
}

export interface GetUserRes {
  success: boolean;
  error: string;
  data: UserData;
}

export interface LockUserRes {
  success: boolean;
  error: string;
  data: boolean;
}
