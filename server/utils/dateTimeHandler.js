import { format } from 'date-fns'
const getCurrentDateTime = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
}

export { getCurrentDateTime }