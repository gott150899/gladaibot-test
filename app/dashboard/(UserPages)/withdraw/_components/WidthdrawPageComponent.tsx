'use client'

import TransactionTable from "@/app/components/TransactionTable";
import CommonDialog from "@/app/components/common/CommonDialog";
import CommonField from "@/app/components/common/CommonField";
import CommonSelect from "@/app/components/common/CommonSelect";
import { AppContext } from "@/app/providers/appContext";
import { createTransactionApi, createTransferApi, getCustomerInfoApi, getCustomerLowLevel, getTransactionApi, sentOtpTransferApi } from "@/app/utils/apis";
import { formatAmount } from "@/app/utils/commonFunc";
import { TRANSACTION_TYPES } from "@/app/utils/constants";
import { GetCustomerInfoData, GetCustomerOptionData, TransactionData } from "@/app/utils/models";
import { CircularProgress, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import styled from "styled-components";

const selectStyle: StylesConfig = {
    menu: (provided, state) => ({
      ...provided, 
      color: "#ffffff", 
      backgroundColor: "#fff" ,
      borderBottom: '1px dotted pink'
    }),
    input: (styles) => {
      return {
        ...styles,
        color:"#fff"
      }
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color:"#fff"
      }
    },
    control: (styles) => ({ ...styles, backgroundColor: '#0b506b', color:'#fff', ":active": {
      ...styles[':active'],
      
      backgroundColor: "#fff"  
    } }), 
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      let defineColor ="#032c3a"; 
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "#0b506b"
          : isSelected
          ? "#00384f"
          : isFocused
          ? "#0b506b"
          : "#0b506b",
        color: isDisabled
          ? '#fff'
          : isSelected
          ?  '#fff' 
          : "fff",
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? defineColor
              : "#00384f"
            : undefined,
        },
      };
    }
  };
  const CustomWalletMenuItem = styled(MenuItem)`
    display: flex;
    flex-direction: column;
    align-items: unset !important;
    font-size: 11px !important;
  
    .name {
      font-weight: bold;
    }
  `;
  
  const CustomWalletSelect = styled(CommonSelect)`
    .MuiSelect-select {
      font-size: 11px;
    }
  
    .name {
      font-weight: bold;
    }
  `;

