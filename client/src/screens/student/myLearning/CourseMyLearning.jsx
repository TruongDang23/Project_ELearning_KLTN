import { useState } from 'react'
import styled from 'styled-components'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

function CourseMyLearning({ course }) {
  const [isCourseHovered, setIsCourseHovered] = useState(false)
  const { instructor, title, progress, image_introduce, courseID } = course

  // Giới hạn số ký tự của title, nếu title dài quá thì cắt bớt và thêm dấu "..."
  const titleLimit = title.length > 25 ? title.slice(0, 25) + '...' : title

  // Thay đổi URL khi nhấn vào khóa học
  const handleClick = () => {
    window.open(`/course/details/${courseID}`, '_blank')
  }

  return (
    <CourseMyLearningWrapper
      onClick={handleClick}
      onMouseEnter={() => setIsCourseHovered(true)}
      onMouseLeave={() => setIsCourseHovered(false)}
    >
      <div className="course-img">
        <img src={image_introduce} alt={title} />
        <IframeOverlay isVisible={isCourseHovered}>
          <PlayCircleIcon
            style={{
              fontSize: 70,
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </IframeOverlay>
      </div>
      <div className="course-body">
        <h3 className="course-title">{titleLimit}</h3>
        <span className="course-instructor">{instructor}</span>
        <div className="course-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="course-progress-val">{progress}% complete</span>
      </div>
    </CourseMyLearningWrapper>
  )
}

const IframeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(1, 11, 20, 0.8);
  backdrop-filter: blur(5px);
  pointer-events: none;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

const CourseMyLearningWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  border-radius: 8px;
  border: 2px solid #74c0fc;
  box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
    transition: all ease 0.3s;
  }
  .course-img {
    position: relative;
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  .course-body {
    padding: 4px 18px;
    margin: 14px 0;

    .course-title {
      color: #333;
      font-size: 1.6rem;
      line-height: 1.4;
      font-weight: 700;
    }

    .course-instructor {
      font-size: 1.4rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }

    .course-progress {
      position: relative;
      width: 100%;
      height: 5px;
      background-color: #e9ecef;
      border-radius: 5px;
      margin-top: 20px;
      margin-bottom: 8px;

      .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: #1971c2;
        border-radius: 5px;
      }
    }

    .course-progress-val {
      display: flex;
      justify-content: flex-end;
      font-size: 1.4rem;
      margin-top: 8px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  &:hover {
    cursor: pointer;
  }
`

export default CourseMyLearning
