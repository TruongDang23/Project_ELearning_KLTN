import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Enrolled({ profile }) {
  const navigate = useNavigate()

  const handleEditProfile = (courseID) => {
    navigate('/course/details/' + courseID)
  }

  return (
    <Wrapper>
      <div className="course">
        <div className="content-course">
          {profile.course_enrolled.map((course, index) => (
            <div key={index} className="course-item">
              <div className="course-item-img">
                <img src={course.image_introduce} alt={course.title} />
              </div>
              <div className="course-item-content">
                <div className="course-item-content-text">
                  <p>
                    <strong>Course name:</strong> {course.title}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                </div>
                <div className="course-item-content-btn">
                  <a
                    // href={`/course/details/${course.courseID}`}
                    onClick={() => handleEditProfile(course.courseID)}
                    target="_blank"
                    rel="noreferrer"

                  >
                    Go to course
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .course {
    height: auto;
    max-height: 250px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    .content-course {
      max-height: 200px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      margin-bottom: 10px;
    }

    .course-item {
      display: flex;
      gap: 10px;
      padding: 10px;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
      .course-item-img {
        img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 5px;
        }
      }
      .course-item-content {
        display: flex;
        flex-direction: column; /* Đặt các phần tử theo chiều dọc */
        justify-content: space-between; /* Đảm bảo các phần tử được dãn cách */
        .course-item-content-text {
          p {
            margin: 5px 0;
          }
          strong {
            color: #555;
            font-weight: 700;
          }
        }
        .course-item-content-btn {
          display: flex;
          justify-content: flex-end;
          a {
            background-color: #6c757d;
            border: 1px solid #ccc;
            font-weight: 700;
            border-radius: 5px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: white;
            background-color: #187bce;
            padding: 10px 20px;
            transition: background-color 0.3s;
            &:hover {
              cursor: pointer;
              background-color: #0f6ab4;
            }
          }
        }
      }
    }
  }
`

export default Enrolled
