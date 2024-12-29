import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/Logo.png'
import Badge from '@mui/material/Badge'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined' // import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Categories from './categories'
import AvatarAction from './avatar'
import { useState, useContext, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { NotificationContext } from '~/context/NotificationContext'

function Header() {
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams()
  const token = sessionStorage.getItem('token')
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))
  const userID = userData ? userData.userID : ''
  const [title, setTitle] = useState(search.get('q') || '')

  const socket = io('http://localhost:3001')

  // Notification
  const { unreadCount, setUnreadCount } = useContext(NotificationContext)

  useEffect(() => {
    socket.emit('joinGroupIndividual', userID)
    socket.on('unreadCountUpdated', (newUnreadCount) => {
      setUnreadCount(newUnreadCount)
    })

    return () => {
      socket.off('unreadCountUpdated') // Clean up when component unmounts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUnreadCount])

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      navigate({
        pathname: '/course/search',
        search: `?q=${title}`
      })
    }
  }
  // eslint-disable-next-line no-unused-vars
  const [reload, setReload] = useState(false)
  {
    //Chưa login
    if (token == null) {
      return (
        <Navbar>
          <a className="brand" href="/">
            <img src={Logo} alt="Web Logo" />
          </a>
          <div className="navLinks">
            <Categories />
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search for anything"
                value={title ? title : ''}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleSearch}
              />
              <a href={`/course/search?q=${title}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                  alt="Search Icon"
                />
              </a>
            </div>
            {/* <a href="/login" className="link">
              Teach on EL-Space
            </a>
            <a href="/login" className="link">
              My Learning
            </a> */}
          </div>
          <div className="authButtons">
            <Link to="/login">
              <button className="login">Log in</button>
            </Link>

            <Link to="/signup">
              <button className="signup">Sign up</button>
            </Link>
          </div>
        </Navbar>
      )
    }

    //Đã login
    else {
      return (
        <Navbar>
          <a className="brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="navLinks">
            <Categories />
            <div className="searchBox">
              <input
                type="text"
                placeholder="Search for anything"
                value={title ? title : ''}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleSearch}
              />
              <a href={`/course/search?q=${title}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                  alt="Search Icon"
                />
              </a>
            </div>
            {/* <a href="/" className="link">
              Teach on EL-Space
            </a> */}

            {userID[0] === 'S' && (
              <a href="/student/my-learning" className="link">
                My learning
              </a>
            )}
            {/* <a>
              <StyledBadge badgeContent={4} color="primary">
                <ShoppingCartOutlinedIcon />
              </StyledBadge>
            </a> */}
            <a href="/notification">
              <StyledBadge badgeContent={unreadCount} color="primary">
                <NotificationsOutlinedIcon />
              </StyledBadge>
            </a>
            <a>
              <AvatarAction setReload={setReload} />
            </a>
          </div>
        </Navbar>
      )
    }
  }
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #74c0fc;
  box-shadow: 0 2px 4px rgba(44, 130, 201, 0.2);

  .brand {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 100px;
      margin-right: 10px;
    }
  }

  .navLinks {
    display: flex;
    align-items: center;
    gap: 20px;

    .link {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        color: #1971c2;
        transition: all 0.3s;
      }
    }

    .searchBox {
      display: flex;
      font-size: 16px;
      align-items: center;
      padding: 5px 10px;
      border: 1px solid #1971c2;
      border-radius: 5px;
      background-color: #fff;

      input {
        border: none;
        outline: none;
        background: none;
        padding: 5px;
        width: 400px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .authButtons {
    display: flex;
    align-items: center;
    gap: 10px;

    .login,
    .signup {
      padding: 8px 15px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    .login {
      background-color: #fff;
      color: #1971c2;
      border: 2px solid #1971c2;

      &:hover,
      &:visited {
        background-color: #1971c2;
        color: #fff;
        transition: all 0.3s;
      }
    }

    .signup {
      background-color: #1971c2;
      color: #fff;
      border: none;

      &:hover,
      &:visited {
        background-color: #155b96;
        transition: all 0.3s;
      }
    }
  }
`
const StyledBadge = styled(Badge)`
  cursor: pointer;
  color: #555;
  transition: all 0.3s;
  ${'' /* giảm kích thước của badge */}
  .MuiBadge-badge {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 2px;
  }
  .MuiSvgIcon-root {
    width: 2.6rem;
    height: 2.6rem;
    &:hover,
    &:focus {
      color: #1971c2;
      ${'' /* Phóng to một chút */}
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
`

export default Header
