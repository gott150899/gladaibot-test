'use client'

import styled from 'styled-components';
import CommonDialog from '../common/CommonDialog';
interface Props {
  onClose: () => void;
  onConfirm?: () => void;
  onExited?: () => void;
  open: boolean;
  msg: any;
}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 24px;

  .message {
    font-size: 18px;
    margin-bottom: 24px;
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
  }
`;

const ConfirmDialog = (props: Props) => {
  const { onClose, onConfirm, onExited, open, msg } = props;

  const onClickConfirm = () => {
    onConfirm?.();
    onClose?.();
  };
  return (
    <CommonDialog open={open} width={400} onClose={onClose}>
      <Wrapper>
        <div className="message">{msg}</div>
        <div className="buttons">
          {onConfirm && (
            <button
              type="button"
              className="el__box__btn"
              onClick={onClickConfirm}
            >
              Confirm
            </button>
          )}
          {onClose && (
            <button type="button" className="el__box__btn" onClick={onClose}>
              {onConfirm ? 'Cancel' : 'OK'}
            </button>
          )}
        </div>
      </Wrapper>
    </CommonDialog>
  );
};

export default ConfirmDialog;
