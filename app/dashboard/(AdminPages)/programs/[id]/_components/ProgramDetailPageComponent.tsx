'use client'

import CommonField from "@/app/components/common/CommonField";
import { AppContext } from "@/app/providers/appContext";
import { GetProgramRes, ProgramSavingData } from "@/app/utils/models";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import styled from 'styled-components';
import ProgramUpdate from "./ProgramUpdate";
import { useRouter } from "next/router";
import { PopupMessageError, PopupMessageWarning } from "@/app/utils/alertPopup";
import { getProgramApi } from "@/app/utils/apis";

const Wrapper = styled.div`
    input[type='color'] {
        border: 0.25px;
        width: 75px;
        height: 40px;
    }
`;

const ProgramDetailPageComponent = () =>{
    const router = useRouter();
    const { id } = router.query;


    const [loading, setLoading] = useState(true);
    const [actionType, setActionType] = useState<'' | 'Update'>('');
    const [program, setProgram] = useState<ProgramSavingData>({} as ProgramSavingData);
    const { setToast } = useContext(AppContext);
  
    useEffect(() => {
      getProgramDetail(Number(id));
    }, []);
  
    const getProgramDetail = async (id: number) => {
      try {
        if (!id) {
          PopupMessageWarning(setToast, 'UserId or Email is invalid');
          return;
        }
  
        const res: GetProgramRes | undefined = await getProgramApi(id);
  
        if (!res?.success || !res.data) {
          PopupMessageError(setToast, 'Get user is failed');
          return;
        }
  
        setProgram(res.data);
        setLoading(false);
      } catch (error: any) {
        PopupMessageError(setToast, error);
        setLoading(false);
      }
    };
  
    const onAction = () => {
      setActionType('');
      getProgramDetail(Number(id));
    }
  
    return (
      <Wrapper>
        {/* <Helmet>
          <title>Program Detail Management</title>
        </Helmet> */}
  
        <header className="ac__header mb-4">
          <div className="sub_dashbard_header">
            <h3 className="el__box__title">Program Detail Management</h3>
            {loading && <CircularProgress size={30} />}
          </div>
        </header>
  
        <header className="ac__header mb-4">
          <h6 className="ac__header__sub mb-3">Program</h6>
        </header>
  
        <div>
          {actionType === '' && (
            <button
              className="el__box__btn my-3 me-3"
              onClick={() => setActionType('Update')}
            >
              Modify
            </button>)}
        </div>
        <div>
          {actionType === 'Update' && (<button
            className="el__box__btn my-3"
            onClick={() => setActionType('')}
          >
            Cancel
          </button>)}
        </div>
  
        {!loading && (
          <>
            {actionType === '' &&
              <div className="row">
                <div className="col-md-4">
                  <p className="mb-1">Id</p>
                  <CommonField
                    type="number"
                    name="id"
                    value={Number(id)}
                    disabled
                  />
                </div>
  
                <div className="col-md-4">
                  <p className="mb-1">Name</p>
                  <CommonField
                    type="text"
                    name="name"
                    value={program.name}
                    disabled
                  />
                </div>
  
                <div className="col-md-4">
                  <p className="mb-1">InterestRate</p>
                  <CommonField
                    type="number"
                    name="interestRate"
                    value={program.interestRate}
                    disabled
                  />
                </div>
  
                <div className="col-md-4 mt-4">
                  <p className="mb-1">DayBlock</p>
                  <CommonField
                    type="number"
                    name="dayBlock"
                    value={program.dayBlock}
                    disabled
                  />
                </div>
  
                <div className="col-md-4 mt-4">
                  <p className="mb-1">MaxAmount</p>
                  <CommonField
                    type="number"
                    name="maxAmount"
                    value={program.maxAmount}
                    disabled
                  />
                </div>
  
                <div className="col-md-4 mt-4">
                  <p className="mb-1">Min Amount</p>
                  <CommonField
                    type="number"
                    name="minAmount"
                    value={program.minAmount}
                    disabled
                  />
                </div>
  
                <div className="col-md-4 mt-4">
                  <p className="mb-1">Program Color</p>
                  <input
                    type="color"
                    name="programColor"
                    value={program.programColor || '#ffffff'}
                    disabled
                  />
                </div>
              </div>}
            {actionType === 'Update' && <ProgramUpdate onAction={onAction} program={program} />}
          </>
        )}
  
      </Wrapper>
    );
}

export default ProgramDetailPageComponent