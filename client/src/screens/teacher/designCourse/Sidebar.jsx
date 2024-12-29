import styled from 'styled-components'
import { Link } from 'react-scroll'
import { useContext } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

import { DesignCourseContext } from './DesignCourseContext'

function Sidebar({ handleSave }) {
  const { completedSections } = useContext(DesignCourseContext)
  // const handleSave = () => {
  //   setFlag(flag => !flag)
  // }
  // const handleCancel = () => {
  //   setFlag(flag => flag)
  // }
  return (
    <SidebarWrapper>
      <div className="sidebar-container">
        <h3>Publish Your Course</h3>
        <div className="sidebar-content">
          <Link to="general" duration={500} offset={-10}>
            <button>
              General
              {completedSections.general && (
                <span>
                  <CheckCircleOutlineIcon />
                </span>
              )}
            </button>
          </Link>
          <Link to="categories" duration={500} offset={-10}>
            <button>
              Categories
              {completedSections.categories && (
                <span>
                  <CheckCircleOutlineIcon />
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
      <div className="sidebar-container">
        <h3>Plan Your Course</h3>
        <div className="sidebar-content">
          <Link to="intended-learners" duration={500} offset={-10}>
            <button>
              Intended learners
              {completedSections.intendedLearners && (
                <span>
                  <CheckCircleOutlineIcon />
                </span>
              )}
            </button>
          </Link>
          <Link to="course-structure" duration={500} offset={-10}>
            <button>
              Course Structure
              {completedSections.courseStructure && (
                <span>
                  <CheckCircleOutlineIcon />
                </span>
              )}
            </button>
          </Link>
          <Link to="introduce-course" duration={500} offset={-10}>
            <button>
              Introduce Course
              {completedSections.introduceCourse && (
                <span>
                  <CheckCircleOutlineIcon />
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
      <div className='buttons'>
        <button id="btn-save" onClick={handleSave}>
                Save Design
        </button>
        <button id="btn-cancel">
                Cancel Design
        </button>
      </div>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    transition: all ease 0.3s;
  }
  .sidebar-container {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    .sidebar-content {
      display: flex;
      flex-direction: column;
      button {
        background-color: #fff;
        ${'' /* background-color: #f5f5f5; */}
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px;
        border: none;
        font-size: 1.6rem;
        svg {
          font-size: 2rem;
          color: #37b24d;
        }
      }
    }
  }

  .buttons {
    margin: 0 auto;
  }

  #btn-save {
    background-color: #1971c2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 700;
    min-width: 160px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 13px;
    gap: 10px;
    border: none;
    transition: 0.3s all ease;
    box-shadow: 0 0 0 2px #1971c2;
    #btn-main span {
      svg {
        font-size: 2rem;
      }
    }

    &:hover {
      background-color: #fff;
      color: #187bce;
      box-shadow: 0 0 0 2px #1971c2;
    }
  }

  #btn-cancel {
    background-color: #fff;
    color: #ff3e3e;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 700;
    min-width: 160px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
    border: none;
    transition: 0.3s all ease;
    box-shadow: 0 0 0 2px #ff3e3e;
    #btn-main span {
      svg {
        font-size: 2rem;
      }
    }

    &:hover {
      background-color: #ff3e3e;
      color: #fff;
    }
  }
`

export default Sidebar
