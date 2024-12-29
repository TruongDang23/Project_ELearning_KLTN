import styled from 'styled-components'
import { format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'

function Published({ profile }) {
  const navigate = useNavigate()

  const handleEditProfile = (courseID) => {
    navigate('/course/details/' + courseID)
  }
  return (
    <Wrapper>
      <div className="course">
        <div className="content-course">
          {profile.course_published.map((course, index) => {
            // Assuming course.time is in ISO format
            const formattedTime = course.time
              ? format(parseISO(course.time), 'dd-MM-yyyy')
              : 'N/A'

            return (
              <div key={index} className="course-item">
                <div className="course-item-content">
                  <div className="course-item-content-text">
                    <p>
                      <strong>Course name:</strong> {course.title}
                    </p>
                    <p>
                      <strong>Published time:</strong> {formattedTime}
                    </p>
                    <p>
                      <strong>Method:</strong> {course.method}
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
            )
          })}
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
      padding: 10px;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
      .course-item-content {
        display: flex;
        align-items: center;
        gap: 50px;
        .course-item-content-text {
          flex: 1;
          p {
            margin: 5px 0;
          }
          strong {
            color: #555;
            font-weight: 700;
          }
        }
        .course-item-content-btn {
          margin-right: 10px;

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
              background-color: #0f6ab4;
            }
          }
        }
      }
    }
  }
`

export default Published
