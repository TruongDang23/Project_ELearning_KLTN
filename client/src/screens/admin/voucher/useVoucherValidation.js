import { useState } from 'react'

export default function useVoucherValidation() {
  const [validationErrors, setValidationErrors] = useState({
    discount_value: '',
    usage_limit: '',
    start_date: '',
    end_date: '',
    voucher_for: '',
    targeting: ''
  })

  const validateVoucher = (voucher) => {
    const errors = {
      discount_value: '',
      usage_limit: '',
      start_date: '',
      end_date: '',
      voucher_for: '',
      targeting: ''
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

    // Validate voucher_for and targeting consistency
    if (voucher.voucher_for === 'student') {
      // If voucher is for students, it should not have course targeting enabled
      if (
        voucher.is_all_courses ||
        (Array.isArray(voucher.courses) && voucher.courses.length > 0)
      ) {
        errors.targeting =
          'Student vouchers cannot have course targeting enabled'
        isValid = false
      }
    } else if (voucher.voucher_for === 'course') {
      // If voucher is for courses, it should not have student targeting enabled
      if (
        voucher.is_all_users ||
        (Array.isArray(voucher.users) && voucher.users.length > 0)
      ) {
        errors.targeting =
          'Course vouchers cannot have student targeting enabled'
        isValid = false
      }
    } else if (voucher.voucher_for) {
      // If voucher_for is provided but not valid
      errors.voucher_for = 'Please select a valid voucher type'
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  return { validationErrors, validateVoucher }
}
