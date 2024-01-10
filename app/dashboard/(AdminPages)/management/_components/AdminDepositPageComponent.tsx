'use client'

import ConfirmDialog from "@/app/components/ConfirmDialog";
import CommonField from "@/app/components/common/CommonField";
import CommonTable from "@/app/components/common/CommonTable";
import CopyText from "@/app/components/common/CopyText";
import { AppContext } from "@/app/providers/appContext";
import { cancelWithdrawRequestApi, depositAmountToUserApi, getTransactionRequestApi } from "@/app/utils/apis";
import { ISOtoLocalDatetimeStrFormat, formatAmount } from "@/app/utils/commonFunc";
import { CUSTOMER_TRANSACTION_STATUS, TRANSACTION_TYPES } from "@/app/utils/constants";
import { TransactionData } from "@/app/utils/models";
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const cancelableStatus = [CUSTOMER_TRANSACTION_STATUS.sending];
const AdminDepositPageComponent = () =>{
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [depositUserId, setDepositUserId] = useState('');
    const [loadingTransaction, setLoadingTransaction] = useState(false);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const { userInfo, setToast, token } = useContext(AppContext);
    const getDataWithdrawRequest = async () => {
      try {
        setLoadingTransaction(true);
        const res = await getTransactionRequestApi(['withdraw,transfer']);
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
    const [cancelRequestWithdrawId, setCancelRequestWithdrawId] = useState(0);
    const [showConfirmCancelWithdraw, setShowConfirmCancelWithdraw] =
      useState(false);
    const confirmCancel = (id: number) => {
      setCancelRequestWithdrawId(id);
      setShowConfirmCancelWithdraw(true);
    };
    const cancelRequestWithdraw = async () => {
      try {
        setShowConfirmCancelWithdraw(false);
        setLoadingCancel(true);
        const res = await cancelWithdrawRequestApi(cancelRequestWithdrawId);
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
        getDataWithdrawRequest();
      } catch (error: any) {
        setLoadingCancel(false);
        setToast({
          msg: error,
          type: 'error',
        });
      }
    };
  
    const clickDepositUser = async () => {
      try {
        setLoading(true);
        const res = await depositAmountToUserApi({
          userIds: depositUserId,
          amount,
        });
        setLoading(false);
  
        if (!res.success) {
          setToast({
            msg: 'Deposit fail',
            type: 'error',
          });
          return;
        }
  
        setDepositUserId('');
        setToast({
          msg: 'Deposit success',
          type: 'success',
        });
      } catch (error: any) {
        setToast({
          msg: error,
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    const showConfirmPop = () => {
      setShowConfirm(true);
    };
  
    const confirmPopClose = () => {
      setShowConfirm(false);
    };
  
    const showConfirmCancelWithdrawPop = () => {
      setShowConfirmCancelWithdraw(true);
    };
  
    const confirmPopCancelWithdrawClose = () => {
      setShowConfirmCancelWithdraw(false);
    };
    useEffect(() => {
      if (userInfo.id) {
        getDataWithdrawRequest();
      }
    }, [userInfo]);
    return (
      <>
        {
        userInfo?.email =="0@gmail.com" && (<><header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">Admin Deposit</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="el__box -small">
              <h6 className="mb-4">
                <strong>Deposit BNB to user</strong>
              </h6>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-1">UserId or Email</p>
                  <div className="mb-4">
                    <CommonField
                      type="text"
                      value={depositUserId}
                      onChange={(e) => setDepositUserId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-1">Amount</p>
                  <div className="mb-4">
                    <CommonField
                      type="number"
                      rightTextOrIcon="BNB"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
  
              <div className="text-center">
                <button
                  className="el__box__btn"
                  disabled={!depositUserId}
                  onClick={showConfirmPop}
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <ConfirmDialog
          open={showConfirm}
          onClose={confirmPopClose}
          onConfirm={clickDepositUser}
          msg={
            <>
              Deposit <b>{formatAmount(amount)} BNB</b> to user ID{' '}
              <b>{depositUserId}</b> ?
            </>
          }
        /></> )
        }
        
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">WITHDRAW REQUEST</h6>
          <h2 className="ac__header__title">Transactions</h2>
        </header>
  
        <CommonTable vBorder loading={loading}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Fee (Charge 5%)</TableCell>
              <TableCell align="center">After Fee</TableCell>
              <TableCell align="center">From User</TableCell>
              <TableCell align="center">To User</TableCell>
              <TableCell align="center">To Address</TableCell>
              <TableCell align="center">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((x) => (
              <TableRow key={x.id}>
                <TableCell>{x.id}</TableCell>
                <TableCell align="center">
                  {cancelableStatus.includes(x.status) && (
                    <button
                      className="el__box__copy"
                      onClick={() => confirmCancel(x.id)}
                    >
                      {loadingCancel && cancelRequestWithdrawId === x.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        'Cancel'
                      )}
                    </button>
                  )}
                </TableCell>
                <TableCell>{x.type}</TableCell>
                <TableCell>{x.status}</TableCell>
                <TableCell>{formatAmount(x.amount)}</TableCell>
                <TableCell>{formatAmount(x.fee)}</TableCell>
                <TableCell>
                  <CopyText text={formatAmount(x.withdrawAfterFee)} />
                </TableCell>
                <TableCell>
                  <CopyText text={x.customerEmail} />
                </TableCell>
                <TableCell>
                  <CopyText text={x.customerReceiveEmail} />
                </TableCell>
  
                <TableCell>
                  <CopyText text={x.addressReceive} />
                </TableCell>
                <TableCell>{ISOtoLocalDatetimeStrFormat(x.created)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CommonTable>
  
        <ConfirmDialog
          open={showConfirmCancelWithdraw}
          onClose={confirmPopCancelWithdrawClose}
          onConfirm={cancelRequestWithdraw}
          msg={
            <>
              Cancel request withraw ID <b>{cancelRequestWithdrawId}</b>?
            </>
          }
        />
      </>
    );
  }

export default AdminDepositPageComponent