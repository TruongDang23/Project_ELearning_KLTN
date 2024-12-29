import Header from './Header/header'
import Footer from './Footer/FooterNew'
import Notification from './notification/Notication'
import { NotificationProvider } from '../../context/NotificationContext'
import SnackbarCustom from './Other/Snackbar'
export function GeneralHeader() {
  return (
    <NotificationProvider>
      <Header />
    </NotificationProvider>
  )
}

export function GeneralFooter() {
  return <Footer />
}

export function Notify() {
  return <Notification />
}

export function Snackbar() {
  return <SnackbarCustom/>
}