const WidthdrawPageComponent = () =>{
    const { userInfo, setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [amount, setAmount] = useState(0);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [customerInfo, setCustomerInfo] = useState<GetCustomerInfoData>();
    const [showOtpPopup, setShowOtpPopup] = useState(false);
    
    const [customerLowLevel, setCustomerLowLevel] = useState<GetCustomerOptionData[]>();
    const [selectedWallet, setSelectedWallet] = useState('');
    const [otpConfirm, setOtpConfirm] = useState(''); 
    const showOtpPop = () => {
      console.log('call api here');
      setShowOtpPopup(true);
    };   
    const hideOtpPop = () => setShowOtpPopup(false);
    const onSelectWalletChange = (value: string) => {
      console.log('value: ' + value);
      setSelectedWallet(value);
    };
     
    // const onSelectWalletChange = (
    //   inputValue: string,
    //   { action, prevInputValue }: InputActionMeta
    // ) => {
    //   console.log('value: ' + inputValue);
    //   if (action === 'input-change') setSelectedWallet(inputValue); 
    //   return prevInputValue;
    // };
    interface Props {
      onClose: () => void;
      open: boolean;
    }
    const WrapperDialog = styled.div`
      text-align: center;
      display: flex;
      flex-direction: column;
      padding: 24px;
      .input-otp input {
        color: #000;
      }
      .message {
        font-size: 18px;
        margin-bottom: 24px;
      }
      .resent-otp button,
      .complete-transfer button {
        font-size: 12px;
        width: 100%;
      }
      @media (max-width: 767px) {
        .resent-otp {
          margin-bottom: 15px;
        }
      }
  
      .resent-otp button {
        color: #eb7200;
      }
  
      .buttons {
        display: flex;
        justify-content: space-evenly;
      }
    `;
  
    const getCustomerInfo = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.allSettled([
          getCustomerInfoApi(userInfo.id),
          getCustomerLowLevel(userInfo.id),
        ]);
        setLoading(false);
  
        if (res1.status === 'rejected') {
          setToast({
            msg: res1.status,
            type: 'error',
          });
        } else {
          setCustomerInfo(res1.value.data);
        }
  
        if (res2.status === 'rejected') {
          setToast({
            msg: res2.status,
            type: 'error',
          });
        } else {
          let temp =[...res2.value.data].map((data, index) => ({
            label: `${index+1}. ${data.name} - ${data.email}`,
            value: `${data.walletAddress}`
          }));
       setCustomerLowLevel(temp); 
        }
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const getData = async () => {
      try {
        setLoadingTransaction(true);
        const res = await getTransactionApi(userInfo.walletAddress, [
          'withdraw,withdrawraca,transfer',
        ]);
        setLoadingTransaction(false);
  
        if (!res.success) {
          setToast({
            msg: 'Get transaction fail',
            type: 'error',
          });
          return;
        }
  
        setTransactions(
          res.data.filter(
            (x) =>
              x.type === TRANSACTION_TYPES.withdraw || TRANSACTION_TYPES.transfer
          )
        );
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const clickWithdraw = async () => {
      try {
        if (amount <= 0) {
          setToast({
            msg: 'Amount is not valid',
            type: 'warn',
          });
          return;
        }
  
        setLoading(true);
        const res = await createTransactionApi({
          type: TRANSACTION_TYPES.withdraw,
          amount,
          walletAdress: userInfo.walletAddress,
        });
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Withdraw fail',
            type: 'error',
          });
          return;
        }
  
        getData();
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const clickSendOtp = async () => {
      try {
        if (amount <= 0) {
          setToast({
            msg: 'Amount is not valid',
            type: 'warn',
          });
          return;
        }
  
        if (!selectedWallet) {
          setToast({
            msg: 'Please select User to transfer',
            type: 'warn',
          });
          return;
        }
  
        setLoading(true);
        const res = await sentOtpTransferApi({
          amount,
          fromAddress: userInfo.walletAddress,
          toAddress: selectedWallet,
          otp: '',
        });
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Transfer fail',
            type: 'error',
          });
          return;
        }
        showOtpPop();
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const clickTransfer = async () => {
      try {
        if (amount <= 0) {
          setToast({
            msg: 'Amount is not valid',
            type: 'warn',
          });
          return;
        }
  
        if (!selectedWallet) {
          setToast({
            msg: 'Please select User to transfer',
            type: 'warn',
          });
          return;
        }
        if (!otpConfirm) {
          setToast({
            msg: 'Please input OTP',
            type: 'warn',
          });
          return;
        }
  
        setLoading(true);
        const res = await createTransferApi({
          amount,
          fromAddress: userInfo.walletAddress,
          toAddress: selectedWallet,
          otp: otpConfirm,
        });
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Transfer fail',
            type: 'error',
          });
          return;
        } else {
          hideOtpPop();
          setToast({
            msg: 'Transfer success',
            type: 'success',
          });
        }
        getData();
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (userInfo.id) {
        getCustomerInfo();
        getData();
      }
    }, [userInfo]);
  
    return (
      <>
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">Withdraw</h3>
            {(loading || loadingTransaction) && <CircularProgress size={30} />}
          </div>
        </header>
        {/* <h2>Sorry, we're under maintenance, please come back later</h2> */}
        {customerInfo && (
          <>
            <div className="row mb-5">
              <div className="col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <h6 className="mb-3">
                    <strong>
                      Balance: {formatAmount(customerInfo.available)} BNB
                    </strong>
                  </h6>
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      leftTextOrIcon="To Address:"
                      value={customerInfo.walletAddress || ''}
                      readonly
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="el__box__btn"
                      onClick={clickWithdraw}
                      disabled={loading}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
  
              <div className="col-md-6  d-sm-flex">
                <div className="el__box -small">
                  <h6 className="mb-3">
                    <strong>
                      Balance: {formatAmount(customerInfo.available)} BNB
                    </strong>
                  </h6>
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                  <Select
        isClearable
        isSearchable 
        styles={selectStyle}
        onChange={(newValue:any,actionMeta)=> onSelectWalletChange(newValue.value as string)}
        name="color"
        placeholder="Please select wallet to transfer"
        options={customerLowLevel as any} 
      />
                    {/* <CustomWalletSelect
                      value={selectedWallet}
                      onChange={onSelectWalletChange}
                      label="To User:"
                    >
                      {customerLowLevel?.map((x) => (
                        <CustomWalletMenuItem
                          key={x.walletAddress}
                          value={x.walletAddress}
                        >
                          <div className="name">{x.name}</div>
                          <div className="wallet_address">{x.email}</div>
                        </CustomWalletMenuItem>
                      ))}
                    </CustomWalletSelect> */}
                  </div>
                  <div className="text-center">
                    <button
                      className="el__box__btn"
                      onClick={clickSendOtp}
                      disabled={loading}
                    >
                      Transfer
                    </button>
                    {/* <button className="el__box__btn" 
                    disabled={loading}
                     onClick={showOtpPop}>Open</button> */}
                  </div>
                </div>
              </div>
            </div>
  
            <header className="ac__header mb-4">
              <h6 className="ac__header__sub mb-3">WITHDRAW HISTORY</h6>
              <h2 className="ac__header__title">Transactions</h2>
            </header>
  
            <TransactionTable
              loading={loadingTransaction}
              transactions={transactions}
            />
  
            <CommonDialog open={showOtpPopup} width={400} onClose={hideOtpPop}>
              <WrapperDialog>
                <div className="otp-dialog">
                  <div className="col-md-12 d-sm-flex">
                    <div className="el__box -small">
                      <h6 className="mb-3">
                        <strong>
                          Please enter OTP that has been sent to your email
                          account to complete transfer
                        </strong>
                      </h6>
                      <div className="mb-4">
                        <CommonField
                          type="text"
                          className="input-otp"
                          value={otpConfirm}
                          onChange={(e) => {
                            setOtpConfirm(e.target.value);
                          }}
                          placeholder="Input your OTP"
                        />
                      </div>
                      <div className="row ">
                        <div className="col-md-5 col-xs-5 d-sm-flex resent-otp">
                          <button
                            className="el__box__btn"
                            onClick={clickSendOtp}
                            disabled={loading}
                          >
                            Resend OTP
                          </button>
                        </div>
                        <div className="col-md-7 col-xs-7 d-sm-flex text-center complete-transfer">
                          <button
                            className="el__box__btn"
                            onClick={clickTransfer}
                            disabled={loading}
                          >
                            Complete Transfer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </WrapperDialog>
            </CommonDialog>
          </>
        )}
      </>
    );
  };

export default WidthdrawPageComponent