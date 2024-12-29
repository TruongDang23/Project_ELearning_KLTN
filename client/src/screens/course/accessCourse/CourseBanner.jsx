import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

function CourseBanner({ accessCourseData }) {
  console.log(accessCourseData)
  return (
    <CourseBannerWrapper>
      <div className="course-banner">
        <h1>
          {accessCourseData.title} | <span> {accessCourseData.instructor}</span>
        </h1>
        <div className="course-banner-progress">
          <span>Your Progress:</span>
          <CircularProgressbar
            value={accessCourseData.progress}
            text={`${accessCourseData.progress}%`}
            styles={{
              root: { width: 50 },
              backgroundColor: '#f9f9f9'
            }}
          />
        </div>
      </div>
    </CourseBannerWrapper>
  )
}
const CourseBannerWrapper = styled.section`
  background-color: #2d2f31;
  color: #f9f9f9;
  .course-banner {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    align-items: center;
    border-bottom: 1px solid #f9f9f9;
    border-top: 1px solid #f9f9f9;
    h1 {
      font-size: 2.4rem;
      span {
        font-size: 1.6rem;
      }
    }
    .course-banner-progress {
      border-left: 1px solid #f9f9f9;
      padding-left: 20px;
      font-size: 1.5rem;
      span {
        margin-right: 10px;
      }
    }
  }
`
export default CourseBanner
