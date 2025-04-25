import styled from 'styled-components'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AssignmentIcon from '@mui/icons-material/Assignment'
import QuizIcon from '@mui/icons-material/Quiz'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { BuyCourse } from '~/components/popup'
import { useState } from 'react'
import { student } from 'api'

function SideBar({ inforCourseData }) {
  const [openPub, setopenPub] = useState(false)
  const [statusBuy, setStatus] = useState('')
  const [voucherCode, setVoucherCode] = useState('')
  const cancel_url = window.location.href
  const return_url = `${window.location.origin}/student/my-learning#`
  const toggleBuy = (status) => {
    setStatus(status)
    setopenPub(!openPub)
  }

  const { courseID } = useParams()
  const handleBuyCourse = async () => {
    if (inforCourseData.price == 0) {
      //If course is free => call API buyCourse to insert directly into database table
      const res = await student.buyCourse(courseID)
      if (res.data.message === 'enrolled') {
        toggleBuy('enrolled')
      } else if (res.data.message === 'created') {
        toggleBuy('created')
      }
    } else {
      //If course is not free => Open link payment
      const res = await student.payment(courseID, cancel_url, return_url, voucherCode)
      if (res.data.message === 'enrolled') {
        toggleBuy('enrolled')
      } else {
        window.open(
          res.data.message.checkoutUrl,
          '_blank',
          'noopener,noreferrer'
        )
      }
    }
  }

  const handleVoucherChange = (e) => {
    setVoucherCode(e.target.value)
  }

  const handleApplyVoucher = () => {
    // Placeholder for voucher application logic
    console.log('Applying voucher:', voucherCode)
  }

  return (
    <>
      <SideBarWrapper>
        {/* Video */}
        <div className="sidebar-video">
          <iframe
            title="Course Introduction"
            src={inforCourseData.video_introduce}
          ></iframe>
        </div>
        <div className="sidebar-detail">
          <ul>
            <li>
              <VideoLibraryIcon />
              <span>{inforCourseData.videos} videos</span>
            </li>
            <li>
              <AssignmentIcon />
              <span>{inforCourseData.num_lecture} lectures</span>
            </li>
            <li>
              <QuizIcon />
              <span>Quizzes</span>
            </li>
            <li>
              <LocalAtmIcon />
              <span>
                {inforCourseData.price == 0
                  ? 'Free'
                  : `$${inforCourseData.price}`}
              </span>
            </li>
          </ul>
        </div>
        <div className="sidebar-buttons">
          {inforCourseData.price > 0 && (
            <div className="voucher-input-container">
              <input
                type="text"
                placeholder="Enter Coupon"
                value={voucherCode}
                onChange={handleVoucherChange}
                className="voucher-input"
              />
              <button
                className="voucher-apply-button"
                onClick={handleApplyVoucher}
              >
                Apply
              </button>
            </div>
          )}
          <button
            className="sidebar-button button-buy"
            onClick={handleBuyCourse}
          >
            Buy now
          </button>
          <Link to={`/course/details/${inforCourseData.courseID}`}>
            <button className="sidebar-button button-goto">Go to course</button>
          </Link>
        </div>
      </SideBarWrapper>
      {openPub && <BuyCourse handleClose={toggleBuy} status={statusBuy} />}
    </>
  )
}

const SideBarWrapper = styled.aside`
  align-self: start;
  padding: 20px;
  height: auto-fit;
  color: #fff;
  background-color: #2d2f31;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  .sidebar-video {
    iframe {
      width: 100%;
      height: 200px;
      transition: transform 0.3s ease-in-out;
      border-radius: 5px;
      animation: fadeIn 1s ease-in-out;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .sidebar-detail {
    margin-top: 20px;
    padding: 0px 20px;
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      list-style: none;
      padding: 0;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 1.6rem;
        svg {
          margin-right: 10px;
          font-size: 2rem;
          color: #1971c2;
          transition: transform 0.3s ease, color 0.3s ease;
        }
        &:hover {
          svg {
            transform: scale(1.2);
            color: #0c47a1;
          }
        }
        animation: fadeInUp 0.7s ease-in-out;
      }
    }
  }

  .sidebar-buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .sidebar-button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      animation: fadeInUp 0.8s ease-in-out;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .button-buy {
      background-color: #1971c2;
      color: white;
      &:hover {
        background-color: #155b96;
      }
    }

    .button-goto {
      background-color: #e59819;
      width: 100%;
      color: white;
      &:hover {
        background-color: #c87f0a;
      }
    }

    .voucher-input-container {
      display: flex;
      gap: 10px;
      animation: fadeInUp 0.9s ease-in-out;

      .voucher-input {
        flex: 1;
        padding: 10px;
        font-size: 1.6rem;
        color: #1c2526;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s ease, transform 0.3s ease;

        &::placeholder {
          color: #999;
        }

        &:hover {
          border-color: #a1a1a1;
          transform: translateY(-2px);
        }

        &:focus {
          border-color: #1971c2;
          border-width: 2px;
        }
      }

      .voucher-apply-button {
        padding: 10px 20px;
        font-size: 1.6rem;
        font-weight: 600;
        background-color: #fff;
        color: #1971c2;
        outline: none;
        border: none;
        box-shadow: inset 0 0 0 2px #1971c2;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
export default SideBar
