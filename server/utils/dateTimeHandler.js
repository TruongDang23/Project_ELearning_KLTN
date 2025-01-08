import { format } from 'date-fns'
const getCurrentDateTime = () => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss')
}

//Function format 1981-05-11T17:00:00.000Z to 1981-05-12
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

//Function format 1981-05-11T17:00:00.000Z to 1981-05-12 12:00:00
const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export { getCurrentDateTime, formatDate, formatDateTime }