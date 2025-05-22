import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Paper
} from '@mui/material'
import { StudentClient } from 'api/studentClient'
import { InstructorClient } from 'api/instructorClient'
import { useNavigate } from 'react-router-dom'

const dialogTitleStyles = {
  fontFamily: "'Inter', 'Arial', sans-serif",
  fontSize: '1.8rem',
  fontWeight: 600,
  color: 'rgb(52, 71, 103)',
  padding: '1.5rem 2rem',
  borderBottom: '1px solid rgba(52, 71, 103, 0.1)'
}

export const textFieldStyles = {
  '& .MuiInputBase-root': {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.4rem',
    color: 'rgb(52, 71, 103)',
    borderRadius: '0.5rem',
    background: 'rgba(255, 255, 255, 1)',
    '&:hover': {
      background: 'rgba(52, 71, 103, 0.05)'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(52, 71, 103, 0.3)',
    borderWidth: '1px'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(52, 71, 103)'
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(52, 71, 103)',
    borderWidth: '2px'
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.4rem',
    color: 'rgb(52, 71, 103)',
    '&.Mui-focused': {
      color: 'rgb(52, 71, 103)'
    }
  },
  '& .MuiInputBase-multiline': {
    padding: '0.5rem'
  },
  '& .Mui-error': {
    fontSize: '1.4rem'
  },
  '& .MuiFormHelperText-root': {
    fontSize: '1.2rem',
    marginTop: '6px'
  }
}

const dialogContentStyles = {
  minWidth: 350,
  padding: '1.5rem 2rem'
}

const dialogActionsStyles = {
  display: 'flex',
  width: '100%',
  gap: '3rem',
  '.btn-save, .btn-cancel, .btn-delete': {
    padding: '0.5rem 1rem',
    fontSize: '1.6rem',
    fontWeight: 600,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  '.btn-save': {
    backgroundColor: '#0f4e8b',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#1971c2'
    }
  },
  '.btn-cancel': {
    backgroundColor: '#fff',
    color: '#1971c2',
    outline: 'none',
    border: 'none',
    boxShadow: 'inset 0 0 0 2px #1971c2',
    '&:hover': {
      backgroundColor: '#1971c2',
      color: '#fff'
    }
  },
  '.btn-delete': {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff7875'
    }
  }
}

function ChangePasswordDialog({ open, onClose, userID }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setMessageType('error')
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match!')
      setMessageType('error')
      return
    }
    setLoading(true)
    const client = new InstructorClient()
    const res = await client.changePassword(userID, oldPassword, newPassword)

    if (res.status === 200) {
      if (res?.response?.data?.message) {
        setMessage(res.response.data.message)
      } else setMessage('Change password successfully!.')
      setMessageType('success')
    } else if (res.status === 400) {
      if (res?.response?.data?.error) {
        setMessage(res.response.data.error)
      } else {
        setMessage('Change password failed!')
      }
      setMessageType('error')
    } else {
      setMessage('An error occurred while changing password!')
      setMessageType('error')
    }

    setLoading(false)
    if (messageType === 'success') {
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const handleClose = () => {
    setMessage('')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={dialogTitleStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px', color: '#1971c2' }}>✏️</span>
          Change Password
        </div>
      </DialogTitle>
      <DialogContent sx={dialogContentStyles}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            margin="normal"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{
              ...textFieldStyles,
              '& .MuiInputBase-root': {
                ...textFieldStyles['& .MuiInputBase-root'],
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: '#0f4e8b',
                backgroundColor: 'transparent'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            required
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              ...textFieldStyles,
              '& .MuiInputBase-root': {
                ...textFieldStyles['& .MuiInputBase-root'],
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: '#0f4e8b',
                backgroundColor: 'transparent'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              ...textFieldStyles,
              '& .MuiInputBase-root': {
                ...textFieldStyles['& .MuiInputBase-root'],
                fontSize: '1.6rem',
                fontWeight: 'bold',
                color: '#0f4e8b',
                backgroundColor: 'transparent'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            required
          />
          {message && (
            <Paper
              sx={{
                padding: '0.8rem 1.2rem',
                background: messageType === 'success' ? '#e6ffed' : '#fff1f0',
                borderRadius: '8px',
                margin: '1rem 0',
                fontSize: '1.6rem',
                border:
                  messageType === 'success'
                    ? '1px solid #b7eb8f'
                    : '1px solid #ffccc7'
              }}
              elevation={0}
            >
              <Typography
                sx={{ fontSize: '1.6rem' }}
                color={messageType === 'success' ? 'green' : 'error'}
              >
                {message}
              </Typography>
            </Paper>
          )}
          <DialogActions sx={dialogActionsStyles}>
            <Button onClick={handleClose} className="btn-cancel">
              Cancel
            </Button>
            <Button type="submit" className="btn-save" disabled={loading}>
              {loading ? 'Changing password' : 'Change Password'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordDialog
