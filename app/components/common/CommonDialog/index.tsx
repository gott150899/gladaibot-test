'use client'

import Dialog from '@mui/material/Dialog';
interface Props {
  width?: number | string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  onClose: () => void;
  onExited?: () => void;
  open: boolean;
  children?: any;
  onClickClose?: () => void;
}

const CommonDialog = (props: Props) => {
  const {
    width = 'unset',
    maxWidth = 'lg',
    onClose,
    onExited,
    open,
    children,
    onClickClose,
  } = props;
  return (
    <Dialog
      PaperProps={{
        elevation: 0,
        style: {
          width: Number(width),
          boxShadow: '0px 20px 30px rgba(179, 196, 217, 0.1)',
          backgroundColor: 'white',
          borderRadius: 8,
        },
      }}
      onClose={onClose}
      TransitionProps={{ onExited }}
      open={open}
      maxWidth={maxWidth}
    >
      {onClickClose && (
        <div
          className="close-btn"
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            cursor: 'pointer',
          }}
          onClick={onClickClose}
        >
          X
        </div>
      )}
      {children}
    </Dialog>
  );
};

export default CommonDialog;
