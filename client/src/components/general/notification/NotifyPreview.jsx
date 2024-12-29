/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import Avatar from '@mui/material/Avatar'
import { formatDistanceToNow } from 'date-fns'

function NotifyPreview({ notify, onClick }) {
  const { notifyID, title, message, routing, isRead, image_course, time } =
    notify

  const timeAgo = formatDistanceToNow(new Date(time), {
    addSuffix: true
  })

  return (
    <NotifyPreviewWrapper onClick={onClick}>
      <div className={`notification-item ${!isRead ? 'not-read' : ''}`}>
        <div className="notification-item__avatar">
          <img alt={title} src={image_course} />
        </div>
        <div className="notification-item__content">
          <h3 className="notification-item__title">{title}</h3>
          {/* <p className="notification-item__message">{message}</p> */}
          <span className="notification-item__date">{timeAgo}</span>
        </div>
      </div>
    </NotifyPreviewWrapper>
  )
}

const NotifyPreviewWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;

  .notification-item {
    display: flex;
    gap: 3.2rem;
    align-items: center;
    width: 100%;
    padding: 1.6rem;
    translate: all 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #e0e0e0;
      translate: all 0.3s;
    }
    &.not-read {
      border-left: 4px solid #1971c2;
    }

    .notification-item__avatar {
      padding: 2px;
      .MuiAvatar-root {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
      }

      img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .notification-item__content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .notification-item__title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #333;
      }

      .notification-item__message {
        font-size: 1.4rem;
        color: #666;
      }

      .notification-item__date {
        font-size: 1.4rem;
        font-weight: 600;
        color: #999;
      }
    }
  }
`

export default NotifyPreview
