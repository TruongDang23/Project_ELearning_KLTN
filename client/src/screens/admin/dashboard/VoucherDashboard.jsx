import { useState, useEffect } from 'react'
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
  Snackbar,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { admin } from 'api/index'
import { v4 as uuidv4 } from 'uuid'

function VoucherDashboard() {
  const [vouchers, setVouchers] = useState([])
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [editVoucher, setEditVoucher] = useState({})
  const [newVoucher, setNewVoucher] = useState({
    voucher_code: '',
    description: '',
    discount_value: 0,
    voucher_for: '',
    usage_limit: 0,
    start_date: '',
    end_date: '',
    is_all_users: false,
    is_all_courses: false,
    users: '',
    courses: ''
  })
  const [voucherToDelete, setVoucherToDelete] = useState(null)
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

  // Fetch vouchers from API
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await admin.getListVoucher()
        const result = response.data
        if (result.status === 'success') {
          // Map API data to include is_deleted flag
          const formattedVouchers = result.data.map((voucher) => ({
            ...voucher,
            is_deleted: 0
          }))
          setVouchers(formattedVouchers)
        } else {
          setOpenError({ status: true, message: 'Failed to load vouchers' })
        }
      } catch (error) {
        setOpenError({
          status: true,
          message: 'Error fetching vouchers: ' + error.message
        })
      }
    }
    fetchVouchers()
  }, [])

  const handleOpenDetail = (voucher) => {
    setSelectedVoucher(voucher)
    setOpenDetailDialog(true)
  }

  const handleCloseDetail = () => {
    setOpenDetailDialog(false)
    setSelectedVoucher(null)
  }

  const handleOpenEdit = (voucher) => {
    setEditVoucher({
      ...voucher,
      users: voucher.users.map((u) => u.userID).join(', '),
      courses: voucher.courses.join(', ')
    })
    setOpenEditDialog(true)
  }

  const handleCloseEdit = () => {
    setOpenEditDialog(false)
    setEditVoucher({})
  }

  const handleOpenAdd = () => {
    setNewVoucher({
      voucher_code: uuidv4(), // Tạo UUID mới mỗi khi mở form thêm voucher
      description: '',
      discount_value: 0,
      voucher_for: '',
      usage_limit: 0,
      start_date: '',
      end_date: '',
      is_all_users: false,
      is_all_courses: false,
      users: []
    })
    setOpenAddDialog(true)
  }

  const handleCloseAdd = () => {
    setOpenAddDialog(false)
    setNewVoucher({
      voucher_code: '',
      description: '',
      discount_value: 0,
      voucher_for: '',
      usage_limit: 0,
      start_date: '',
      end_date: '',
      is_all_users: false,
      is_all_courses: false,
      users: '',
      courses: ''
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

  // const handleConfirmDelete = () => {
  //   if (voucherToDelete) {
  //     setVouchers((prev) =>
  //       prev.map((voucher) =>
  //         voucher.voucher_code === voucherToDelete.voucher_code
  //           ? { ...voucher, is_deleted: 1 }
  //           : voucher
  //       )
  //     )
  //   }
  //   handleCloseDelete()
  // }
  const handleConfirmDelete = async () => {
    try {
      if (voucherToDelete) {
        const response = await admin.deleteVoucher(voucherToDelete.voucher_code)
        const result = await response.json()
        if (result.status === 'success') {
          setVouchers((prev) =>
            prev.filter(
              (voucher) => voucher.voucher_code !== voucherToDelete.voucher_code
            )
          )
          handleCloseDelete()
        } else {
          setOpenError({ status: true, message: 'Failed to delete voucher' })
        }
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error deleting voucher: ' + error.message
      })
    }
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditVoucher((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewVoucher((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // const handleSaveEdit = () => {
  //   const usersArray = editVoucher.users
  //     ? editVoucher.users
  //         .split(',')
  //         .map((id) => id.trim())
  //         .filter((id) => id)
  //     : []
  //   const coursesArray = editVoucher.courses
  //     ? editVoucher.courses
  //         .split(',')
  //         .map((id) => id.trim())
  //         .filter((id) => id)
  //     : []
  //   setVouchers((prev) =>
  //     prev.map((voucher) =>
  //       voucher.voucher_code === editVoucher.voucher_code
  //         ? {
  //             ...editVoucher,
  //             users: usersArray.map((id) => ({ userID: id })),
  //             courses: coursesArray,
  //             discount_value: parseInt(editVoucher.discount_value),
  //             usage_limit: parseInt(editVoucher.usage_limit),
  //             update_at: new Date().toISOString()
  //           }
  //         : voucher
  //     )
  //   )
  //   handleCloseEdit()
  // }
  const handleSaveEdit = async () => {
    try {
      const usersArray = editVoucher.users
        ? editVoucher.users
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        : []
      const coursesArray = editVoucher.courses
        ? editVoucher.courses
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        : []

      const response = await admin.updateVoucher({
        ...editVoucher,
        discount_value: parseInt(editVoucher.discount_value),
        usage_limit: parseInt(editVoucher.usage_limit),
        users: editVoucher.voucher_for === 'student' ? usersArray : [],
        courses: editVoucher.voucher_for === 'course' ? coursesArray : []
      })

      const result = await response.json()
      if (result.status === 'success') {
        setVouchers((prev) =>
          prev.map((voucher) =>
            voucher.voucher_code === editVoucher.voucher_code
              ? { ...result.data, is_deleted: 0 }
              : voucher
          )
        )
        handleCloseEdit()
      } else {
        setOpenError({ status: true, message: 'Failed to save voucher' })
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error saving voucher: ' + error.message
      })
    }
  }

  // const handleAddVoucher = () => {
  //   const usersArray = newVoucher.users
  //     ? newVoucher.users
  //         .split(',')
  //         .map((id) => id.trim())
  //         .filter((id) => id)
  //     : []
  //   const coursesArray = newVoucher.courses
  //     ? newVoucher.courses
  //         .split(',')
  //         .map((id) => id.trim())
  //         .filter((id) => id)
  //     : []
  //   setVouchers((prev) => [
  //     ...prev,
  //     {
  //       ...newVoucher,
  //       voucher_code: newVoucher.voucher_code || `V${Date.now()}`,
  //       discount_value: parseInt(newVoucher.discount_value),
  //       usage_limit: parseInt(newVoucher.usage_limit),
  //       usage_count: 0,
  //       create_at: new Date().toISOString(),
  //       update_at: new Date().toISOString(),
  //       is_deleted: 0,
  //       users: usersArray.map((id) => ({ userID: id })),
  //       courses: coursesArray,
  //       used: []
  //     }
  //   ])
  //   handleCloseAdd()
  // }
  const handleAddVoucher = async () => {
    try {
      const usersArray = newVoucher.users
        ? newVoucher.users
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        : []
      const coursesArray = newVoucher.courses
        ? newVoucher.courses
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        : []
      const response = await admin.createVoucher({
        ...newVoucher,
        discount_value: parseInt(newVoucher.discount_value),
        usage_limit: parseInt(newVoucher.usage_limit),
        users: newVoucher.voucher_for === 'student' ? usersArray : [],
        courses: newVoucher.voucher_for === 'course' ? coursesArray : []
      })
      const result = await response.json()
      if (result.status === 'success') {
        setVouchers((prev) => [...prev, { ...result.data, is_deleted: 0 }])
        handleCloseAdd()
      } else {
        setOpenError({ status: true, message: 'Failed to add voucher' })
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error adding voucher: ' + error.message
      })
    }
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
    display: 'flex',
    width: '100%',
    gap: '3rem',
    justifyContent: 'center',
    '.btn-save, .btn-cancel, .btn-delete': {
      padding: '0.5rem 1rem',
      fontSize: '1.6rem',
      fontWeight: 600,
      borderRadius: '0.5rem',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    '.btn-save': {
      backgroundColor: '#0f4e8b',
      color: '#fff',
      border: 'none',
      '&:hover': {
        backgroundColor: '#1971c2'
      }
    },
    '.btn-cancel': {
      backgroundColor: '#fff',
      color: '#1971c2',
      outline: 'none',
      border: 'none',
      boxShadow: 'inset 0 0 0 2px #1971c2',
      '&:hover': {
        backgroundColor: '#1971c2',
        color: '#fff'
      }
    },
    '.btn-delete': {
      backgroundColor: '#ff4d4f',
      color: '#fff',
      border: 'none',
      '&:hover': {
        backgroundColor: '#ff7875'
      }
    }
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
                  onClick={() => handleOpenDetail(voucher)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{voucher.voucher_code}</TableCell>
                  <TableCell>
                    {voucher.description.substring(0, 50)}...
                  </TableCell>
                  <TableCell>{voucher.discount_value}</TableCell>
                  <TableCell>{voucher.start_date.split('T')[0]}</TableCell>
                  <TableCell>{voucher.end_date.split('T')[0]}</TableCell>
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
                <strong>Start Date:</strong>{' '}
                {selectedVoucher.start_date.split('T')[0]}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {selectedVoucher.end_date.split('T')[0]}
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
                <strong>Eligible Users:</strong>{' '}
                {selectedVoucher.users?.length > 0
                  ? selectedVoucher.users
                      .map((user) => user.fullname)
                      .join(', ')
                  : 'None'}
              </p>
              <p>
                <strong>Eligible Courses:</strong>{' '}
                {selectedVoucher.courses?.length > 0
                  ? selectedVoucher.courses.join(', ')
                  : 'None'}
              </p>
              <p>
                <strong>Used By:</strong>{' '}
                {selectedVoucher.used?.length > 0
                  ? selectedVoucher.used.map((user) => user.fullname).join(', ')
                  : 'None'}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button className="btn-cancel" onClick={handleCloseDetail}>
            Close
          </Button>
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
            disabled
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
            name="discount_value"
            label="Discount Value (%)"
            type="number"
            fullWidth
            value={editVoucher.discount_value || 0}
            onChange={handleEditChange}
            sx={textFieldStyles}
            inputProps={{ step: 1, min: 0, max: 100 }}
          />
          <FormControl fullWidth margin="dense" sx={textFieldStyles}>
            <InputLabel>Voucher For</InputLabel>
            <Select
              name="voucher_for"
              value={editVoucher.voucher_for || ''}
              onChange={handleEditChange}
              disabled
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="course">Course</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="usage_limit"
            label="Usage Limit"
            type="number"
            fullWidth
            value={editVoucher.usage_limit || 0}
            onChange={handleEditChange}
            sx={textFieldStyles}
            inputProps={{ step: 1, min: 0, max: 100 }}
          />
          <TextField
            margin="dense"
            name="start_date"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={editVoucher.start_date?.split('T')[0] || ''}
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
            value={editVoucher.end_date?.split('T')[0] || ''}
            onChange={handleEditChange}
            sx={textFieldStyles}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_all_users"
                checked={editVoucher.is_all_users || false}
                onChange={handleEditChange}
              />
            }
            label="All Users"
            sx={{ margin: '1rem 0' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_all_courses"
                checked={editVoucher.is_all_courses || false}
                onChange={handleEditChange}
              />
            }
            label="All Courses"
            sx={{ margin: '1rem 0' }}
          />
          {!editVoucher.is_all_users &&
            editVoucher.voucher_for === 'student' && (
              <TextField
                margin="dense"
                name="users"
                label="User IDs (comma-separated)"
                fullWidth
                value={editVoucher.users || ''}
                onChange={handleEditChange}
                sx={textFieldStyles}
                helperText="Enter user IDs separated by commas (e.g., S000, S001)"
              />
            )}
          {!editVoucher.is_all_courses &&
            editVoucher.voucher_for === 'course' && (
              <TextField
                margin="dense"
                name="courses"
                label="Course IDs (comma-separated)"
                fullWidth
                value={editVoucher.courses || ''}
                onChange={handleEditChange}
                sx={textFieldStyles}
                helperText="Enter course IDs separated by commas (e.g., C000, C001)"
              />
            )}
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button className="btn-cancel" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            className="btn-save"
            disabled={
              !editVoucher.description ||
              !editVoucher.discount_value ||
              !editVoucher.voucher_for ||
              !editVoucher.usage_limit ||
              !editVoucher.start_date ||
              !editVoucher.end_date ||
              (!editVoucher.is_all_users &&
                editVoucher.voucher_for === 'student' &&
                !editVoucher.users) ||
              (!editVoucher.is_all_courses &&
                editVoucher.voucher_for === 'course' &&
                !editVoucher.courses)
            }
          >
            Save
          </Button>
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
            name="discount_value"
            label="Discount Value (%)"
            type="number"
            fullWidth
            value={newVoucher.discount_value}
            onChange={handleNewChange}
            sx={textFieldStyles}
            inputProps={{ step: 1, min: 0, max: 100 }}
          />
          <FormControl fullWidth margin="dense" sx={textFieldStyles}>
            <InputLabel>Voucher For</InputLabel>
            <Select
              name="voucher_for"
              value={newVoucher.voucher_for}
              onChange={handleNewChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="course">Course</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="usage_limit"
            label="Usage Limit"
            type="number"
            fullWidth
            value={newVoucher.usage_limit}
            onChange={handleNewChange}
            sx={textFieldStyles}
            inputProps={{ step: 1, min: 0, max: 100 }}
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
          <FormControlLabel
            control={
              <Checkbox
                name="is_all_users"
                checked={newVoucher.is_all_users}
                onChange={handleNewChange}
              />
            }
            label="All Users"
            sx={{ margin: '1rem 0' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="is_all_courses"
                checked={newVoucher.is_all_courses}
                onChange={handleNewChange}
              />
            }
            label="All Courses"
            sx={{ margin: '1rem 0' }}
          />
          {!newVoucher.is_all_users && newVoucher.voucher_for === 'student' && (
            <TextField
              margin="dense"
              name="users"
              label="User IDs (comma-separated)"
              fullWidth
              value={newVoucher.users}
              onChange={handleNewChange}
              sx={textFieldStyles}
              helperText="Enter user IDs separated by commas (e.g., S000, S001)"
            />
          )}
          {!newVoucher.is_all_courses &&
            newVoucher.voucher_for === 'course' && (
              <TextField
                margin="dense"
                name="courses"
                label="Course IDs (comma-separated)"
                fullWidth
                value={newVoucher.courses}
                onChange={handleNewChange}
                sx={textFieldStyles}
                helperText="Enter course IDs separated by commas (e.g., C000, C001)"
              />
            )}
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button className="btn-cancel" onClick={handleCloseAdd}>
            Cancel
          </Button>
          <Button
            onClick={handleAddVoucher}
            className="btn-save"
            disabled={
              !newVoucher.description ||
              !newVoucher.discount_value ||
              !newVoucher.voucher_for ||
              !newVoucher.usage_limit ||
              !newVoucher.start_date ||
              !newVoucher.end_date ||
              (!newVoucher.is_all_users &&
                newVoucher.voucher_for === 'student' &&
                !newVoucher.users) ||
              (!newVoucher.is_all_courses &&
                newVoucher.voucher_for === 'course' &&
                !newVoucher.courses)
            }
          >
            Add
          </Button>
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
          <Button className="btn-cancel" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button
            className="btn-delete"
            onClick={handleConfirmDelete}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openError.status}
        autoHideDuration={6000}
        onClose={() => setOpenError({ status: false, message: '' })}
        message={openError.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
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
