import { useEffect, useState } from 'react'
import { admin } from 'api'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import PublishIcon from '@mui/icons-material/Publish'
import DraftsIcon from '@mui/icons-material/Drafts'
import CancelIcon from '@mui/icons-material/Cancel'
import { Snackbar } from '~/components/general'

function CourseDashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    published: 0,
    monitoring: 0,
    terminated: 0
  })
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

  const loadDataDashboard = async () => {
    try {
      const response = await admin.loadDataDashboard()
      const { published, monitoring, terminated } = response.data
      setData({ published, monitoring, terminated })
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Failed to load dashboard data'
      })
      setTimeout(() => {
        setOpenError({
          status: false,
          message: ''
        })
      }, 3000)
    }
  }

  useEffect(() => {
    loadDataDashboard()
  }, [])
  return (
    <CourseDashboardWrapper>
      <h3>Courses</h3>
      <div className="general-card-list">
        <div className="general-card">
          <div className="general-icon">
            <span id="published">
              <PublishIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Publish</h4>
            <p>{data.published}</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="monitoring">
              <DraftsIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Monitoring</h4>
            <p>{data.monitoring}</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="terminated">
              <CancelIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Terminated</h4>
            <p>{data.terminated}</p>
          </div>
        </div>
      </div>
      <div className="course-all">
        <h4>See all</h4>
        <button onClick={() => navigate('/admin/manageCourse')}>
          Go to list of all courses
        </button>
      </div>
      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </CourseDashboardWrapper>
  )
}

const CourseDashboardWrapper = styled.section`
  padding: 3rem;
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }

  .general-card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;

    .general-card {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);

      &:nth-child(odd) {
        animation-delay: 0.2s;
      }

      &:nth-child(even) {
        animation-delay: 0.4s;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .general-content {
        padding: 0 1rem;

        h4 {
          font-size: 1.6rem;
          font-weight: 200;
        }

        p {
          font-size: 2.4rem;
          font-weight: 600;
          color: rgb(52, 71, 103);
        }
      }

      .general-icon #published,
      .general-icon #monitoring,
      .general-icon #terminated {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        opacity: 1;
        margin-top: -25px;
        border-radius: 0.75rem;
        box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
          rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      }

      .general-icon #published {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(8, 59, 21, 0.8),
          rgba(18, 142, 50, 0.8)
        );
      }

      .general-icon #monitoring {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(135, 134, 22, 0.8),
          rgba(255, 255, 0, 0.8)
        );
      }

      .general-icon #terminated {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(142, 18, 18, 0.8),
          rgba(190, 29, 29, 0.94)
        );
      }
    }
  }

  @media (max-width: 768px) {
    .general-card-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media (max-width: 576px) {
    .general-card-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .course-all {
    display: flex;
    gap: 3rem;
    align-items: center;

    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;

    h4 {
      font-size: 1.6rem;
      font-weight: 600;
    }

    button {
      font-size: 1.6rem;
      padding: 0.75rem 1.5rem;
      background: rgb(52, 71, 103);
      color: rgb(255, 255, 255);
      border: none;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: color 0.3s, background 0.3s, box-shadow 0.3s;

      &:hover {
        font-weight: 600;
        color: rgb(52, 71, 103);
        background: rgb(255, 255, 255);
        box-shadow: inset 0 0 0 2px rgb(52, 71, 103);
      }
    }
  }
`

export default CourseDashboard
