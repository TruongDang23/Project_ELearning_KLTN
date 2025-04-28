import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { admin } from 'api/index'

export default function useVoucher() {
  const [vouchers, setVouchers] = useState([])
  const [allStudents, setAllStudents] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [openSuccess, setOpenSuccess] = useState({
    status: false,
    message: ''
  })
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

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

  const createVoucher = async (voucherData) => {
    try {
      const userIds =
        voucherData.voucher_for === 'student' && !voucherData.is_all_users
          ? voucherData.users.map((user) => user.userID)
          : []

      const courseIds =
        voucherData.voucher_for === 'course' && !voucherData.is_all_courses
          ? voucherData.courses.map((course) => course.courseID)
          : []

      const formattedStartDate = voucherData.start_date
        ? new Date(voucherData.start_date).toISOString().split('T')[0]
        : ''
      const formattedEndDate = voucherData.end_date
        ? new Date(voucherData.end_date).toISOString().split('T')[0]
        : ''

      const response = await admin.createVoucher({
        ...voucherData,
        discount_value: parseInt(voucherData.discount_value),
        usage_limit: parseInt(voucherData.usage_limit),
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
        await loadAllVouchers()
        return true
      } else {
        setOpenError({ status: true, message: 'Failed to add voucher' })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
        return false
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error adding voucher: ' + error.message
      })
      return false
    }
  }

  const updateVoucher = async (voucherCode, voucherData) => {
    console.log('voucherData', voucherData)
    try {
      let userIds = []
      if (voucherData.voucher_for === 'student' && !voucherData.is_all_users) {
        if (
          Array.isArray(voucherData.users) &&
          typeof voucherData.users[0] === 'object'
        ) {
          userIds = voucherData.users.map((user) => user.userID)
        } else if (typeof voucherData.users === 'string') {
          userIds = voucherData.users
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        }
      }

      let courseIds = []
      if (voucherData.voucher_for === 'course' && !voucherData.is_all_courses) {
        if (
          Array.isArray(voucherData.courses) &&
          typeof voucherData.courses[0] === 'object'
        ) {
          courseIds = voucherData.courses.map((course) => course.courseID)
        } else if (typeof voucherData.courses === 'string') {
          courseIds = voucherData.courses
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id)
        }
      }

      const formattedStartDate = voucherData.start_date
        ? new Date(voucherData.start_date).toISOString().split('T')[0]
        : ''
      const formattedEndDate = voucherData.end_date
        ? new Date(voucherData.end_date).toISOString().split('T')[0]
        : ''

      const response = await admin.updateVoucher(voucherCode, {
        ...voucherData,
        discount_value: parseInt(voucherData.discount_value),
        usage_limit: parseInt(voucherData.usage_limit),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        is_all_courses: voucherData.is_all_courses ? true : false,
        is_all_users: voucherData.is_all_users ? true : false,
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
        await loadAllVouchers()
        return true
      } else {
        setOpenError({ status: true, message: 'Failed to update voucher' })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
        return false
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error saving voucher: ' + error.message
      })
      return false
    }
  }

  const deleteVoucher = async (voucherCode) => {
    try {
      const response = await admin.deleteVoucher(voucherCode)
      if (response.status === 204) {
        setOpenSuccess({
          status: true,
          message: `Voucher "${voucherCode}" deleted successfully`
        })
        setVouchers((prev) =>
          prev.filter((voucher) => voucher.voucher_code !== voucherCode)
        )
        return true
      } else {
        setOpenError({ status: true, message: 'Failed to delete voucher' })
        return false
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Error deleting voucher: ' + error.message
      })
      return false
    }
  }

  const generateNewVoucherCode = () => {
    return uuidv4()
  }

  return {
    vouchers,
    allStudents,
    allCourses,
    openSuccess,
    openError,
    setOpenSuccess,
    setOpenError,
    loadAllVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    generateNewVoucherCode
  }
}
