'use client'
import TransactionTable from '@/app/components/TransactionTable';
import CommonField from '@/app/components/common/CommonField';
import { AppContext } from '@/app/providers/appContext';
import { getTransactionApi } from '@/app/utils/apis';
import { TRANSACTION_TYPES } from '@/app/utils/constants';
import { TransactionData } from '@/app/utils/models';
import { CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useQRCode } from 'react-qrcode';
import styled from 'styled-components';

const Wrapper = styled.div`
  .qr_code {
    height: 100%;
    display: flex;
    flex-direction: column;

    .qrcode_wrap {
      width: 100%;
      padding-top: 100%;
      position: relative;
      margin-bottom: 24px;

      .qr_code_img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .left_side {
      margin-bottom: 30px;
    }
  }
`;

const WALLET_ADDRESS = process.env.WALLET_ADDRESS + ''

const DepositPageComponent = () =>{
    const { userInfo, setToast } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);

    const qrCodeImg = useQRCode(WALLET_ADDRESS);

    const getTransaction = async () => {
        setLoading(true);
        const res = await getTransactionApi(userInfo.walletAddress, ['deposit']);
        setLoading(false);

        if (!res.success) {
            setToast({ msg: 'Get transaction fail', type: 'error', });
            return;
        }

        setTransactions(res.data.filter((x) => x.type === TRANSACTION_TYPES.deposit));
    };

    useEffect(() => {
        userInfo.walletAddress && getTransaction();
    }, [userInfo]);

    return(
        <Wrapper>
            <header className="ac__header mb-4">
                <div className="sub_dashbard_header">
                <h3 className="el__box__title">Deposit</h3>
                {loading && <CircularProgress size={30} />}
                </div>
            </header>

            {!loading && (
                <>
                    <div className="row mb-5">
                        <div className="col-md-8 left_side">
                        <div className="col-md-12 d-sm-flex">
                            <div className="el__box -small mb-0">
                            <CommonField
                                type="text"
                                rightBtnText="Copy"
                                value={WALLET_ADDRESS}
                                rightBtnCopyText={WALLET_ADDRESS}
                                readonly
                            />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="el__box -small qr_code mb-0">
                            <div className="qrcode_wrap">
                            <img className="qr_code_img" src={qrCodeImg} />
                            </div>
                            <div className="text-center">
                            <a
                                className="el__box__btn"
                                href={qrCodeImg}
                                download="QRcode_Wallet Address"
                            >
                                Download QR Code
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>

                    <header className="ac__header mb-4">
                        <h6 className="ac__header__sub mb-3">DEPOSIT HISTORY</h6>
                        <h2 className="ac__header__title">Transactions</h2>
                    </header>

                    <TransactionTable loading={loading} transactions={transactions} />
                </>
            )}
        </Wrapper>
    )
}

export default DepositPageComponent