import { Box, Snackbar, IconButton } from '@mui/material'
import { useState, useEffect } from "react"
import CloseIcon from '@mui/icons-material/Close'
import io from 'socket.io-client'

function SnackbarCustom() {
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))
  const userID = userData ? userData.userID : ''
  const socket = io('http://localhost:3001')

  socket.emit('joinGroupIndividual', userID)
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false })
  }
  // Lắng nghe sự kiện 'receiveNewNotify' từ server
  useEffect(() => {

    socket.on('receiveNewNotify', () => {
      // Cập nhật state để hiển thị thông báo với message từ server
      setState({
        open: true,
        vertical: 'bottom',
        horizontal: 'right'
      })
    })

    // Cleanup khi component unmount
    return () => {
      socket.off('receiveNewNotify') // Hủy bỏ listener khi component bị unmount
    }
  }, [socket])

  return (
    <>
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Bạn có một thông báo mới"
          key={vertical + horizontal}
          action={
            <IconButton
              size="medium"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            '& .MuiSnackbarContent-root': {
              width: '300px',
              height: '50px',
              fontSize: '1.6rem',
              backgroundColor: '#187bce',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
        />
      </Box>
    </>
  )
}

export default SnackbarCustom