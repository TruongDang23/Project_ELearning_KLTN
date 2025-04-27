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
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Tooltip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { v4 as uuidv4 } from 'uuid'
import { admin } from 'api/index'
import { Snackbar } from '~/components/general'

function VoucherDashboard() {
  const [vouchers, setVouchers] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
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
  const [openSuccess, setOpenSuccess] = useState({
    status: false,
    message: ''
  })
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })
  const [validationErrors, setValidationErrors] = useState({
    discount_value: '',
    usage_limit: '',
    start_date: '',
    end_date: ''
  })

  // Validation function
  const validateVoucher = (voucher) => {
    const errors = {
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: ''
    }
    let isValid = true

    // Validate discount_value
    const discountValue = parseInt(voucher.discount_value)
    if (isNaN(discountValue) || discountValue <= 0) {
      errors.discount_value = 'Discount value must be a positive integer'
      isValid = false
    }
    // check if discountValue > 100
    if (discountValue > 100) {
      errors.discount_value = 'Discount value cannot exceed 100%'
      isValid = false
    }

    // Validate usage_limit
    const usageLimit = parseInt(voucher.usage_limit)
    if (isNaN(usageLimit) || usageLimit <= 0) {
      errors.usage_limit = 'Usage limit must be a positive integer'
      isValid = false
    }

    // Validate dates
    if (voucher.start_date && voucher.end_date) {
      const startDate = new Date(voucher.start_date)
      const endDate = new Date(voucher.end_date)
      if (startDate > endDate) {
        errors.start_date = 'Start date must be before or equal to end date'
        errors.end_date = 'End date must be after or equal to start date'
        isValid = false
      }
    }

    setValidationErrors(errors)
    return isValid
  }

  // Fetch vouchers from API
  const loadAllVouchers = async () => {
    try {
      const response = await admin.getListVoucher()
      const result = response.data
      if (response.status === 200 || response.status === 'success') {
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

  const loadAllStudents = async () => {
    try {
      const response = await admin.loadListStudent()
      if (response.status === 200 || response.status === 'success') {
        setAllStudents(response.data.active || [])
        console.log(allStudents)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const loadAllCourses = async () => {
    try {
      const response = await admin.loadListCourse()
      if (response.status === 200 || response.status === 'success') {
        setAllCourses(response.data.published || [])
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    loadAllVouchers()
    loadAllCourses()
    loadAllStudents()
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
    // Lấy đối tượng student đầy đủ từ ID
    const userObjects = voucher.users.map((user) => {
      return (
        allStudents.find((student) => student.userID === user.userID) || user
      )
    })
    console.log('voucher', voucher)

    let courseObjects = []
    if (voucher.courses && voucher.courses.length > 0) {
      // Kiểm tra xem courses là mảng chuỗi ID hay mảng object
      const isCourseObject = typeof voucher.courses[0] === 'object'

      courseObjects = voucher.courses.map((course) => {
        // Nếu course là string (ID) thì tìm trong allCourses
        const courseId = isCourseObject ? course.courseID : course
        const foundCourse = allCourses.find((c) => c.courseID === courseId)

        if (foundCourse) {
          return foundCourse
        } else {
          // Log lỗi để debug
          console.warn(`Course not found: ${courseId}`)
          return {
            courseID: courseId,
            title: `Course ${courseId}`,
            teacher: 'Unknown',
            method: 'Unknown',
            program: 'Unknown',
            image_introduce: 'default-course.png'
          }
        }
      })
    }

    console.log('Course objects:', courseObjects) // Debug
    console.log('All courses:', allCourses) // Debug

    setSelectedStudents(userObjects)
    setSelectedCourses(courseObjects)
    setEditVoucher({
      ...voucher,
      users: voucher.users.map((u) => u.userID).join(', '),
      courses: voucher.courses.join(', ')
    })
    setValidationErrors({
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: ''
    })
    setOpenEditDialog(true)
  }

  const handleCloseEdit = () => {
    setOpenEditDialog(false)
    setEditVoucher({})
    setValidationErrors({
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: ''
    })
  }

  const handleOpenAdd = () => {
    setNewVoucher({
      voucher_code: uuidv4(),
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
    setSelectedStudents([])
    setSelectedCourses([])
    setValidationErrors({
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: ''
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
    setValidationErrors({
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: ''
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

  const handleConfirmDelete = async () => {
    try {
      if (voucherToDelete) {
        const response = await admin.deleteVoucher(voucherToDelete.voucher_code)
        if (response.status === 204) {
          setOpenSuccess({
            status: true,
            message: `Voucher "${voucherToDelete.voucher_code}" deleted successfully`
          })
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
    // Re-validate on change
    validateVoucher({
      ...editVoucher,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewVoucher((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Re-validate on change
    validateVoucher({
      ...newVoucher,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSaveEdit = async () => {
    if (!validateVoucher(editVoucher)) {
      setOpenError({ status: true, message: 'Please fix validation errors' })
      return
    }
    try {
      // const usersArray = editVoucher.users
      //   ? editVoucher.users
      //       .split(',')
      //       .map((id) => id.trim())
      //       .filter((id) => id)
      //   : []
      // const coursesArray = editVoucher.courses
      //   ? editVoucher.courses.split(',').map((id) => id.trim())
      //   : []
      // const formattedStartDate = editVoucher.start_date
      //   ? new Date(editVoucher.start_date).toISOString().split('T')[0]
      //   : ''
      // const formattedEndDate = editVoucher.end_date
      //   ? new Date(editVoucher.end_date).toISOString().split('T')[0]
      //   : ''

      // const response = await admin.updateVoucher(editVoucher.voucher_code, {
      //   ...editVoucher,
      //   discount_value: parseInt(editVoucher.discount_value),
      //   usage_limit: parseInt(editVoucher.usage_limit),
      //   start_date: formattedStartDate,
      //   end_date: formattedEndDate,
      //   users: editVoucher.voucher_for === 'student' ? usersArray : [],
      //   courses: editVoucher.voucher_for === 'course' ? coursesArray : []
      // })
      // Kiểm tra và xử lý users
      let userIds = []
      if (editVoucher.voucher_for === 'student' && !editVoucher.is_all_users) {
        // Nếu là mảng đối tượng từ Autocomplete
        if (
          Array.isArray(editVoucher.users) &&
          typeof editVoucher.users[0] === 'object'
        ) {
          userIds = editVoucher.users.map((user) => user.userID)
        }
        // Nếu là chuỗi từ TextField ban đầu
        else if (typeof editVoucher.users === 'string') {
          userIds = editVoucher.users
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        }
        // Nếu có selectedStudents, sử dụng nó
        else if (selectedStudents.length > 0) {
          userIds = selectedStudents.map((user) => user.userID)
        }
      }

      // Kiểm tra và xử lý courses
      let courseIds = []
      if (editVoucher.voucher_for === 'course' && !editVoucher.is_all_courses) {
        // Nếu là mảng đối tượng từ Autocomplete
        if (
          Array.isArray(editVoucher.courses) &&
          typeof editVoucher.courses[0] === 'object'
        ) {
          courseIds = editVoucher.courses.map((course) => course.courseID)
        }
        // Nếu là chuỗi từ TextField ban đầu
        else if (typeof editVoucher.courses === 'string') {
          courseIds = editVoucher.courses
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        }
        // Nếu có selectedCourses, sử dụng nó
        else if (selectedCourses.length > 0) {
          courseIds = selectedCourses.map((course) => course.courseID)
        }
      }

      const formattedStartDate = editVoucher.start_date
        ? new Date(editVoucher.start_date).toISOString().split('T')[0]
        : ''
      const formattedEndDate = editVoucher.end_date
        ? new Date(editVoucher.end_date).toISOString().split('T')[0]
        : ''

      const response = await admin.updateVoucher(editVoucher.voucher_code, {
        ...editVoucher,
        discount_value: parseInt(editVoucher.discount_value),
        usage_limit: parseInt(editVoucher.usage_limit),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        is_all_courses: editVoucher.is_all_courses ? true : false,
        is_all_users: editVoucher.is_all_users ? true : false,
        users: userIds,
        courses: courseIds
      })

      if (response.status === 200 || response.status === 'success') {
        setOpenSuccess({
          status: true,
          message: `Voucher updated successfully`
        })
        setTimeout(() => {
          setOpenSuccess({
            status: false,
            message: ''
          })
        }, 3000)
        loadAllVouchers()
        handleCloseEdit()
      } else {
        setOpenError({ status: true, message: 'Failed to update voucher' })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error saving voucher: ' + error.message
      })
    }
  }

  const handleAddVoucher = async () => {
    if (!validateVoucher(newVoucher)) {
      setOpenError({ status: true, message: 'Please fix validation errors' })
      return
    }
    try {
      // const usersArray = newVoucher.users
      //   ? newVoucher.users
      //       .split(',')
      //       .map((id) => id.trim())
      //       .filter((id) => id)
      //   : []
      // const coursesArray = newVoucher.courses
      //   ? newVoucher.courses
      //       .split(',')
      //       .map((id) => id.trim())
      //       .filter((id) => id)
      //   : []

      // const response = await admin.createVoucher({
      //   ...newVoucher,
      //   discount_value: parseInt(newVoucher.discount_value),
      //   usage_limit: parseInt(newVoucher.usage_limit),
      //   users: newVoucher.voucher_for === 'student' ? usersArray : [],
      //   courses: newVoucher.voucher_for === 'course' ? coursesArray : []
      // })
      const userIds =
        newVoucher.voucher_for === 'student' && !newVoucher.is_all_users
          ? newVoucher.users.map((user) => user.userID)
          : []

      const courseIds =
        newVoucher.voucher_for === 'course' && !newVoucher.is_all_courses
          ? newVoucher.courses.map((course) => course.courseID)
          : []

      const formattedStartDate = newVoucher.start_date
        ? new Date(newVoucher.start_date).toISOString().split('T')[0]
        : ''
      const formattedEndDate = newVoucher.end_date
        ? new Date(newVoucher.end_date).toISOString().split('T')[0]
        : ''

      const response = await admin.createVoucher({
        ...newVoucher,
        discount_value: parseInt(newVoucher.discount_value),
        usage_limit: parseInt(newVoucher.usage_limit),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        users: userIds,
        courses: courseIds
      })
      if (response.status === 201) {
        setOpenSuccess({
          status: true,
          message: `Add new voucher successfully`
        })
        setTimeout(() => {
          setOpenSuccess({
            status: false,
            message: ''
          })
        }, 3000)
        loadAllVouchers()
        handleCloseAdd()
      } else {
        setOpenError({ status: true, message: 'Failed to add voucher' })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
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

      {/* Detail Dialog
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
      </Dialog> */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetail}
        sx={{
          '& .MuiDialog-paper': {
            ...dialogPaperStyles,
            maxWidth: '800px' // Mở rộng dialog
          }
        }}
      >
        <DialogTitle sx={dialogTitleStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: '#1971c2' }}>🏷️</span>
            Voucher Details
          </div>
        </DialogTitle>
        <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
          {selectedVoucher && (
            <div>
              {/* Header section */}
              <Paper
                elevation={0}
                sx={{
                  padding: '1rem',
                  background: 'linear-gradient(to right, #e6f7ff, #f0f5ff)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  border: '1px solid #e6f2ff'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: '0 0 4px 0',
                        fontSize: '1.8rem',
                        color: '#0f4e8b'
                      }}
                    >
                      {selectedVoucher.voucher_code}
                    </h3>
                    <p
                      style={{ margin: '0', fontSize: '1.3rem', color: '#666' }}
                    >
                      {selectedVoucher.description.substring(0, 120)}
                      {selectedVoucher.description.length > 120 ? '...' : ''}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        padding: '1rem',
                        background: '#1971c2',
                        color: 'white',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.8rem'
                      }}
                    >
                      {parseInt(selectedVoucher.discount_value)}%
                    </div>
                  </div>
                </div>
              </Paper>

              {/* Information grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <Paper
                  sx={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      color: '#555',
                      fontSize: '1.4rem'
                    }}
                  >
                    Basic Information
                  </h4>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>Voucher For:</span>
                    <span
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}
                    >
                      {selectedVoucher.voucher_for || 'N/A'}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>Usage Limit:</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedVoucher.usage_limit}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>Usage Count:</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedVoucher.usage_count}
                    </span>
                  </p>
                </Paper>

                <Paper
                  sx={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      color: '#555',
                      fontSize: '1.4rem'
                    }}
                  >
                    Validity
                  </h4>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>Start Date:</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedVoucher.start_date.split('T')[0]}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>End Date:</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {selectedVoucher.end_date.split('T')[0]}
                    </span>
                  </p>
                  <p
                    style={{
                      margin: '8px 0',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ color: '#777' }}>Status:</span>
                    <span
                      style={{
                        fontWeight: 'bold',
                        color:
                          new Date(selectedVoucher.end_date) > new Date()
                            ? 'green'
                            : 'red',
                        padding: '2px 8px',
                        backgroundColor:
                          new Date(selectedVoucher.end_date) > new Date()
                            ? '#e6ffed'
                            : '#fff1f0',
                        borderRadius: '4px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {new Date(selectedVoucher.end_date) > new Date()
                        ? 'ACTIVE'
                        : 'EXPIRED'}
                    </span>
                  </p>
                </Paper>
              </div>

              {/* Target options */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <Paper
                  sx={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      color: '#555',
                      fontSize: '1.4rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span>User Targeting</span>
                    <span
                      style={{
                        marginLeft: '8px',
                        fontSize: '0.9rem',
                        padding: '2px 6px',
                        backgroundColor: selectedVoucher.is_all_users
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: selectedVoucher.is_all_users ? 'green' : '#666',
                        borderRadius: '4px'
                      }}
                    >
                      {selectedVoucher.is_all_users
                        ? 'ALL USERS'
                        : 'SPECIFIC USERS'}
                    </span>
                  </h4>
                  {selectedVoucher.is_all_users ? (
                    <p style={{ color: '#777', fontStyle: 'italic' }}>
                      This voucher is available to all users.
                    </p>
                  ) : (
                    <div>
                      {selectedVoucher.users?.length > 0 ? (
                        <div
                          style={{
                            maxHeight: '150px',
                            overflowY: 'auto',
                            padding: '8px 0'
                          }}
                        >
                          {selectedVoucher.users.map((user) => (
                            <Tooltip
                              key={user.userID}
                              title={
                                <div style={{ padding: '8px' }}>
                                  <p
                                    style={{ margin: '0', fontWeight: 'bold' }}
                                  >
                                    {user.fullname}
                                  </p>
                                  <p style={{ margin: '4px 0 0 0' }}>
                                    ID: {user.userID}
                                  </p>
                                </div>
                              }
                              arrow
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '4px 8px',
                                  margin: '4px 0',
                                  borderRadius: '4px',
                                  backgroundColor: '#f9f9f9',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src={user.avatar || 'default-avatar.png'}
                                  alt={user.fullname}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    marginRight: '8px'
                                  }}
                                />
                                <span>{user.fullname}</span>
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#777', fontStyle: 'italic' }}>
                          No specific users set.
                        </p>
                      )}
                    </div>
                  )}
                </Paper>

                <Paper
                  sx={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px 0',
                      color: '#555',
                      fontSize: '1.4rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span>Course Targeting</span>
                    <span
                      style={{
                        marginLeft: '8px',
                        fontSize: '0.9rem',
                        padding: '2px 6px',
                        backgroundColor: selectedVoucher.is_all_courses
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: selectedVoucher.is_all_courses
                          ? 'green'
                          : '#666',
                        borderRadius: '4px'
                      }}
                    >
                      {selectedVoucher.is_all_courses
                        ? 'ALL COURSES'
                        : 'SPECIFIC COURSES'}
                    </span>
                  </h4>
                  {selectedVoucher.is_all_courses ? (
                    <p style={{ color: '#777', fontStyle: 'italic' }}>
                      This voucher is applicable to all courses.
                    </p>
                  ) : (
                    <div>
                      {selectedVoucher.courses?.length > 0 ? (
                        <div
                          style={{
                            maxHeight: '150px',
                            overflowY: 'auto',
                            padding: '8px 0'
                          }}
                        >
                          {selectedVoucher.courses.map((course, index) => {
                            // Xử lý course có thể là string hoặc object
                            const courseId =
                              typeof course === 'object'
                                ? course.courseID
                                : course
                            const courseTitle =
                              typeof course === 'object'
                                ? course.title
                                : `Course ${course}`
                            const courseImage =
                              typeof course === 'object'
                                ? course.image_introduce
                                : null

                            return (
                              <Tooltip
                                key={index}
                                title={
                                  <div style={{ padding: '8px' }}>
                                    <p
                                      style={{
                                        margin: '0',
                                        fontWeight: 'bold'
                                      }}
                                    >
                                      {courseTitle}
                                    </p>
                                    <p style={{ margin: '4px 0 0 0' }}>
                                      ID: {courseId}
                                    </p>
                                  </div>
                                }
                                arrow
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '4px 8px',
                                    margin: '4px 0',
                                    borderRadius: '4px',
                                    backgroundColor: '#f9f9f9',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '32px',
                                      height: '24px',
                                      marginRight: '8px',
                                      backgroundImage: `url(${
                                        courseImage || 'default-course.png'
                                      })`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      borderRadius: '3px'
                                    }}
                                  />
                                  <span>{courseTitle}</span>
                                </div>
                              </Tooltip>
                            )
                          })}
                        </div>
                      ) : (
                        <p style={{ color: '#777', fontStyle: 'italic' }}>
                          No specific courses set.
                        </p>
                      )}
                    </div>
                  )}
                </Paper>
              </div>

              {/* Usage history */}
              <Paper
                sx={{
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #f0f0f0',
                  marginBottom: '1rem'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  Usage History
                </h4>
                {selectedVoucher.used?.length > 0 ? (
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {selectedVoucher.used.map((user, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '8px',
                          borderBottom:
                            index < selectedVoucher.used.length - 1
                              ? '1px solid #f0f0f0'
                              : 'none'
                        }}
                      >
                        <img
                          src={user.avatar || 'default-avatar.png'}
                          alt={user.fullname}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            marginRight: '12px'
                          }}
                        />
                        <div>
                          <p style={{ margin: '0', fontWeight: 'bold' }}>
                            {user.fullname}
                          </p>
                          <p
                            style={{
                              margin: '2px 0 0 0',
                              fontSize: '0.9rem',
                              color: '#888'
                            }}
                          >
                            Used on:{' '}
                            {user.use_at
                              ? new Date(user.use_at).toLocaleString()
                              : 'Unknown date'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#777', fontStyle: 'italic' }}>
                    No usage history available.
                  </p>
                )}
              </Paper>
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
      {/* <Dialog
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
            error={!!validationErrors.description}
            helperText={validationErrors.description}
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
            inputProps={{ step: 1, min: 1 }}
            error={!!validationErrors.discount_value}
            helperText={validationErrors.discount_value}
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
            inputProps={{ step: 1, min: 1 }}
            error={!!validationErrors.usage_limit}
            helperText={validationErrors.usage_limit}
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
            error={!!validationErrors.start_date}
            helperText={validationErrors.start_date}
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
            error={!!validationErrors.end_date}
            helperText={validationErrors.end_date}
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
              <Autocomplete
                multiple
                id="student-edit-select"
                options={allStudents}
                value={selectedStudents}
                getOptionLabel={(option) =>
                  `${option.fullname || option.userID} (${option.userID})`
                }
                onChange={(event, newValue) => {
                  setSelectedStudents(newValue)
                  setEditVoucher((prev) => ({
                    ...prev,
                    users: newValue
                  }))
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img
                        src={option.avatar || 'default-avatar.png'}
                        alt="avatar"
                        style={{ width: 30, height: 30, borderRadius: '50%' }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>
                          {option.fullname}
                        </div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {option.userID}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Students"
                    placeholder="Search students"
                    margin="dense"
                    sx={textFieldStyles}
                  />
                )}
                sx={{ marginTop: 2, marginBottom: 1 }}
              />
            )}

          {!editVoucher.is_all_courses &&
            editVoucher.voucher_for === 'course' && (
              <Autocomplete
                multiple
                id="course-edit-select"
                options={allCourses}
                value={selectedCourses}
                getOptionLabel={(option) =>
                  `${option.title || 'Unknown'} (${option.courseID})`
                }
                onChange={(event, newValue) => {
                  setSelectedCourses(newValue)
                  setEditVoucher((prev) => ({
                    ...prev,
                    courses: newValue
                  }))
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img
                        src={option.image_introduce || 'default-course.png'}
                        alt="course"
                        style={{ width: 40, height: 30, objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{option.title}</div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {option.teacher} | {option.courseID}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Courses"
                    placeholder="Search courses"
                    margin="dense"
                    sx={textFieldStyles}
                  />
                )}
                sx={{ marginTop: 2, marginBottom: 1 }}
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
              !editVoucher.voucher_for ||
              !editVoucher.start_date ||
              !editVoucher.end_date ||
              (!editVoucher.is_all_users &&
                editVoucher.voucher_for === 'student' &&
                !editVoucher.users) ||
              (!editVoucher.is_all_courses &&
                editVoucher.voucher_for === 'course' &&
                !editVoucher.courses) ||
              Object.values(validationErrors).some((error) => error)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        sx={{
          '& .MuiDialog-paper': {
            ...dialogPaperStyles,
            maxWidth: '800px' // Tăng kích thước dialog
          }
        }}
      >
        <DialogTitle sx={dialogTitleStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: '#1971c2' }}>✏️</span>
            Edit Voucher
          </div>
        </DialogTitle>
        <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
          {/* Header section với mã và Discount */}
          <Paper
            elevation={0}
            sx={{
              padding: '1rem',
              background: 'linear-gradient(to right, #e6f7ff, #f0f5ff)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #e6f2ff'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <TextField
                  margin="dense"
                  name="voucher_code"
                  label="Voucher Code"
                  fullWidth
                  value={editVoucher.voucher_code || ''}
                  onChange={handleEditChange}
                  disabled
                  sx={{
                    ...textFieldStyles,
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      color: '#0f4e8b',
                      backgroundColor: 'transparent'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                />
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={editVoucher.description || ''}
                  onChange={handleEditChange}
                  error={!!validationErrors.description}
                  helperText={validationErrors.description}
                  sx={{
                    ...textFieldStyles,
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      backgroundColor: 'transparent'
                    }
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <TextField
                  type="number"
                  name="discount_value"
                  label="Discount %"
                  value={editVoucher.discount_value || 0}
                  onChange={handleEditChange}
                  inputProps={{ min: 1, max: 100, step: 1 }}
                  error={!!validationErrors.discount_value}
                  helperText={validationErrors.discount_value}
                  sx={{
                    width: '100px',
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      backgroundColor: '#1971c2',
                      color: 'white',
                      borderRadius: '8px'
                    }
                  }}
                />
              </div>
            </div>
          </Paper>

          {/* Basic settings section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Basic Information
              </h4>

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
                inputProps={{ step: 1, min: 1 }}
                error={!!validationErrors.usage_limit}
                helperText={validationErrors.usage_limit}
              />
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Validity Period
              </h4>

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
                error={!!validationErrors.start_date}
                helperText={validationErrors.start_date}
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
                error={!!validationErrors.end_date}
                helperText={validationErrors.end_date}
              />
            </Paper>
          </div>

          {/* Target options */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  User Targeting
                </h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_all_users"
                      checked={editVoucher.is_all_users || false}
                      onChange={handleEditChange}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: '0.9rem',
                        backgroundColor: editVoucher.is_all_users
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: editVoucher.is_all_users ? 'green' : '#666',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      ALL USERS
                    </span>
                  }
                  sx={{ margin: '0' }}
                />
              </div>

              {!editVoucher.is_all_users &&
                editVoucher.voucher_for === 'student' && (
                  <Autocomplete
                    multiple
                    id="student-edit-select"
                    options={allStudents}
                    value={selectedStudents}
                    getOptionLabel={(option) =>
                      `${option.fullname || option.userID} (${option.userID})`
                    }
                    onChange={(event, newValue) => {
                      setSelectedStudents(newValue)
                      setEditVoucher((prev) => ({
                        ...prev,
                        users: newValue
                      }))
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <img
                            src={option.avatar || 'default-avatar.png'}
                            alt="avatar"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: '50%'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 'bold' }}>
                              {option.fullname}
                            </div>
                            <div style={{ fontSize: '0.8rem' }}>
                              {option.userID}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Students"
                        placeholder="Search students"
                        margin="dense"
                        sx={textFieldStyles}
                      />
                    )}
                    sx={{ marginTop: 1 }}
                  />
                )}

              {editVoucher.is_all_users && (
                <p
                  style={{
                    color: '#777',
                    fontStyle: 'italic',
                    margin: '1rem 0'
                  }}
                >
                  This voucher will be available to all users.
                </p>
              )}
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  Course Targeting
                </h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_all_courses"
                      checked={editVoucher.is_all_courses || false}
                      onChange={handleEditChange}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: '0.9rem',
                        backgroundColor: editVoucher.is_all_courses
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: editVoucher.is_all_courses ? 'green' : '#666',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      ALL COURSES
                    </span>
                  }
                  sx={{ margin: '0' }}
                />
              </div>

              {!editVoucher.is_all_courses &&
                editVoucher.voucher_for === 'course' && (
                  <Autocomplete
                    multiple
                    id="course-edit-select"
                    options={allCourses}
                    value={selectedCourses}
                    getOptionLabel={(option) =>
                      `${option.title || 'Unknown'} (${option.courseID})`
                    }
                    onChange={(event, newValue) => {
                      setSelectedCourses(newValue)
                      setEditVoucher((prev) => ({
                        ...prev,
                        courses: newValue
                      }))
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <img
                            src={option.image_introduce || 'default-course.png'}
                            alt="course"
                            style={{
                              width: 40,
                              height: 30,
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 'bold' }}>
                              {option.title}
                            </div>
                            <div style={{ fontSize: '0.8rem' }}>
                              {option.teacher} | {option.courseID}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Courses"
                        placeholder="Search courses"
                        margin="dense"
                        sx={textFieldStyles}
                      />
                    )}
                    sx={{ marginTop: 1 }}
                  />
                )}

              {editVoucher.is_all_courses && (
                <p
                  style={{
                    color: '#777',
                    fontStyle: 'italic',
                    margin: '1rem 0'
                  }}
                >
                  This voucher will be applicable to all courses.
                </p>
              )}
            </Paper>
          </div>
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
              !editVoucher.voucher_for ||
              !editVoucher.start_date ||
              !editVoucher.end_date ||
              (!editVoucher.is_all_users &&
                editVoucher.voucher_for === 'student' &&
                !editVoucher.users) ||
              (!editVoucher.is_all_courses &&
                editVoucher.voucher_for === 'course' &&
                !editVoucher.courses) ||
              Object.values(validationErrors).some((error) => error)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      {/* <Dialog
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
            disabled
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
            error={!!validationErrors.description}
            helperText={validationErrors.description}
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
            inputProps={{ step: 1, min: 1, max: 100 }}
            error={!!validationErrors.discount_value}
            helperText={validationErrors.discount_value}
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
            inputProps={{ step: 1, min: 1 }}
            error={!!validationErrors.usage_limit}
            helperText={validationErrors.usage_limit}
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
            error={!!validationErrors.start_date}
            helperText={validationErrors.start_date}
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
            error={!!validationErrors.end_date}
            helperText={validationErrors.end_date}
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
            <Autocomplete
              multiple
              id="student-select"
              options={allStudents}
              value={selectedStudents}
              getOptionLabel={(option) =>
                `${option.fullname} (${option.userID})`
              }
              onChange={(event, newValue) => {
                setSelectedStudents(newValue)
                setNewVoucher((prev) => ({
                  ...prev,
                  users: newValue
                }))
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <img
                      src={option.avatar || 'default-avatar.png'}
                      alt="avatar"
                      style={{ width: 30, height: 30, borderRadius: '50%' }}
                    />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {option.fullname}
                      </div>
                      <div style={{ fontSize: '0.8rem' }}>{option.userID}</div>
                    </div>
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Students"
                  placeholder="Search students"
                  margin="dense"
                  sx={textFieldStyles}
                />
              )}
              sx={{ marginTop: 2, marginBottom: 1 }}
            />
          )}

          {!newVoucher.is_all_courses &&
            newVoucher.voucher_for === 'course' && (
              <Autocomplete
                multiple
                id="course-select"
                options={allCourses}
                value={selectedCourses}
                getOptionLabel={(option) =>
                  `${option.title || 'Unknown'} (${option.courseID})`
                }
                onChange={(event, newValue) => {
                  setSelectedCourses(newValue)
                  setNewVoucher((prev) => ({
                    ...prev,
                    courses: newValue
                  }))
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img
                        src={option.image_introduce || 'default-course.png'}
                        alt="course"
                        style={{ width: 40, height: 30, objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{option.title}</div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {option.teacher} | {option.courseID}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Courses"
                    placeholder="Search courses"
                    margin="dense"
                    sx={textFieldStyles}
                  />
                )}
                sx={{ marginTop: 2, marginBottom: 1 }}
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
              !newVoucher.voucher_for ||
              !newVoucher.start_date ||
              !newVoucher.end_date ||
              (!newVoucher.is_all_users &&
                newVoucher.voucher_for === 'student' &&
                !newVoucher.users) ||
              (!newVoucher.is_all_courses &&
                newVoucher.voucher_for === 'course' &&
                !newVoucher.courses) ||
              Object.values(validationErrors).some((error) => error)
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* Add Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAdd}
        sx={{
          '& .MuiDialog-paper': {
            ...dialogPaperStyles,
            maxWidth: '800px' // Tăng kích thước dialog
          }
        }}
      >
        <DialogTitle sx={dialogTitleStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: '#1971c2' }}>➕</span>
            Add New Voucher
          </div>
        </DialogTitle>
        <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
          {/* Header section với mã và Discount */}
          <Paper
            elevation={0}
            sx={{
              padding: '1rem',
              background: 'linear-gradient(to right, #e6f7ff, #f0f5ff)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #e6f2ff'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <TextField
                  margin="dense"
                  name="voucher_code"
                  label="Generated Voucher Code"
                  fullWidth
                  value={newVoucher.voucher_code}
                  onChange={handleNewChange}
                  disabled
                  sx={{
                    ...textFieldStyles,
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      color: '#0f4e8b',
                      backgroundColor: 'transparent'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                />
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={newVoucher.description}
                  onChange={handleNewChange}
                  error={!!validationErrors.description}
                  helperText={validationErrors.description}
                  sx={{
                    ...textFieldStyles,
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      backgroundColor: 'transparent'
                    }
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <TextField
                  type="number"
                  name="discount_value"
                  label="Discount %"
                  value={newVoucher.discount_value}
                  onChange={handleNewChange}
                  inputProps={{ min: 1, max: 100, step: 1 }}
                  error={!!validationErrors.discount_value}
                  helperText={validationErrors.discount_value}
                  sx={{
                    width: '100px',
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      backgroundColor: '#1971c2',
                      color: 'white',
                      borderRadius: '8px'
                    }
                  }}
                />
              </div>
            </div>
          </Paper>

          {/* Basic settings section */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Basic Information
              </h4>

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
                inputProps={{ step: 1, min: 1 }}
                error={!!validationErrors.usage_limit}
                helperText={validationErrors.usage_limit}
              />
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Validity Period
              </h4>

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
                error={!!validationErrors.start_date}
                helperText={validationErrors.start_date}
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
                error={!!validationErrors.end_date}
                helperText={validationErrors.end_date}
              />
            </Paper>
          </div>

          {/* Target options */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  User Targeting
                </h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_all_users"
                      checked={newVoucher.is_all_users}
                      onChange={handleNewChange}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: '0.9rem',
                        backgroundColor: newVoucher.is_all_users
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: newVoucher.is_all_users ? 'green' : '#666',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      ALL USERS
                    </span>
                  }
                  sx={{ margin: '0' }}
                />
              </div>

              {!newVoucher.is_all_users &&
                newVoucher.voucher_for === 'student' && (
                  <Autocomplete
                    multiple
                    id="student-select"
                    options={allStudents}
                    value={selectedStudents}
                    getOptionLabel={(option) =>
                      `${option.fullname} (${option.userID})`
                    }
                    onChange={(event, newValue) => {
                      setSelectedStudents(newValue)
                      setNewVoucher((prev) => ({
                        ...prev,
                        users: newValue
                      }))
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <img
                            src={option.avatar || 'default-avatar.png'}
                            alt="avatar"
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: '50%'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 'bold' }}>
                              {option.fullname}
                            </div>
                            <div style={{ fontSize: '0.8rem' }}>
                              {option.userID}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Students"
                        placeholder="Search students"
                        margin="dense"
                        sx={textFieldStyles}
                      />
                    )}
                    sx={{ marginTop: 1 }}
                  />
                )}

              {newVoucher.is_all_users && (
                <p
                  style={{
                    color: '#777',
                    fontStyle: 'italic',
                    margin: '1rem 0'
                  }}
                >
                  This voucher will be available to all users.
                </p>
              )}
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  Course Targeting
                </h4>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="is_all_courses"
                      checked={newVoucher.is_all_courses}
                      onChange={handleNewChange}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: '0.9rem',
                        backgroundColor: newVoucher.is_all_courses
                          ? '#e6ffed'
                          : '#f5f5f5',
                        color: newVoucher.is_all_courses ? 'green' : '#666',
                        padding: '3px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      ALL COURSES
                    </span>
                  }
                  sx={{ margin: '0' }}
                />
              </div>

              {!newVoucher.is_all_courses &&
                newVoucher.voucher_for === 'course' && (
                  <Autocomplete
                    multiple
                    id="course-select"
                    options={allCourses}
                    value={selectedCourses}
                    getOptionLabel={(option) =>
                      `${option.title || 'Unknown'} (${option.courseID})`
                    }
                    onChange={(event, newValue) => {
                      setSelectedCourses(newValue)
                      setNewVoucher((prev) => ({
                        ...prev,
                        courses: newValue
                      }))
                    }}
                    renderOption={(props, option) => (
                      <li {...props}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                          }}
                        >
                          <img
                            src={option.image_introduce || 'default-course.png'}
                            alt="course"
                            style={{
                              width: 40,
                              height: 30,
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 'bold' }}>
                              {option.title}
                            </div>
                            <div style={{ fontSize: '0.8rem' }}>
                              {option.teacher} | {option.courseID}
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Courses"
                        placeholder="Search courses"
                        margin="dense"
                        sx={textFieldStyles}
                      />
                    )}
                    sx={{ marginTop: 1 }}
                  />
                )}

              {newVoucher.is_all_courses && (
                <p
                  style={{
                    color: '#777',
                    fontStyle: 'italic',
                    margin: '1rem 0'
                  }}
                >
                  This voucher will be applicable to all courses.
                </p>
              )}
            </Paper>
          </div>
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
              !newVoucher.voucher_for ||
              !newVoucher.start_date ||
              !newVoucher.end_date ||
              (!newVoucher.is_all_users &&
                newVoucher.voucher_for === 'student' &&
                !newVoucher.users) ||
              (!newVoucher.is_all_courses &&
                newVoucher.voucher_for === 'course' &&
                !newVoucher.courses) ||
              Object.values(validationErrors).some((error) => error)
            }
          >
            Add Voucher
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      {/* <Dialog
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
      </Dialog> */}
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        sx={{
          '& .MuiDialog-paper': {
            ...dialogPaperStyles,
            maxWidth: '500px' // Kích thước phù hợp cho dialog xóa
          }
        }}
      >
        <DialogTitle sx={dialogTitleStyles}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', color: '#ff4d4f' }}>🗑️</span>
            Confirm Delete
          </div>
        </DialogTitle>
        <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
          <Paper
            elevation={0}
            sx={{
              padding: '1.5rem',
              background: 'linear-gradient(to right, #fff1f0, #fff2e8)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #ffccc7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#ff4d4f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <span style={{ fontSize: '20px', color: 'white' }}>!</span>
              </div>
              <div>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '1.6rem',
                    color: '#cf1322',
                    fontWeight: 'bold'
                  }}
                >
                  Are you sure you want to delete this voucher?
                </h4>
                <p
                  style={{
                    margin: '0',
                    color: '#555',
                    fontSize: '1.4rem'
                  }}
                >
                  This action cannot be undone. All data related to voucher{' '}
                  <strong>&quot;{voucherToDelete?.voucher_code}&quot;</strong>{' '}
                  will be permanently removed from the system.
                </p>
              </div>
            </div>
          </Paper>

          {voucherToDelete && (
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0',
                marginBottom: '1rem'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Voucher Information
              </h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p
                    style={{
                      margin: '4px 0',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      color: '#333'
                    }}
                  >
                    {voucherToDelete.voucher_code}
                  </p>
                  <p style={{ margin: '4px 0', color: '#666' }}>
                    Discount:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {voucherToDelete.discount_value}%
                    </span>
                  </p>
                  <p style={{ margin: '4px 0', color: '#666' }}>
                    Valid until:{' '}
                    <span
                      style={{
                        fontWeight: 'bold',
                        color:
                          new Date(voucherToDelete.end_date) > new Date()
                            ? 'green'
                            : '#ff4d4f'
                      }}
                    >
                      {voucherToDelete.end_date.split('T')[0]}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#fff1f0',
                    borderRadius: '4px',
                    color: '#ff4d4f',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    border: '1px solid #ffccc7'
                  }}
                >
                  {voucherToDelete.usage_count} / {voucherToDelete.usage_limit}{' '}
                  used
                </div>
              </div>
            </Paper>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            ...dialogActionsStyles,
            padding: '1rem 2rem 2rem',
            gap: '1.5rem'
          }}
        >
          <Button
            className="btn-cancel"
            onClick={handleCloseDelete}
            sx={{ minWidth: '120px' }}
          >
            Cancel
          </Button>
          <Button
            className="btn-delete"
            onClick={handleConfirmDelete}
            sx={{
              minWidth: '120px',
              backgroundColor: '#ff4d4f',
              '&:hover': {
                backgroundColor: '#ff7875'
              }
            }}
          >
            Delete Voucher
          </Button>
        </DialogActions>
      </Dialog>

      {openSuccess.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="success"
          message={openSuccess.message}
        />
      )}
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
