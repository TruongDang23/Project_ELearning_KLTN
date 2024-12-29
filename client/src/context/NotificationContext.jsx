import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const socket = io('http://localhost:3001')
  // Lấy thông tin người dùng từ sessionStorage
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))
  const userID = userData ? userData.userID : ''

  useEffect(() => {
    if (notifications) {
      let count = 0
      notifications.map((notify) => {
        if (notify.isRead === 0)
          count = count + 1
      })
      socket.emit('updateUnreadCount', count, userID)
      setUnreadCount(count)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  useEffect(() => {
    // Hàm lấy dữ liệu thông báo ban đầu từ API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/s/loadNotification',
          {
            params: { userID },
            headers: {
              Token: token,
              User: userAuth
            }
          }
        )
        setNotifications(response.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        // Xử lý các lỗi tương tự như trong code ban đầu
        if (error.message === 'Network Error') navigate('/server-shutdown')
        else if (error.response) {
          const status = error.response.status
          if (status === 500) navigate('/500error')
          if (status === 401) navigate('/401error')
          if (status === 403) navigate('/403error')
        }
      }
    }

    fetchNotifications()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markAsRead = async (notifyID, userID) => {
    try
    {
      const res = await axios.post('http://localhost:3000/s/readNotify',
        {
          userID: userID,
          notifyID: notifyID
        }
      )
      if (res.status === 200)
      {
        //update tooltips notification
        setNotifications((prevNotifications) =>
          prevNotifications.map((notify) =>
            notify.notifyID === notifyID ? { ...notify, isRead: true } : notify
          )
        )
      }
      else
        alert('Read notify failed')
    }
    catch (error) {
      alert('An error occurred while trying to adjust content course.')
    //console.error(error)
    }
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, isLoading, setUnreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
