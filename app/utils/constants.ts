export const DASHBOARD_PATH_NAME = 'dashboard';

export const MOBILE_BREAKPOINT = 450;
export const TABLET_BREAKPOINT = 650;
export const DESKTOP_BREAKPOINT = 1024;

export const MOBILE_QUERY = `(max-width:${TABLET_BREAKPOINT}px)`;
export const TABLET_QUERY = `(max-width:${DESKTOP_BREAKPOINT}px)`;

export const STATIC_ENDPOINT = (process.env.API_ENDPOINT + '').replace(
  /api$/,
  ''
);

export const TRANSACTION_TYPES = {
  withdraw: 'Withdraw',
  deposit: 'Deposit',
  staking: 'Staking',
  transfer: 'Transfer',
};

export const TRANSACTION_STATUS = {
  sending: 'Sending',
  success: 'Success',
  completed: 'Completed',
};

export const CUSTOMER_PROGRAM_STATUS = {
  sending: 'Pending',
  success: 'Processing',
  completed: 'Completed',
  waiting: 'Waiting',
  cancel: 'Cancel',
  expire: 'Expired',
};
export const CUSTOMER_TRANSACTION_STATUS = {
  sending: 'Sending',
  success: 'Processing',
  completed: 'Completed',
  waiting: 'Waiting',
  cancel: 'Cancel'
};

export const DEFAULT_COPY_TEXT = 'Copy to clipboard';

