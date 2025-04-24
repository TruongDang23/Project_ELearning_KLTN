import { useState } from 'react'
import styled from 'styled-components'
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
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// Sample data for vouchers
const dataSample = [
  {
    id: 1,
    voucher_code: 'SUMMER2025',
    description: 'Summer discount for all courses',
    discount_type: 'percent',
    discount_value: 20.0,
    voucher_for: 'course',
    usage_limit: 100,
    usage_count: 10,
    start_date: '2025-06-01',
    end_date: '2025-08-31',
    is_all_users: 1,
    is_all_courses: 1,
    create_at: '2025-01-01 10:00:00',
    update_at: '2025-01-01 10:00:00',
    is_deleted: 0
  },
  {
    id: 2,
    voucher_code: 'WELCOME10',
    description: 'Welcome discount for new users',
    discount_type: 'fixed',
    discount_value: 10.0,
    voucher_for: 'course',
    usage_limit: 50,
    usage_count: 5,
    start_date: '2025-01-01',
    end_date: '2025-12-31',
    is_all_users: 0,
    is_all_courses: 0,
    create_at: '2025-01-01 12:00:00',
    update_at: '2025-01-01 12:00:00',
    is_deleted: 0
  }
]

function VoucherDashboard() {
  const [vouchers, setVouchers] = useState(dataSample)
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [editVoucher, setEditVoucher] = useState({})
  const [newVoucher, setNewVoucher] = useState({
    voucher_code: '',
    description: '',
    discount_type: 'percent',
    discount_value: 0,
    voucher_for: '',
    usage_limit: 0,
    start_date: '',
    end_date: '',
    is_all_users: 0,
    is_all_courses: 0
  })
  const [voucherToDelete, setVoucherToDelete] = useState(null)
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

  const handleOpenDetail = (voucher) => {
    setSelectedVoucher(voucher)
    setOpenDetailDialog(true)
  }

  const handleCloseDetail = () => {
    setOpenDetailDialog(false)
    setSelectedVoucher(null)
  }

  const handleOpenEdit = (voucher) => {
    setEditVoucher({ ...voucher })
    setOpenEditDialog(true)
  }

  const handleCloseEdit = () => {
    setOpenEditDialog(false)
    setEditVoucher({})
  }

  const handleOpenAdd = () => {
    setOpenAddDialog(true)
  }

  const handleCloseAdd = () => {
    setOpenAddDialog(false)
    setNewVoucher({
      voucher_code: '',
      description: '',
      discount_type: 'percent',
      discount_value: 0,
      voucher_for: '',
      usage_limit: 0,
      start_date: '',
      end_date: '',
      is_all_users: 0,
      is_all_courses: 0
    })
  }

  const handleOpenDelete = (voucher) => {
    setVoucherToDelete(voucher)
    setOpenDeleteDialog(true)
  }

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false)
    setVoucherToDelete(null)
  }

  const handleConfirmDelete = () => {
    if (voucherToDelete) {
      setVouchers((prev) =>
        prev.map((voucher) =>
          voucher.id === voucherToDelete.id
            ? { ...voucher, is_deleted: 1 }
            : voucher
        )
      )
    }
    handleCloseDelete()
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditVoucher((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewChange = (e) => {
    const { name, value } = e.target
    setNewVoucher((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveEdit = () => {
    setVouchers((prev) =>
      prev.map((voucher) =>
        voucher.id === editVoucher.id
          ? { ...editVoucher, update_at: new Date().toISOString() }
          : voucher
      )
    )
    handleCloseEdit()
  }

  const handleAddVoucher = () => {
    const newId = Math.max(...vouchers.map((v) => v.id)) + 1
    setVouchers((prev) => [
      ...prev,
      {
        ...newVoucher,
        id: newId,
        usage_count: 0,
        create_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
        is_deleted: 0
      }
    ])
    handleCloseAdd()
  }

  // Common dialog styles
  const dialogPaperStyles = {
    background: 'rgb(255, 255, 255)',
    borderRadius: '0.75rem',
    boxShadow:
      'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
    border: '1px solid rgba(52, 71, 103, 0.2)',
    maxWidth: '600px',
    width: '100%',
    margin: '1rem',
    animation: 'fadeInUp 0.5s ease-out forwards'
  }

  const dialogTitleStyles = {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.8rem',
    fontWeight: 600,
    color: 'rgb(52, 71, 103)',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid rgba(52, 71, 103, 0.1)'
  }

  const dialogContentStyles = {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.4rem',
    color: 'rgb(52, 71, 103)',
    padding: '2rem'
  }

  const dialogActionsStyles = {
    padding: '1rem 2rem',
    borderTop: '1px solid rgba(52, 71, 103, 0.1)'
  }

  const textFieldStyles = {
    '& .MuiInputBase-root': {
      fontFamily: "'Inter', 'Arial', sans-serif",
      fontSize: '1.4rem',
      color: 'rgb(52, 71, 103)',
      borderRadius: '0.5rem',
      background: 'rgba(255, 255, 255, 1)',
      '&:hover': {
        background: 'rgba(52, 71, 103, 0.05)'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(52, 71, 103, 0.3)',
      borderWidth: '1px'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(52, 71, 103)'
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(52, 71, 103)',
      borderWidth: '2px'
    },
    '& .MuiInputLabel-root': {
      fontFamily: "'Inter', 'Arial', sans-serif",
      fontSize: '1.4rem',
      color: 'rgb(52, 71, 103)',
      '&.Mui-focused': {
        color: 'rgb(52, 71, 103)'
      }
    },
    '& .MuiInputBase-multiline': {
      padding: '0.5rem'
    }
  }

  return (
    <VoucherDashboardWrapper>
      <h3>Vouchers</h3>
      <Button
        variant="contained"
        onClick={handleOpenAdd}
        style={{ marginBottom: '2rem', backgroundColor: 'rgb(52, 71, 103)' }}
      >
        Add Voucher
      </Button>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Voucher Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Discount Type</TableCell>
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
                  key={voucher.id}
                  onClick={() => handleOpenDetail(voucher)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{voucher.voucher_code}</TableCell>
                  <TableCell>
                    {voucher.description.substring(0, 50)}...
                  </TableCell>
                  <TableCell>{voucher.discount_type}</TableCell>
                  <TableCell>{voucher.discount_value}</TableCell>
                  <TableCell>{voucher.start_date}</TableCell>
                  <TableCell>{voucher.end_date}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton onClick={() => handleOpenEdit(voucher)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDelete(voucher)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detail Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetail}
        sx={{ '& .MuiDialog-paper': dialogPaperStyles }}
      >
        <DialogTitle sx={dialogTitleStyles}>Voucher Details</DialogTitle>
        <DialogContent sx={dialogContentStyles}>
          {selectedVoucher && (
            <div>
              <p>
                <strong>Code:</strong> {selectedVoucher.voucher_code}
              </p>
              <p>
                <strong>Description:</strong> {selectedVoucher.description}
              </p>
              <p>
                <strong>Discount Type:</strong> {selectedVoucher.discount_type}
              </p>
              <p>
                <strong>Discount Value:</strong>{' '}
                {selectedVoucher.discount_value}
              </p>
              <p>
                <strong>Voucher For:</strong>{' '}
                {selectedVoucher.voucher_for || 'N/A'}
              </p>
              <p>
                <strong>Usage Limit:</strong> {selectedVoucher.usage_limit}
              </p>
              <p>
                <strong>Usage Count:</strong> {selectedVoucher.usage_count}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedVoucher.start_date}
              </p>
              <p>
                <strong>End Date:</strong> {selectedVoucher.end_date}
              </p>
              <p>
                <strong>All Users:</strong>{' '}
                {selectedVoucher.is_all_users ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>All Courses:</strong>{' '}
                {selectedVoucher.is_all_courses ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Created At:</strong> {selectedVoucher.create_at}
              </p>
              <p>
                <strong>Updated At:</strong> {selectedVoucher.update_at}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={handleCloseDetail}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        sx={{ '& .MuiDialog-paper': dialogPaperStyles }}
      >
        <DialogTitle sx={dialogTitleStyles}>Edit Voucher</DialogTitle>
        <DialogContent sx={dialogContentStyles}>
          <TextField
            margin="dense"
            name="voucher_code"
            label="Voucher Code"
            fullWidth
            value={editVoucher.voucher_code || ''}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editVoucher.description || ''}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="discount_type"
            label="Discount Type"
            fullWidth
            select
            SelectProps={{ native: true }}
            value={editVoucher.discount_type || 'percent'}
            onChange={handleEditChange}
            sx={textFieldStyles}
          >
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
          </TextField>
          <TextField
            margin="dense"
            name="discount_value"
            label="Discount Value"
            type="number"
            fullWidth
            value={editVoucher.discount_value || 0}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="start_date"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editVoucher.start_date || ''}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="end_date"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editVoucher.end_date || ''}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAdd}
        sx={{ '& .MuiDialog-paper': dialogPaperStyles }}
      >
        <DialogTitle sx={dialogTitleStyles}>Add Voucher</DialogTitle>
        <DialogContent sx={dialogContentStyles}>
          <TextField
            margin="dense"
            name="voucher_code"
            label="Voucher Code"
            fullWidth
            value={newVoucher.voucher_code}
            onChange={handleNewChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newVoucher.description}
            onChange={handleNewChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="discount_type"
            label="Discount Type"
            fullWidth
            select
            SelectProps={{ native: true }}
            value={newVoucher.discount_type}
            onChange={handleNewChange}
            sx={textFieldStyles}
          >
            <option value="percent">Percent</option>
            <option value="fixed">Fixed</option>
          </TextField>
          <TextField
            margin="dense"
            name="discount_value"
            label="Discount Value"
            type="number"
            fullWidth
            value={newVoucher.discount_value}
            onChange={handleNewChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="start_date"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newVoucher.start_date}
            onChange={handleNewChange}
            sx={textFieldStyles}
          />
          <TextField
            margin="dense"
            name="end_date"
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newVoucher.end_date}
            onChange={handleNewChange}
            sx={textFieldStyles}
          />
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleAddVoucher}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        sx={{ '& .MuiDialog-paper': dialogPaperStyles }}
      >
        <DialogTitle sx={dialogTitleStyles}>Confirm Delete</DialogTitle>
        <DialogContent sx={dialogContentStyles}>
          <p>
            Are you sure you want to delete the voucher &quot;
            {voucherToDelete?.voucher_code}&quot;? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </VoucherDashboardWrapper>
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
  .table-container {
    background: rgb(255, 255, 255);
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
      rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .MuiTableCell-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
      color: rgb(52, 71, 103);
    }

    .MuiTableHead-root .MuiTableCell-root {
      font-weight: 600;
      background-color: rgba(52, 71, 103, 0.1);
    }
  }

  .MuiButton-root {
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 1.4rem;
    text-transform: none;
    transition: color 0.3s, background 0.3s, box-shadow 0.3s;

    &:hover {
      background: rgba(52, 71, 103, 0.1);
    }
  }

  .MuiTextField-root {
    .MuiInputBase-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
    }
    .MuiInputLabel-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default VoucherDashboard
