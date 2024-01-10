'use client'

import ConfirmDialog from "@/app/components/ConfirmDialog";
import CommonField from "@/app/components/common/CommonField";
import CommonTable from "@/app/components/common/CommonTable";
import { AppContext } from "@/app/providers/appContext";
import { cancelStakingApi, createFullCustomerProgramingApi, createPartialCustomerProgramingApi, getCustomerInfoApi, getCustomerProgramApi, getProgramSavingApi, getTransactionInterestAndCommisionFromAddressApi } from "@/app/utils/apis";
import { ISOtoLocalDatetimeStrFormat, formatAmount } from "@/app/utils/commonFunc";
import { CUSTOMER_PROGRAM_STATUS } from "@/app/utils/constants";
import { CustomerProgramData, GetCustomerInfoData, ProgramSavingData, TransactionData } from "@/app/utils/models";
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const StakingPageComponent = () =>{
    const uncancelableStatus = [
      CUSTOMER_PROGRAM_STATUS.completed,
      CUSTOMER_PROGRAM_STATUS.cancel,
      CUSTOMER_PROGRAM_STATUS.expire,
    ];
    const [loading, setLoading] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [customerInfo, setCustomerInfo] = useState({} as GetCustomerInfoData);
    const [programSavings, setProgramSavings] = useState<ProgramSavingData[]>([]);
    const [customerProgram, setCustomerProgram] = useState<CustomerProgramData[]>(
      []
    );
    const [amount, setAmount] = useState(0);
    const [partialAmount, setPartialAmount] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cancelId, setCancelId] = useState(0);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const { userInfo, setToast, token } = useContext(AppContext);
  
    const getCustomerInfo = async (userId: number) => {
      try {
        setLoading(true);
        const res = await getCustomerInfoApi(userId);
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Get customer info fail',
            type: 'error',
          });
          return;
        }
  
        setCustomerInfo(res.data);
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const getData = async () => {
      setLoadingData(true);
      const [res1, res2] = await Promise.allSettled([
        getProgramSavingApi(),
        getCustomerProgramApi(userInfo.id),
      ]);
      setLoadingData(false);
  
      if (res1.status === 'rejected') {
        setToast({
          msg: res1.status,
          type: 'error',
        });
      } else {
        setProgramSavings(res1.value.data);
      }
  
      if (res2.status === 'rejected') {
        setToast({
          msg: res2.status,
          type: 'error',
        });
      } else {
        setCustomerProgram(res2.value.data);
      }
      const resTrans = await getTransactionInterestAndCommisionFromAddressApi(
        userInfo.walletAddress
      );
      if (resTrans.success) {
        setTransactions(resTrans.data);
      }
    };
  
    const clickFullStake = async () => {
      try {
        if (amount <= 0) {
          setToast({
            msg: 'Amount is not valid',
            type: 'warn',
          });
          return;
        }
  
        setLoading(true);
        const res1 = await createFullCustomerProgramingApi({
          programId: programSavings[0].id,
          customerId: customerInfo.id,
          amount,
          daysLock: 0
        });
        setLoading(false);
  
        if (!res1.success) {
          setToast({
            msg: 'Staking fail',
            type: 'error',
          });
          return;
        }
  
        setAmount(0);
        setPartialAmount(0);
        setToast({
          msg: 'Staking success!',
          type: 'success',
        });
  
        getData();
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const clickPartialStake = async () => {
      try {
        setLoading(true);
        const res1 = await createPartialCustomerProgramingApi({
          programId: programSavings[0].id,
          customerId: customerInfo.id,
          amount: partialAmount,
          daysLock: 0
        });
        setLoading(false);
  
        if (!res1.success) {
          setToast({
            msg: 'Staking fail',
            type: 'error',
          });
          return;
        }
  
        setAmount(0);
        setPartialAmount(0);
        setToast({
          msg: 'Staking success!',
          type: 'success',
        });
  
        getData();
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const confirmCancel = (id: number) => {
      setCancelId(id);
      setShowConfirm(true);
    };
  
    const confirmPopClose = () => {
      setShowConfirm(false);
    };
  
    const confirmPopExited = () => {
      setCancelId(0);
    };
  
    const cancelStaking = async () => {
      try {
        setShowConfirm(false);
        setLoadingCancel(true);
        const res = await cancelStakingApi(cancelId);
        setLoadingCancel(false);
  
        if (!res.success) {
          setToast({
            msg: 'Cancel fail',
            type: 'error',
          });
        }
  
        setToast({
          msg: 'Cancel successfully',
          type: 'success',
        });
        getData();
      } catch (error: any) {
        setLoadingCancel(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    useEffect(() => {
      if (userInfo.id) {
        getCustomerInfo(userInfo.id);
        getData();
      }
    }, [userInfo]);
  
    return (
      <>
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">Staking</h3>
            {(loading || loadingData) && <CircularProgress size={30} />}
          </div>
        </header>
  
        {customerInfo.id && (
          <>
            <div className="row mb-5">
              <div className="col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <h6 className="mb-1">
                    <strong>
                      Balance: {formatAmount(customerInfo.available)} BNB
                    </strong>
                  </h6>
                  <p className="mb-3">
                    You can transfer all BNB to receive interest at the staking
                    section
                  </p>
                  <div className="mb-4">
                    <CommonField
                      type="number"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="el__box__btn"
                      onClick={clickFullStake}
                      disabled={loading}
                    >
                      Full Stake BNB
                    </button>
                  </div>
                </div>
              </div>
  
              <div className="col-md-6 d-sm-flex">
                <div className="el__box -small">
                  <h6 className="mb-1">
                    <strong>
                      Balance: {formatAmount(customerInfo.available)} BNB
                    </strong>
                  </h6>
                  <p className="mb-3">
                    Every day you deposit BNB into your staking wallet to receive
                    interest
                  </p>
                  <div className="mb-4">
                    <CommonField
                      type="number"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={partialAmount}
                      onChange={(e) => setPartialAmount(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="el__box__btn"
                      onClick={clickPartialStake}
                      disabled={loading}
                    >
                      Partial Stake BNB
                    </button>
                  </div>
                </div>
              </div>
  
              {/* <div className="col-md-6 d-sm-flex">
            <div className="el__box -small">
              <h6 className="mb-1">
                <strong>Balance BNB: 0.00000</strong>
              </h6>
              <p className="mb-3">
                Every day you deposit BNB into your staking wallet to receive
                interest
              </p>
              <div className="row align-items-center">
                <div className="col-md-5">
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={partialAmount}
                      onChange={(e) => setPartialAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2 text-center mb-4">
                  <i className="icon-transfer"></i>
                </div>
                <div className="col-md-5">
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="el__box__btn" onClick={clickPartialStake}>
                  Partial Stake BNB
                </button>
              </div>
            </div>
          </div> */}
            </div>
  
            <header className="ac__header mb-4">
              <h6 className="ac__header__sub mb-3">STAKING HISTORY</h6>
              <h2 className="ac__header__title">List</h2>
            </header>
  
            <CommonTable vBorder loading={loading}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Interest Rate</TableCell>
                  <TableCell align="center">Program Saving</TableCell>
                  <TableCell align="center">Begin</TableCell>
                  <TableCell align="center">End</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerProgram.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell>{x.id}</TableCell>
                    <TableCell>{x.status}</TableCell>
                    <TableCell>{x.type}</TableCell>
                    <TableCell>{formatAmount(x.amount)}</TableCell>
                    <TableCell>{x.total}</TableCell>
                    <TableCell>{formatAmount(x.interestRate)}</TableCell>
                    <TableCell>
                      {programSavings?.find((y) => y.id === x.programId)?.name}
                    </TableCell>
  
                    <TableCell>{ISOtoLocalDatetimeStrFormat(x.beginProgram)}</TableCell>
                    <TableCell>{ISOtoLocalDatetimeStrFormat(x.endProgram)}</TableCell>
                    <TableCell align="center">
                      {!uncancelableStatus.includes(x.status) && (
                        <button
                          className="el__box__copy"
                          onClick={() => confirmCancel(x.id)}
                        >
                          {loadingCancel && cancelId === x.id ? (
                            <CircularProgress size={20} />
                          ) : x.status == 'Waiting' ? (
                            'Withdraw'
                          ) : (
                            'Cancel'
                          )}
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </CommonTable>
            {transactions.length > 0 && (
              <>
                <br></br>
                <header className="ac__header mb-4">
                  <h6 className="ac__header__sub mb-3">TRANSACTION HISTORY</h6>
                </header>
  
                <CommonTable vBorder loading={loading}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Amount</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((x) => (
                      <TableRow key={x.id}>
                        <TableCell>{x.type}</TableCell>
                        <TableCell>{x.status}</TableCell>
                        <TableCell>{formatAmount(x.amount)}</TableCell>
                        <TableCell>{x.description}</TableCell>
                        <TableCell>{ISOtoLocalDatetimeStrFormat(x.created)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </CommonTable>
              </>
            )}
          </>
        )}
  
        <ConfirmDialog
          open={showConfirm}
          onClose={confirmPopClose}
          onExited={confirmPopExited}
          onConfirm={cancelStaking}
          msg={
            <>
              Confirm <b>{cancelId}</b> ?`
            </>
          }
        />
      </>
    );
}

export default StakingPageComponent