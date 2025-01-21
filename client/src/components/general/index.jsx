import Header from './Header/header'
import Footer from './Footer/FooterNew'
import Notification from './notification/Notication'
import SnackbarCustom from './Other/Snackbar'
export function GeneralHeader() {
  return (
    <Header />
  )
}

export function GeneralFooter() {
  return <Footer />
}

export function Notify() {
  return <Notification />
}

export function Snackbar({ vertical, horizontal, severity, message }) {
  return <SnackbarCustom vertical={vertical} horizontal={horizontal} severity={severity} message={message}/>
}