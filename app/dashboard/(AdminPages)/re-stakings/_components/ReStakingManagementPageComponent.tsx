'use client'

import CommonTable from '@/app/components/common/CommonTable';
import { AppContext } from '@/app/providers/appContext';
import { PopupMessageError } from '@/app/utils/alertPopup';
import { getReStakingApi } from '@/app/utils/apis';
import { ISOtoLocalDatetimeStrFormat, formatAmount } from '@/app/utils/commonFunc';
import { CustomerProgramData, GetReStakingRes, ReStakingData } from '@/app/utils/models';
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`

`;


const ReStakingManagementPageComponent = () =>{
    const [loading, setLoading] = useState(true);
    const [reStakings, setReStakings] = useState<ReStakingData[]>([]);
    const { setToast } = useContext(AppContext);
  
    useEffect(() => {
      getReStakings();
    }, []);
  
    const getReStakings = async () => {
      try {
        const res: GetReStakingRes = await getReStakingApi();
  
        if (!res?.success) {
          PopupMessageError(setToast, 'Get programs is failed');
          return;
        }
  
        setReStakings(res.data);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      }
    };
  
    const buildCusProgramsJson = (cusPrograms: CustomerProgramData[]) => {
      var buildStr = "";
      if (cusPrograms.length == 0) return buildStr;
      cusPrograms.forEach((cusPro) => {
        buildStr += `<p>start: ${ISOtoLocalDatetimeStrFormat(cusPro.beginProgram)} - end: ${ISOtoLocalDatetimeStrFormat(cusPro.endProgram)}</p>`
      })
      return buildStr;
    }
  
    return (
      <Wrapper>
        {/* <Helmet>
          <title>ReStaking Management</title>
        </Helmet> */}
  
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">ReStaking Management</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">ReStakings</h6>
        </header>
  
        <CommonTable vBorder loading={loading} className="h-scrollbar">
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Withdraw RACA</TableCell>
              <TableCell width='60px' align="center">Count</TableCell>
              <TableCell width='400px' >Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reStakings.map((p) => (
              <TableRow key={p.id}>
                <TableCell >{p.userId}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{formatAmount(p.racaWithdraw)}</TableCell>
                <TableCell width='60px' align="center">{p.reStakingCount}</TableCell>
                <TableCell width='400px' dangerouslySetInnerHTML={{
                  __html: buildCusProgramsJson(p.customerPrograms)
                }}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CommonTable>
      </Wrapper>
    );
  }

export default ReStakingManagementPageComponent