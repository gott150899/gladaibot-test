'use client'

import {
  TableHead,
  TableRow,
  TableCell,
  // Checkbox,
  TableSortLabel,
  TableContainer,
  Table,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  vBorder?: boolean;
  children: any;
  page?: number;
  setPage?: any;
  rowsPerPage?: number;
  totalCount?: number;
  setRowsPerPage?: any;
  maxWidth?: number | string;
  className?: string;
  order?: TableOrder;
  setOrder?: any;
  orderBy?: string;
  setOrderBy?: any;
  headCells?: TableHeadCell[];
  loading?: boolean;
}

export type TableOrder = 'asc' | 'desc';

export interface TableHeadCell {
  noPadding?: boolean;
  id: string;
  label: string;
  align?: 'left' | 'right';
}

interface EnhancedTableProps {
  order?: TableOrder;
  setOrder?: any;
  orderBy?: string;
  setOrderBy?: any;
  headCells: TableHeadCell[];
  // numSelected: number;
  // onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  // rowCount: number;
}

const CustomTableWrap = styled.div`
  background-color: #0b506b;
  border-radius: 12px;
  padding: 8px;
  overflow-x: auto;

  .MuiPaper-root {
    margin-bottom: 0;
    box-shadow: unset;
  }

  .MuiTableContainer-root {
    display: table;
  }

  .number-cell {
    width: 74px;
  }

  .MuiTableCell-root {
    color: var(--global--text-color);
    font-size: 14px;
    padding: 5px;

    &.none {
      color: var(--global--text-color-2);
    }

    &.bold {
      font-weight: bold;
    }
  }

  .MuiTableCell-head {
    border-color: #9e9e9e;
    font-weight: bold;
  }

  .MuiTableHead-root {
    &:last-child .MuiTableCell-root {
      border-bottom: 1px solid #9e9e9e;
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      .MuiTableCell-root {
        border-bottom: 1px solid #9e9e9e;
      }

      &:last-child {
        > .MuiTableCell-root {
          border-bottom: none;
        }
      }
    }
  }

  .MuiTableFooter-root,
  .MuiTablePagination-root {
    border-top: 1px solid #9e9e9e;
  }

  .MuiTableFooter-root {
    .MuiTableCell-root {
      border-bottom: none;
    }
  }

  .MuiCheckbox-root {
    &.Mui-checked,
    &.MuiCheckbox-indeterminate {
      color: var(--global--button-color);
    }
  }

  .MuiTableRow-root {
    &:hover {
      background-color: unset !important;
    }

    &.Mui-selected,
    &.Mui-selected:hover {
      background-color: rgb(22, 89, 212, 0.08);
    }
  }

  &.v-border {
    .MuiTableCell-root:not(:last-child) {
      border-right: 1px solid #9e9e9e;
    }
    .MuiTableCell-head:not(:last-child) {
      border-right: 1px solid #9e9e9e;
    }
  }
`;

export function stableSort(
  array: any[],
  comparator: (a: any, b: any) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: TableOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    headCells,
    // onSelectAllClick,
    // numSelected,
    // rowCount,
  } = props;

  const createSortHandler = (property: string) => (event: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            padding={headCell.noPadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CommonTable = (props: Props) => {
  const {
    vBorder,
    children,
    page,
    setPage,
    rowsPerPage = 10,
    totalCount = 0,
    setRowsPerPage,
    maxWidth = 'unset',
    className = '',
    order,
    setOrder,
    orderBy,
    setOrderBy,
    headCells = [],
    loading = false,
  } = props;

  // const [selected, setSelected] = useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map(n => n.loginId);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  return (
    <CustomTableWrap
      className={`common-table ${className} ${vBorder ? 'v-border' : ''}`}
      style={{ maxWidth: maxWidth, maxHeight: '50vh' }}
    >
      <TableContainer>
        <Table>
          {headCells && (
            <EnhancedTableHead
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              headCells={headCells}
              // numSelected={selected.length}
              // onSelectAllClick={handleSelectAllClick}
              // rowCount={rows.length}
            />
          )}

          {loading && (
            <TableRow className="loading-wrap">
              <TableCell align="center" colSpan={headCells.length}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}

          {!loading && children}
        </Table>
      </TableContainer>
      {page !== undefined && page >= 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </CustomTableWrap>
  );
};

export default CommonTable;
