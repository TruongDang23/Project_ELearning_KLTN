import styled from 'styled-components'

function WorkExperience({ working_history }) {
  return (
    <WorkExperienceWrapper>
      <div className="work-experience">
        <h2>Work experience</h2>
        <hr />
        <div className="work-experience__content">
          {working_history.map((work, index) => (
            <div key={index} className="work-experience__content-item">
              <h3>{work.description}</h3>
              <p>{work.company}</p>
              <p>
                {work.begin_time} - {work.end_time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </WorkExperienceWrapper>
  )
}

const WorkExperienceWrapper = styled.section`
  display: flex;
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #74c0fc;
  box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
    transition: all ease 0.3s;
  }

  .work-experience {
    width: 100%;
    h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1971c2;
      margin-bottom: 10px;
    }
    hr {
      margin-bottom: 10px;
      border: none;
      height: 2px;
      background-color: #1971c2;
    }
    .work-experience__content {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .work-experience__content-item {
        width: 100%;
        h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #2d2f31;
        }
        p {
          color: #2d2f31;
          font-size: 1.4rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .work-experience {
      .work-experience__content {
        .work-experience__content-item {
          h3 {
            font-size: 1.6rem;
          }
          p {
            font-size: 1.4rem;
          }
        }
      }
    }
  }

  @media (max-width: 576px) {
    .work-experience {
      h2 {
        font-size: 1.6rem;
      }
      .work-experience__content {
        .work-experience__content-item {
          h3 {
            font-size: 1.4rem;
          }
          p {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`

export default WorkExperience
