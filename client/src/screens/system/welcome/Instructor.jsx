import styled from 'styled-components'
import featureInstructor from '../assets/wel-instructor.png'
import { Link } from 'react-router-dom'

function Instructor() {
  return (
    <InstructorWrapper className="container">
      {/* Become a instructor */}
      <h2>Become an Instructor</h2>
      <div className="instructor-content">
        <div className="instructor-img">
          <img src={featureInstructor} alt="Instructor" />
        </div>
        <div className="instructor-info">
          <p>
            Instructors from around the world teach millions of learners on
            Udemi. We provide the tools and skills to teach what you love.
          </p>
          <Link to="/signup">
            <button className="btn">Start teaching today</button>
          </Link>
        </div>
      </div>
    </InstructorWrapper>
  )
}

const InstructorWrapper = styled.section`
  padding-bottom: 10rem;
  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
  .instructor-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    justify-content: center;
    text-align: center;

    .instructor-img {
      padding-left: 20rem;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 10px;
        border: 2px solid #74c0fc;
        box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
      }
    }
    .instructor-info {
      padding-right: 10rem;

      p {
        font-size: 2rem;
        line-height: 1.6;
        margin-bottom: 2rem;
      }
      .btn {
        padding: 1rem 2rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: #1971c2;
        background-color: #fff;
        border: 2px solid #1971c2;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background-color: #1971c2;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
  }
  @media (max-width: 1400px) {
    .instructor-content {
      .instructor-img {
        padding-left: 10rem;
      }
      .instructor-info {
        padding-right: 5rem;
      }
    }
  }
  @media (max-width: 768px) {
    .instructor-content {
      grid-template-columns: 1fr;
      .instructor-img {
        padding-left: 0;
      }
      .instructor-info {
        padding-right: 0;
      }
    }
  }
  @media (max-width: 576px) {
    h2 {
      font-size: 2.4rem;
    }
    .instructor-content {
      .instructor-info {
        .btn {
          padding: 0.8rem 1.6rem;
          font-size: 1.4rem;
        }
      }
    }
  }
`

export default Instructor
