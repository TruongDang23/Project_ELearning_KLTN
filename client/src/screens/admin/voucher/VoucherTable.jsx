import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const VoucherTable = ({ vouchers, onViewDetails, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Voucher Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Discount Value</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vouchers
            .filter((voucher) => !voucher.is_deleted)
            .map((voucher) => (
              <TableRow
                key={voucher.voucher_code}
                onClick={() => onViewDetails(voucher)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{voucher.voucher_code}</TableCell>
                <TableCell>{voucher.description.substring(0, 50)}...</TableCell>
                <TableCell>{voucher.discount_value}</TableCell>
                <TableCell>{voucher.start_date.split('T')[0]}</TableCell>
                <TableCell>{voucher.end_date.split('T')[0]}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton onClick={() => onEdit(voucher)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(voucher)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default VoucherTable
