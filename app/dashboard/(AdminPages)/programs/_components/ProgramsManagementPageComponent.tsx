'use client'

import CommonTable from '@/app/components/common/CommonTable';
import { AppContext } from '@/app/providers/appContext';
import { PopupMessageError, PopupMessageSuccess } from '@/app/utils/alertPopup';
import { getProgramsApi, updateFlagProgramApi } from '@/app/utils/apis';
import { DisableProgramsRes, GetProgramSavingRes, ProgramSavingData } from '@/app/utils/models';
import { CircularProgress, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProgramCreate from './ProgramCreate';

const Wrapper = styled.div`

`;


const ProgramsManagementPageComponent = () =>{
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState<ProgramSavingData[]>([]);
    const { setToast } = useContext(AppContext);
    const [actionType, setActionType] = useState<'' | 'Create'>('');
  
    useEffect(() => {
      getPrograms();
    }, []);
  
    const getPrograms = async () => {
      try {
        const res: GetProgramSavingRes = await getProgramsApi();
  
        if (!res?.success) {
          PopupMessageError(setToast, 'Get programs is failed');
          return;
        }
  
        setPrograms(res.data);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      }
    };
  
    const gotoProgramDetail = async (programId: number) => {
      router.push(`/dashboard/programs/${programId}`);
    };
  
    const onAction = () => {
      setActionType('')
      getPrograms();
    }
  
    const updateFlagProgram = async (program: ProgramSavingData) => {
      const res: DisableProgramsRes = await updateFlagProgramApi(program.id, program.flag);
      if (!res?.success) {
        PopupMessageError(setToast, 'Update programs is failed');
        return;
      }
  
      PopupMessageSuccess(setToast, 'Update programs Success ');
      await getPrograms();
  
    }
  
    return (
      <Wrapper>
        {/* <Helmet>
          <title>Programs Management</title>
        </Helmet> */}
  
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">Programs Management</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">PROGRAMs</h6>
        </header>
  
        <div>
          {actionType === '' && (
            <button
              className="el__box__btn my-3 me-3"
              onClick={() => setActionType('Create')}
            >
              Create
            </button>)}
        </div>
        <div>
          {actionType === 'Create' && (<button
            className="el__box__btn my-3"
            onClick={() => setActionType('')}
          >
            Cancel
          </button>)}
        </div>
  
        {actionType === '' && <CommonTable vBorder loading={loading} className="h-scrollbar">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">IsDisable</TableCell>
              <TableCell align="center">ProgramID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">InterestRate</TableCell>
              <TableCell align="center">DayBlock</TableCell>
              <TableCell align="center">MaxAmount</TableCell>
              <TableCell align="center">MinAmount</TableCell>
              <TableCell align="center" width='60px'>ProgramColor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((p) => (
              <TableRow key={p.id}>
                <TableCell align="center">
                  <button
                    className="el__box__copy w-100 mb-2"
                    onClick={() => gotoProgramDetail(p.id)}
                  >
                    Detail
                  </button>
                  <br />
  
                  <button
                    className="el__box__copy w-100"
                    onClick={() => updateFlagProgram(p)}
                  >
                    {p.flag === 'D' ? 'Active' : 'Disable'}
                  </button>
                </TableCell>
                <TableCell align="center">{p.flag === 'D' && <i className="icon-lock fs-4"></i>}</TableCell>
                <TableCell align="center">{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.interestRate}</TableCell>
                <TableCell>{p.dayBlock}</TableCell>
                <TableCell>{p.maxAmount}</TableCell>
                <TableCell>{p.minAmount}</TableCell>
                <TableCell width='60px' align="center"><input type="color" value={p.programColor || '#ffffff'} disabled /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </CommonTable>}
  
        {actionType === 'Create' && <ProgramCreate onAction={onAction} />}
      </Wrapper>
    );
  }

export default ProgramsManagementPageComponent