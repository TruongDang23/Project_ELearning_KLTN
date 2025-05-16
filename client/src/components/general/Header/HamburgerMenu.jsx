import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

function HamburgerMenu({ links }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(isOpen)
  }

  const handleNavigation = (link) => {
    if (link.action) {
      link.action()
    } else {
      navigate(link.path)
    }
    setOpen(false)
  }

  return (
    <HamburgerMenuStyles>
      <IconButton
        color="inherit"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ '&:hover': { color: '#1971c2' } }}
      >
        <MenuIcon />
      </IconButton>
      <StyledDrawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <StyledList>
            {links.map((link, index) => (
              <StyledListItem
                button
                key={index}
                onClick={() => handleNavigation(link)}
              >
                <StyledListItemText primary={link.text} />
              </StyledListItem>
            ))}
          </StyledList>
        </Box>
      </StyledDrawer>
    </HamburgerMenuStyles>
  )
}

const HamburgerMenuStyles = styled.div``

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    border-right: none;
  }
`

const StyledList = styled(List)`
  padding: 16px 0;
`

const StyledListItem = styled(ListItem)`
  padding: 12px 24px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e3f2fd;
    transform: translateX(5px);
  }

  &.Mui-selected {
    background-color: #1971c2;
    color: #fff;

    &:hover {
      background-color: #155b96;
    }
  }
`

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-size: 1.6rem;
    font-weight: 500;
    color: #333;
  }

  ${StyledListItem}:hover & .MuiTypography-root {
    color: #1971c2;
  }

  ${StyledListItem}.mui-selected & .MuiTypography-root {
    color: #fff;
  }
`

export default HamburgerMenu
