import React, { useEffect, useState } from 'react'
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  HelpOutline as HelpOutlineIcon,
  Settings,
  Logout,
  AccountBoxOutlined as AccountBoxOutlinedIcon,
  SpaceDashboardOutlined as SpaceDashboardOutlinedIcon,
  BorderColorOutlined as BorderColorOutlinedIcon
} from '@mui/icons-material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AvatarAction({ setReload }) {
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))

  const userID = userData ? userData.userID : ''
  const [avt, setAvt] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3000/s/loadAvatar', {
        params: { userID },
        headers: { Token: token, User: userAuth }
      })
      .then((response) => setAvt(response.data))
      .catch((error) => {
        const status = error.response?.status
        if (error.message === 'Network Error') navigate('/server-shutdown')
        else if (status === 500) navigate('/500error')
        else if (status === 401) navigate('/401error')
        else if (status === 403) navigate('/403error')
      })
  }, [token, userAuth, userID, navigate])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    sessionStorage.clear()
    setReload(true)
    navigate('/')
  }

  const menuItems = [
    userID[0] === 'A' && {
      text: 'Dashboard',
      icon: <SpaceDashboardOutlinedIcon fontSize="large" />,
      action: () => navigate('/Admin/dashboard')
    },
    userID[0] === 'I' && {
      text: 'Manage Courses',
      icon: <ManageSearchIcon fontSize="large" />,
      action: () => navigate('/instructor/manageCourse')
    },
    userID[0] === 'I' && {
      text: 'Design Course',
      icon: <DesignServicesIcon fontSize="large" />, // Sử dụng icon phù hợp
      action: () => navigate('/instructor/designCourse') // Thay đường dẫn cho phù hợp
    },
    {
      text: 'My Profile',
      icon: <AccountBoxOutlinedIcon fontSize="large" />,
      action: () =>
        navigate(
          userID[0] === 'S'
            ? '/Student/profile'
            : userID[0] === 'I'
            ? '/Instructor/profile'
            : '/Admin/profile'
        )
    },
    {
      text: 'Edit Profile',
      icon: <BorderColorOutlinedIcon fontSize="large" />,
      action: () =>
        navigate(
          userID[0] === 'S'
            ? '/Student/information'
            : userID[0] === 'I'
            ? '/Instructor/information'
            : '/Admin/information'
        )
    }
  ].filter(Boolean) // Loại bỏ các mục null hoặc undefined

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Information">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 35,
                height: 35,
                cursor: 'pointer',
                border: '2px solid #1971c2',
                marginLeft: '-20px'
              }}
              src={avt}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock={true}
      >
        {menuItems.map(({ text, icon, action }, index) => (
          <MenuItem
            key={index}
            sx={{ fontSize: '16px', color: '#333' }}
            onClick={action}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            {text}
          </MenuItem>
        ))}
        <Divider />
        {/* <MenuItem
          sx={{ fontSize: '16px', color: '#333' }}
          onClick={handleClose}
        >
          <ListItemIcon>
            <HelpOutlineIcon fontSize="large" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem
          sx={{ fontSize: '16px', color: '#333' }}
          onClick={handleClose}
        >
          <ListItemIcon>
            <Settings fontSize="large" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          sx={{ fontSize: '16px', color: '#333' }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="large" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
