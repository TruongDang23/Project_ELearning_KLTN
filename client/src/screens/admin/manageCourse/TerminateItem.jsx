import styled from 'styled-components'
import { useState } from 'react'
import { RePublishCourse } from '~/components/popup'

export function Items({ courseItem, reload, setReload }) {
  const [openRePub, setopenRePub] = useState(false)

  const toggleRePub = () => {
    setopenRePub(!openRePub)
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
              <strong>Teacher:</strong> {courseItem.teacher}
            </p>
            <p>
              <strong>Method:</strong> {courseItem.method}
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
            <p>
              <strong>Program:</strong> {courseItem.program}
            </p>
          </div>

          <div className="right_infor">
            <h2>{courseItem.courseID}</h2>
            <p>Terminated</p>
            <div className="button">
              <a
                href={`/course/infor/${courseItem.courseID}`}
                className="btn-view"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to course
              </a>
              <button onClick={toggleRePub} className="btn-re-publish">
                Re-Publish
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
      {openRePub && (
        <RePublishCourse
          handleClose={toggleRePub}
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
        font-size: 2rem;
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

        .btn-re-publish {
          background-color: #fff;
          color: #37b24d;
          box-shadow: 0 0 0 2px #37b24d;
        }

        .btn-re-publish:hover {
          color: #fff;
          background-color: #37b24d;
        }
      }
    }
  }
`
