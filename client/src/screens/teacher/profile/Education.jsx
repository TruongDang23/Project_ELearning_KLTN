import styled from 'styled-components'

function Education({ degrees }) {
  return (
    <EducationWrapper>
      <div className="education">
        <h2>Education</h2>
        <hr />
        <div className="education__content">
          {degrees.map((degree, index) => (
            <div key={index} className="education__content-item">
              <div className="education__content-item__title">
                <h3>{degree.falcuty}</h3>
                <p>{degree.school}</p>
                <p>
                  {degree.begin_time} to {degree.end_time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EducationWrapper>
  )
}

const EducationWrapper = styled.section`
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
  .education {
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
    .education__content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .education__content-item {
        display: flex;
        gap: 10px;
        .education__content-item__title {
          h3 {
            font-size: 1.6rem;
            font-weight: 700;
            color: #2d2f31;
          }
          p {
            font-size: 1.4rem;
            color: #2d2f31;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .education {
      .education__content {
        .education__content-item {
          flex-direction: column;
          gap: 10px;
        }
      }
    }
  }

  @media (max-width: 576px) {
    .education {
      .education__content {
        .education__content-item {
          .education__content-item__title {
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
  }

  @media (max-width: 576px) {
    .education {
      h2 {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 320px) {
    .education {
      h2 {
        font-size: 1.4rem;
      }
    }
  }
`

export default Education
