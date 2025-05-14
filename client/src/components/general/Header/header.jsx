import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/Logo.png'
import Badge from '@mui/material/Badge'
import HamburgerMenu from './HamburgerMenu'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import Categories from './categories'
import AvatarAction from './avatar'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { notifyStore } from '~/context/NotifyStore'
import useNavigation from '~/utils/navigate'
import { anonymous, socket } from 'api'
import { useMediaQuery } from '@mui/material'
import { globalFlag } from '~/context/GlobalFlag'
import { userStore } from '~/context/UserStore'

function Header() {
  const navigate = useNavigate()
  const unread = notifyStore((state) => state.unreadCount)
  const [search, setSearch] = useSearchParams()
  const userID = localStorage.getItem('userID')
  const [title, setTitle] = useState(search.get('q') || '')
  const reloadVoiceFlow = globalFlag((state) => state.setReloadVoiceflow)
  const { resetInfor } = userStore()
  const { goTo } = useNavigation()
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      navigate({
        pathname: '/course/search',
        search: `?q=${title}`
      })
    }
  }

  useEffect(() => {
    const handleIncreaseUnread = () => {
      notifyStore.getState().newNotify()
    }

    socket.on('increaseUnread', handleIncreaseUnread)

    return () => {
      socket.off('increaseUnread', handleIncreaseUnread) // Remove listener on unmount
    }
  }, [])
  // eslint-disable-next-line no-unused-vars
  const [reload, setReload] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')

  const handleLogout = async () => {
    localStorage.clear()
    await anonymous.logOut()
    reloadVoiceFlow()
    resetInfor()
    setReload(true)
    window.location.href = '/'
  }

  {
    //Chưa login
    if (userID == null) {
      const mobileLinks = [
        { text: 'Home', path: '/' },
        { text: 'Search', path: `/course/search?q=${title}` },
        { text: 'Teach on EL-Space', path: '/login' },
        { text: 'Login', path: '/login' },
        { text: 'Sign up', path: '/signup' }
      ]
      return (
        <Navbar>
          <a className="brand" href="/">
            <img src={Logo} alt="Web Logo" />
          </a>
          {isMobile ? (
            <HamburgerMenu links={mobileLinks} />
          ) : (
            <>
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
                <a href="/login" className="link">
                  Teach on EL-Space
                </a>
                <a href="/login" className="link">
                  My Learning
                </a>
              </div>

              <div className="authButtons">
                <Link to="/login">
                  <button className="login">Log in</button>
                </Link>

                <Link to="/signup">
                  <button className="signup">Sign up</button>
                </Link>
              </div>
            </>
          )}
        </Navbar>
      )
    }

    //Đã login
    else {
      let mobileLinks = [
        { text: 'Home', path: '/' },
        { text: 'Search', path: `/course/search?q=${title}` },
        { text: 'Notifications', path: '/notification' }
      ]

      if (userID[0] === 'S') {
        // Student links
        mobileLinks = [
          ...mobileLinks,
          { text: 'My Learning', path: '/student/my-learning' },
          { text: 'My Profile', path: '/Student/profile' },
          { text: 'Edit Profile', path: '/Student/information' }
        ]
      } else if (userID[0] === 'I') {
        // Instructor links
        mobileLinks = [
          ...mobileLinks,
          { text: 'Manage Courses', path: '/instructor/manageCourse' },
          { text: 'Design Course', path: '/instructor/designCourse' },
          { text: 'My Profile', path: '/Instructor/profile' },
          { text: 'Edit Profile', path: '/Instructor/information' }
        ]
      } else if (userID[0] === 'A') {
        // Admin links
        mobileLinks = [
          ...mobileLinks,
          { text: 'Dashboard', path: '/Admin/dashboard' },
          // { text: 'My Profile', path: '/Admin/profile' },
          { text: 'Edit Profile', path: '/Admin/information' }
        ]
      }

      // Add logout as the final option for all user types
      mobileLinks.push({ text: 'Logout', path: '#', action: handleLogout })
      return (
        <Navbar>
          <a className="brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          {isMobile ? (
            <HamburgerMenu links={mobileLinks} />
          ) : (
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

              {userID[0] === 'S' && (
                <a
                  href="#"
                  className="link"
                  onClick={() => goTo('/student/my-learning')}
                >
                  My learning
                </a>
              )}
              <a href="#" onClick={() => goTo('/notification')}>
                <StyledBadge badgeContent={unread} color="primary">
                  <NotificationsOutlinedIcon />
                </StyledBadge>
              </a>
              <a>
                <AvatarAction setReload={setReload} />
              </a>
            </div>
          )}
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
    z-index: 1600;
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
