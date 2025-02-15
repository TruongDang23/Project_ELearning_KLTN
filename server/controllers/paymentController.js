import PayOS from '@payos/node'

const payos = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY)

const createPayment = async(request) => {
  return await payos.createPaymentLink(request)
}

const cancelPayment = async(orderCode) => {
  return await payos.cancelPaymentLink(orderCode)
}
export { createPayment, cancelPayment }