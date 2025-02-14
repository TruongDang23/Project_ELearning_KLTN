import PayOS from '@payos/node'

const payos = new PayOS(process.env.PAYOS_CLIENT_ID, process.env.PAYOS_API_KEY, process.env.PAYOS_CHECKSUM_KEY)

const createPayment = async() => {
  const request = {
    orderCode: 1134234,
    amount: 1000,
    description: "Thanh toan don hang",
    items: [
      {
        name: "Mì tôm hảo hảo ly",
        quantity: 1,
        price: 1000,
      }
    ],
    cancelUrl: "https://your-domain.com",
    returnUrl: "https://your-domain.com"
  }
  return await payos.createPaymentLink(request)
}

const cancelPayment = async() => {
  return await payos.cancelPaymentLink(234234)
}
export { createPayment, cancelPayment }