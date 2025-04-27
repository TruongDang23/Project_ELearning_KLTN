import { useState } from 'react'
import { Button } from '@mui/material'
import { Snackbar } from '~/components/general'

// Import custom hooks
import useVoucherData from '../voucher/useVoucher'
import useVoucherValidation from '../voucher/useVoucherValidation'

// Import components
import VoucherTable from '../voucher/VoucherTable'
import VoucherDetailDialog from '../voucher/VoucherDetailDialog'
import VoucherEditDialog from '../voucher/VoucherEditDialog'
import VoucherAddDialog from '../voucher/VoucherAddDialog'
import VoucherDeleteDialog from '../voucher/VoucherDeleteDialog'

// Import styles
import { VoucherDashboardWrapper } from '../voucher/VoucherStyles'

function VoucherTest() {
  // States for UI control
  const [openDetailDialog, setOpenDetailDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState(null)
  const [editVoucher, setEditVoucher] = useState({})
  const [voucherToDelete, setVoucherToDelete] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
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

  // Use custom hooks
  const {
    vouchers,
    allStudents,
    allCourses,
    openSuccess,
    openError,
    setOpenSuccess,
    setOpenError,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    generateNewVoucherCode
  } = useVoucherData()

  const { validationErrors, validateVoucher } = useVoucherValidation()

  // Handlers for dialog operations
  const handleOpenDetail = (voucher) => {
    setSelectedVoucher(voucher)
    setOpenDetailDialog(true)
  }

  const handleCloseDetail = () => {
    setOpenDetailDialog(false)
    setSelectedVoucher(null)
  }

  const handleOpenEdit = (voucher) => {
    const userObjects = voucher.users.map((user) => {
      return (
        allStudents.find((student) => student.userID === user.userID) || user
      )
    })

    let courseObjects = []
    if (voucher.courses && voucher.courses.length > 0) {
      const isCourseObject = typeof voucher.courses[0] === 'object'
      courseObjects = voucher.courses.map((course) => {
        const courseId = isCourseObject ? course.courseID : course
        const foundCourse = allCourses.find((c) => c.courseID === courseId)
        return (
          foundCourse || {
            courseID: courseId,
            title: `Course ${courseId}`,
            teacher: 'Unknown',
            method: 'Unknown',
            program: 'Unknown',
            image_introduce: 'default-course.png'
          }
        )
      })
    }

    setSelectedStudents(userObjects)
    setSelectedCourses(courseObjects)
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
      voucher_code: generateNewVoucherCode(),
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

  // Handlers for form changes
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditVoucher((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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
    validateVoucher({
      ...newVoucher,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Action handlers
  const handleSaveEdit = async () => {
    if (!validateVoucher(editVoucher)) {
      setOpenError({ status: true, message: 'Please fix validation errors' })
      return
    }
    const success = await updateVoucher(editVoucher.voucher_code, editVoucher)
    if (success) {
      handleCloseEdit()
    }
  }

  const handleAddVoucher = async () => {
    if (!validateVoucher(newVoucher)) {
      setOpenError({ status: true, message: 'Please fix validation errors' })
      return
    }
    const success = await createVoucher(newVoucher)
    if (success) {
      handleCloseAdd()
    }
  }

  const handleConfirmDelete = async () => {
    if (voucherToDelete) {
      const success = await deleteVoucher(voucherToDelete.voucher_code)
      if (success) {
        handleCloseDelete()
      }
    }
  }

  // Add this to your component
  const handleStudentSelectionChange = (event, newValue) => {
    setSelectedStudents(newValue)
    // Update editVoucher to match selected students
    setEditVoucher((prev) => ({
      ...prev,
      users: newValue
    }))
  }

  const handleCourseSelectionChange = (event, newValue) => {
    setSelectedCourses(newValue)
    // Update editVoucher to match selected courses
    setEditVoucher((prev) => ({
      ...prev,
      courses: newValue
    }))
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

      <VoucherTable
        vouchers={vouchers}
        onViewDetails={handleOpenDetail}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      <VoucherDetailDialog
        open={openDetailDialog}
        onClose={handleCloseDetail}
        voucher={selectedVoucher}
      />

      <VoucherEditDialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        voucher={editVoucher}
        handleChange={handleEditChange}
        handleSave={handleSaveEdit}
        validationErrors={validationErrors}
        allStudents={allStudents}
        allCourses={allCourses}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        setEditVoucher={setEditVoucher}
      />

      <VoucherAddDialog
        open={openAddDialog}
        onClose={handleCloseAdd}
        voucher={newVoucher}
        handleChange={handleNewChange}
        handleAdd={handleAddVoucher}
        validationErrors={validationErrors}
        allStudents={allStudents}
        allCourses={allCourses}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        setNewVoucher={setNewVoucher}
      />

      <VoucherDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        voucher={voucherToDelete}
        onConfirmDelete={handleConfirmDelete}
      />

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

export default VoucherTest
