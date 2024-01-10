'use client'

import CommonField from "@/app/components/common/CommonField";
import { AppContext } from "@/app/providers/appContext";
import { PopupMessageError, PopupMessageSuccess } from "@/app/utils/alertPopup";
import { updateProgramApi } from "@/app/utils/apis";
import { ProgramSavingData } from "@/app/utils/models";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    input[type='color'] {
        border: 0.25px;
        width: 75px;
        height: 40px;
    }
`;

type Props = {
    program: ProgramSavingData;
    onAction?: () => void;
}

const ProgramUpdate = ({ program, onAction }: Props) =>{
    const router = useRouter();
    const { id } = router.query;

    const { setToast } = useContext(AppContext);
  
    const [name, setName] = useState<string>('');
    const [interestRate, setInterestRate] = useState<number>(0);
    const [dayBlock, setDayBlock] = useState<number>(0);
    const [maxAmount, setMaxAmount] = useState<number>(0);
    const [minAmount, setMinAmount] = useState<number>(0);
    const [programColor, setProgramColor] = useState<string>('#ffffff');
  
    const actionHanler = async () => {
      const req: any = {
        name,
        interestRate,
        dayBlock,
        maxAmount,
        minAmount,
        programColor
      }
  
      const res: any = await updateProgramApi(Number(id), req);
      if (!res?.success) {
        PopupMessageError(setToast, "Update failed");
  
        setName(program.name);
        setInterestRate(program.interestRate);
        setDayBlock(program.dayBlock);
        setMaxAmount(program.maxAmount);
        setMinAmount(program.minAmount);
        setProgramColor(program.programColor || '#ffffff');
        return;
      }
  
      PopupMessageSuccess(setToast, "Update succeed");
      onAction?.();
    }
  
  
    useEffect(() => {
      setName(program.name);
      setInterestRate(program.interestRate);
      setDayBlock(program.dayBlock);
      setMaxAmount(program.maxAmount);
      setMinAmount(program.minAmount);
      setProgramColor(program.programColor || '#ffffff');
    }, [program]);
  
    return (
      <Wrapper>
        <button
          className="el__box__btn my-3"
          onClick={() => actionHanler()}
        >
          Save Program
        </button>
  
        <div className="row">
          <div className="col-md-4">
            <p className="mb-1">Name</p>
            <CommonField
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          <div className="col-md-4">
            <p className="mb-1">InterestRate</p>
            <CommonField
              type="number"
              name="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
  
          <div className="col-md-4">
            <p className="mb-1">DayBlock</p>
            <CommonField
              type="number"
              name="dayBlock"
              value={dayBlock}
              onChange={(e) => setDayBlock(e.target.value)}
            />
          </div>
  
          <div className="col-md-4 mt-4">
            <p className="mb-1">MaxAmount</p>
            <CommonField
              type="number"
              name="maxAmount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
  
          <div className="col-md-4 mt-4">
            <p className="mb-1">Min Amount</p>
            <CommonField
              type="number"
              name="minAmount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>
  
          <div className="col-md-4 mt-4">
            <p className="mb-1">Program Color</p>
            <input
              type="color"
              name="programColor"
              value={programColor}
              onChange={(e) => setProgramColor(e.target.value)}
            />
          </div>
        </div>
      </Wrapper>
    );
  }

export default ProgramUpdate