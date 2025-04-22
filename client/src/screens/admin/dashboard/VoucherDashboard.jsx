import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import styled from 'styled-components'

const VoucherDashboard = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      voucher_code: 'DISCOUNT10',
      description: '10% off on all courses',
      discount_type: 'percent',
      discount_value: 10,
      start_date: '2025-04-01',
      end_date: '2025-04-30'
    },
    {
      id: 2,
      voucher_code: 'FIXED50',
      description: '50,000 VND off on selected courses',
      discount_type: 'fixed',
      discount_value: 50000,
      start_date: '2025-04-10',
      end_date: '2025-05-10'
    }
  ])
  const [openDialog, setOpenDialog] = useState(false)
  const [formValues, setFormValues] = useState({
    voucher_code: '',
    description: '',
    discount_type: 'percent',
    discount_value: '',
    start_date: null,
    end_date: null
  })
  const [editingVoucher, setEditingVoucher] = useState(null)

  const handleOpenDialog = (voucher = null) => {
    if (voucher) {
      setEditingVoucher(voucher)
      setFormValues({
        voucher_code: voucher.voucher_code,
        description: voucher.description,
        discount_type: voucher.discount_type,
        discount_value: voucher.discount_value,
        start_date: voucher.start_date,
        end_date: voucher.end_date
      })
    } else {
      setEditingVoucher(null)
      setFormValues({
        voucher_code: '',
        description: '',
        discount_type: 'percent',
        discount_value: '',
        start_date: null,
        end_date: null
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (editingVoucher) {
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === editingVoucher.id
            ? { ...editingVoucher, ...formValues }
            : voucher
        )
      )
    } else {
      const newVoucher = {
        id: vouchers.length + 1,
        ...formValues
      }
      setVouchers((prev) => [...prev, newVoucher])
    }
    handleCloseDialog()
  }

  const handleDelete = (id) => {
    setVouchers((prev) => prev.filter((voucher) => voucher.id !== id))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <VoucherDashboardWrapper>
        <h3>Voucher Management</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
          style={{ marginBottom: '16px' }}
        >
          Add Voucher
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Discount Type</TableCell>
                <TableCell>Discount Value</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vouchers.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell>{voucher.voucher_code}</TableCell>
                  <TableCell>{voucher.description}</TableCell>
                  <TableCell>{voucher.discount_type}</TableCell>
                  <TableCell>{voucher.discount_value}</TableCell>
                  <TableCell>{voucher.start_date}</TableCell>
                  <TableCell>{voucher.end_date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenDialog(voucher)}
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(voucher.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editingVoucher ? 'Edit Voucher' : 'Add Voucher'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Voucher Code"
              fullWidth
              margin="normal"
              value={formValues.voucher_code}
              onChange={(e) => handleFormChange('voucher_code', e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={formValues.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
            />
            <TextField
              select
              label="Discount Type"
              fullWidth
              margin="normal"
              value={formValues.discount_type}
              onChange={(e) =>
                handleFormChange('discount_type', e.target.value)
              }
            >
              <MenuItem value="percent">Percent</MenuItem>
              <MenuItem value="fixed">Fixed</MenuItem>
            </TextField>
            <TextField
              label="Discount Value"
              type="number"
              fullWidth
              margin="normal"
              value={formValues.discount_value}
              onChange={(e) =>
                handleFormChange('discount_value', e.target.value)
              }
            />
            <DatePicker
              label="Start Date"
              value={formValues.start_date}
              onChange={(date) => handleFormChange('start_date', date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
            <DatePicker
              label="End Date"
              value={formValues.end_date}
              onChange={(date) => handleFormChange('end_date', date)}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </VoucherDashboardWrapper>
    </LocalizationProvider>
  )
}

const VoucherDashboardWrapper = styled.section`
  padding: 3rem;

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }

  .MuiTableContainer-root {
    box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
      rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
    border-radius: 0.75rem;
  }

  .MuiTableCell-head {
    font-weight: bold;
    background-color: rgb(240, 240, 240);
  }
`

export default VoucherDashboard
