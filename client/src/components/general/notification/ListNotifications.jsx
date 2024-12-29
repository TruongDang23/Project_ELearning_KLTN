import styled from 'styled-components'
import NotifyPreview from './NotifyPreview'
import { useState, useContext } from 'react'
import Loading from '~/screens/system/Loading'

import { NotificationContext } from '~/context/NotificationContext'

function ListNotifications() {
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))

  const userID = userData ? userData.userID : ''

  const { notifications, isLoading, markAsRead, unreadCount } =
    useContext(NotificationContext)
  const [selectedNotify, setSelectedNotify] = useState(null)

  const handleSelectNotify = async (notify) => {
    setSelectedNotify(notify)
    if (!notify.isRead) {
      markAsRead(notify.notifyID, userID)
    }
  }

  const handleClick = (courselink) => {
    const url = courselink
    window.open(url, '_blank')
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <NotificationWrapper className="container">
      <h2 className="heading-tertiary">Notifications</h2>
      <div className="notifications">
        <div className="notification-list">
          {notifications.length === 0 ? (
            <p>Không có thông báo nào.</p>
          ) : (
            notifications.map((notify) => (
              <NotifyPreview
                key={notify.notifyID}
                notify={notify}
                className="notification-item"
                onClick={() => handleSelectNotify(notify)}
              />
            ))
          )}
        </div>
        <div className="notification-content">
          {selectedNotify ? (
            <>
              <h3>{selectedNotify.title}</h3>
              <p>{selectedNotify.message}</p>
              <p>{new Date(selectedNotify.time).toLocaleString()}</p>
              <a
                onClick={() => handleClick(selectedNotify.routing)}
                style={{ color: 'inherit' }} // Sử dụng style trực tiếp nếu bạn không sử dụng prop color
              >
                Go to Q&A
              </a>
            </>
          ) : (
            <p className="no-select">
              Select a notification to see the details
            </p>
          )}
        </div>
      </div>
    </NotificationWrapper>
  )
}

const NotificationWrapper = styled.section`
  .notifications {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 4.8rem;
  }

  .heading-tertiary {
    padding-top: 4rem;
  }
  h2 {
    font-size: 3.6rem;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
  .notification-list {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 60vh;
    ${'' /* làm thanh cuộn  */}
    overflow-y: auto;

    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
  }
  .notification-item {
    background-color: #fff;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
  }
  .notification-content {
    padding: 1.6rem;
    background-color: #fff;
    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
    a {
      display: block;
      font-size: 1.6rem;
      color: #1971c2;
      margin-top: 1.6rem;
      text-decoration: none;
      transition: all 0.3s ease; /* Thêm hiệu ứng chuyển đổi */
      cursor: pointer;
      &:hover {
        color: #187BCE;
        font-size: 1.8rem; /* Kích thước chữ lớn hơn khi hover */
      }
    }
    .no-select {
      font-size: 1.6rem;
      color: #333;
      text-align: center;
    }
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1.6rem;
    color: #333;
  }

  p {
    font-size: 1.4rem;
    color: #333;
    line-height: 1.6;
  }

  @media (max-width: 1400px) {
    .notifications {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .notifications {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .notification-list {
      height: auto;
    }
  }
`

export default ListNotifications
