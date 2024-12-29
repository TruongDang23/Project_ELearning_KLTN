import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import QueryStatsIcon from '@mui/icons-material/QueryStats'

import InforDashboard from './InforDashboard'
import AccountDashboard from './AccountDashboard'
import CourseDashboard from './CourseDashboard'
import LogoAdmin from '../../../assets/LogoAdmin.png'
import GeneralDashboard from './GeneralDashboard'
import StatisticsDashboard from './StatisticsDashboard'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

function DashboardAdmin() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [content, setContent] = useState('General')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | EL-Space</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ bgcolor: '#fff', color: '#333' }}
        >
          <Toolbar>
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' })
                }}
              >
                <MenuIcon sx={{ fontSize: 30, color: '#155b96' }} />
              </IconButton>
              <Typography
                variant="h3"
                noWrap
                component="div"
                sx={{ fontSize: '2rem', fontWeight: '700', color: '#002f6c' }}
              >
                Admin Dashboard
              </Typography>
            </>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              width: 100,
              background: 'linear-gradient(to right, #155b96, #002f6c)',
              color: '#fff'
            }
          }}
        >
          <DrawerHeader
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px'
            }}
          >
            <Link href="/" underline="none">
              <Box
                display="flex"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
              >
                <img
                  src={LogoAdmin}
                  alt="Web Logo"
                  style={{ width: '150px' }}
                />
              </Box>
            </Link>
            <IconButton onClick={handleDrawerClose} sx={{ fontSize: 40 }}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon sx={{ fontSize: 30, color: '#fff' }} />
              ) : (
                <ChevronLeftIcon sx={{ fontSize: 30, color: '#fff' }} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              {
                text: 'General',
                icon: <AutoAwesomeMosaicIcon sx={{ fontSize: 35 }} />
              },
              {
                text: 'Information',
                icon: <ManageAccountsIcon sx={{ fontSize: 35 }} />
              },
              {
                text: 'Account',
                icon: <SupervisorAccountIcon sx={{ fontSize: 35 }} />
              },
              {
                text: 'Courses',
                icon: <OndemandVideoIcon sx={{ fontSize: 35 }} />
              },
              {
                text: 'Statistics',
                icon: <QueryStatsIcon sx={{ fontSize: 35 }} />
              }
            // eslint-disable-next-line no-unused-vars
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  onClick={() => handleContentChange(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#ffffff4d',
                      borderLeft: '4px solid #fff'
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#ffffff4d',
                      borderLeft: '4px solid #fff'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{
                      fontSize: '1.6rem',
                      fontWeight: '700'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {content === 'General' && <GeneralDashboard />}
          {content === 'Information' && <InforDashboard />}
          {content === 'Account' && <AccountDashboard />}
          {content === 'Courses' && <CourseDashboard />}
          {content === 'Statistics' && <StatisticsDashboard />}
        </Box>
      </Box>
    </>
  )
}

export default DashboardAdmin
