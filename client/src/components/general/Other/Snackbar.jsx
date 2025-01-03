import { Snackbar, Alert } from '@mui/material'
import { useState } from 'react'

function SnackbarCustom({ vertical, horizontal, severity, message }) {
  const [open, setOpen] = useState(true); // Add state to control `open`

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Prevent auto-hide when the user clicks elsewhere
    }
    setOpen(false); // Close the Snackbar
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose} // Handle auto-hide
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleClose} // Optional: Add close icon if needed
        sx={{
          width: "100%",
          fontSize: "1.6rem"
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarCustom