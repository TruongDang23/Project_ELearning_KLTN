import styled from 'styled-components'
import { useState } from 'react'
import { AdjustContent } from '~/components/popup'
import { useNavigate } from 'react-router-dom'

export function Items({ courseItem, reload, setReload }) {
  const navigate = useNavigate()

  const handleGoToCourse = (courseID) => {
    navigate(`/course/infor/${courseID}`)
  }

  const [openAdjContent, setAdjContent] = useState(false)

  const toggleAdjContent = () => {
    setAdjContent(!openAdjContent)
  }

  return (
    <>
      <Wrapper>
        <div key={courseItem.courseID} className="course-item">
          <div className="image">
            <img src={courseItem.image_introduce} alt="image" />
          </div>

          <div className="center_infor">
            <h2>{courseItem.title}</h2>
            <p>
              <strong>Keywords:</strong>{' '}
              {courseItem.keywords.map((keyword, index) => (
                <span key={index}>
                  {keyword}
                  {index !== courseItem.keywords.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p>
              <strong>Method:</strong> {courseItem.method}
            </p>
            <p>
              <strong>Category:</strong> {courseItem.category}
            </p>
            <p>
              <strong>Program:</strong> {courseItem.program}
            </p>
            <p>
              <strong>Terminated Date: </strong>
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
                {courseItem.to_time}{' '}
              </strong>
              to
              <strong style={{ color: 'red', fontWeight: 'bold' }}>
                {' '}
                {courseItem.end_time}
              </strong>
            </p>
            <p>Reason: {courseItem.reason}</p>
          </div>

          <div className="right_infor">
            <h2>{courseItem.courseID}</h2>
            <p>
              {courseItem.price} {courseItem.currency}
            </p>
            <div className="button">
              <a
                // to={`/course/infor/${courseItem.courseID}`}
                onClick={() => handleGoToCourse(courseItem.courseID)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view"
              >
                Go to course
              </a>
              <button onClick={toggleAdjContent} className="btn-adjust">
                Adjust Content
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
      {openAdjContent && (
        <AdjustContent
          handleClose={toggleAdjContent}
          course={courseItem.courseID}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  )
}

const Wrapper = styled.div`
  background-color: #fff;
  .course-item {
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }
    .image {
      align-self: center;
      width: 30%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .center_infor {
      width: 50%;
      h2 {
        color: #187bce;
        font-weight: bold;
        font-size: 2.4rem;
        padding-bottom: 5px;
      }
      p {
        font-size: 1.6rem;
        line-height: 1.2;
        strong {
          font-weight: 700;
        }
      }
    }

    .right_infor {
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      h2 {
        color: #187bce;
        font-weight: bold;
        font-size: 2.4rem;
        padding-bottom: 5px;
        text-align: center;
      }

      p {
        font-size: 1.6rem;
        font-weight: 700;
        text-align: center;
      }

      .button {
        display: flex;
        flex-direction: column;
        gap: 10px;

        button,
        a {
          text-align: center;
          text-decoration: none;
          align-self: center;
          width: 80%;
          padding: 10px;
          font-size: 1.6rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .btn-view {
          background-color: #187bce;
          color: #fff;
        }

        .btn-view:hover {
          background-color: #155b96;
        }

        .btn-edit {
          background-color: #fff;
          color: #187bce;
          box-shadow: 0 0 0 2px #187bce;
        }

        .btn-edit:hover {
          color: #fff;
          background-color: #187bce;
        }

        .btn-approval {
          background-color: #fff;
          color: #37b24d;
          box-shadow: 0 0 0 2px #37b24d;
        }

        .btn-approval:hover {
          color: #fff;
          background-color: #37b24d;
        }
      }
    }
  }
`
