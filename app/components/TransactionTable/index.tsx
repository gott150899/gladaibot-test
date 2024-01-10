'use client'

import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { formatAmount, ISOtoLocalDatetimeStrFormat } from '../../utils/commonFunc';
import { ProgramSavingData, TransactionData } from '../../utils/models';
import CommonTable from '../common/CommonTable';
import CopyText from '../common/CopyText';

interface Props {
  loading: boolean;
  transactions: TransactionData[];
  programSavings?: ProgramSavingData[];
}

const TransactionTable = (props: Props) => {
  const { loading, transactions } = props;

  return (
    <CommonTable vBorder loading={loading}>
      <TableHead>
        <TableRow>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Type</TableCell>
          <TableCell align="center">Amount</TableCell>
          <TableCell align="center">From Address</TableCell>
          <TableCell align="center">To Address</TableCell>
          <TableCell align="center">Created At</TableCell>
          <TableCell align="center">Last Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((x) => (
          <TableRow key={x.id}>
            <TableCell>{x.status}</TableCell>
            <TableCell>{x.type}</TableCell>
            <TableCell>{formatAmount(x.amount)}</TableCell>
            <TableCell>
              <CopyText text={x.addressPayment} />
            </TableCell>
            <TableCell>
              <CopyText text={x.addressReceive} />
            </TableCell>
            <TableCell>{ISOtoLocalDatetimeStrFormat(x.created)}</TableCell>
            <TableCell>{ISOtoLocalDatetimeStrFormat(x.updated)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </CommonTable>
  );
};

export default TransactionTable;
