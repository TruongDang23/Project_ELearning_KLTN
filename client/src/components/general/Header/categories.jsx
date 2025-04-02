import Button from '@mui/material/Button'
import { Menu, MenuItem, ListItemIcon, Divider } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useCategories from '~/constants/listCategories'
import CategoryIcon from '@mui/icons-material/Category'

function Categories() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const anchorRef = useRef(null)
  const categories = useCategories()

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSearch = (category) => {
    navigate(`/course/search/${category}`)
    setAnchorEl(null)
  }

  
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#333',
            textTransform: 'capitalize'
          }}
        >
          Categories
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="composition-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              maxHeight: 300,
              overflowX: 'hidden',
              overflowY: 'auto',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          disableScrollLock={true}
        >
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              sx={{ fontSize: '16px', color: '#333' }}
              onClick={() => handleSearch(category)}
            >
              <ListItemIcon>
                <CategoryIcon fontSize="large" />
              </ListItemIcon>
              {category}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  )
}

export default Categories
