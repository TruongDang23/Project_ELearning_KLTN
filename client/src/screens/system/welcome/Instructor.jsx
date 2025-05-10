import styled from 'styled-components'
import featureInstructor from '../assets/wel-instructor.png'

function Instructor() {
  return (
    <InstructorWrapper className="container">
      <h2>Become an Instructor</h2>
      <div className="instructor-content">
        <div className="instructor-img">
          <img src={featureInstructor} alt="Instructor" />
        </div>
        <div className="instructor-info">
          <p>
            Join <b>EL-Space</b> to share your IT expertise and inspire learners across Vietnam. 
            We provide a supportive platform, modern teaching tools, and a passionate learning community.
          </p>
          <p className="contact">
            📧 <a href="mailto:elspace.hcmute.edu@gmail.com">elspace.hcmute.edu@gmail.com</a>
          </p>
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
      text-align: justify;

      p {
        font-size: 2rem;
        line-height: 1.6;
        margin-bottom: 1.6rem;
      }

      .contact {
        font-size: 1.8rem;
        margin-bottom: 2rem;
        text-align: left;

        a {
          color: #1971c2;
          text-decoration: none;
          font-weight: 600;
        }
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
        text-align: justify;
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

        .contact {
          font-size: 1.6rem;
        }
      }
    }
  }
`

export default Instructor
