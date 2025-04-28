import PayOS from '@payos/node'

const payos = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY)

const createPayment = async(request) => {
  return await payos.createPaymentLink(request)
}

const cancelPayment = async(orderCode) => {
  return await payos.cancelPaymentLink(orderCode)
}

const logPayment = async(mysqlTransaction, data) => {
  // data.description = CS0XE9U0GL7 S000 thanh toan C019
  const regexUserID = /\bS\d{3}\b/
  const regexCourseID = /\bC\d{3}\b/

  const userID = data.description.match(regexUserID)?.[0] || null
  const courseID = data.description.match(regexCourseID)?.[0] || null

  let query = `INSERT INTO 
                log_payments (order_code, account_number, amount, payment_link_id,
                              description, reference, paid_by, paid_for, transaction_time) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) `
  try {
    await mysqlTransaction.query(query,
      [
        data.orderCode,
        data.accountNumber,
        data.amount,
        data.paymentLinkId,
        data.description,
        data.reference,
        userID,
        courseID,
        data.transactionDateTime
      ])
  }
  catch (error) {
    throw new Error(error)
  }
}
export { createPayment, cancelPayment, logPayment }