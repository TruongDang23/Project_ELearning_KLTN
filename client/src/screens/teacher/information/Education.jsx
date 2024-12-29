import styled from 'styled-components'
import { useState } from 'react'
import { AddExpertise, AddCredential } from '~/components/popup/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Education({ profile, setProfile }) {
  const [openExp, setopenExp] = useState(false)
  const [openCre, setopenCre] = useState(false)

  const toggleExp = () => {
    setopenExp(!openExp)
  }
  const toggleCre = () => {
    setopenCre(!openCre)
  }

  const deleteDegree = (index) => {
    const newDegrees = profile.degrees.filter((_, i) => i !== index)
    setProfile((prev) => ({
      ...prev,
      degrees: newDegrees
    }))
  }

  return (
    <>
      <Wrapper>
        <div className="expertise">
          <h4>Expertise:</h4>
          <div className="content-expertise">
            {profile.expertise.map((exp, index) => (
              <label key={index}>{exp}</label>
            ))}
          </div>
          <div className="content-expertise-btn">
            <button onClick={toggleExp}>Add Expertise</button>
          </div>
        </div>

        <div className="degree">
          <h4>Degree:</h4>
          <div className="content-degree">
            {profile.degrees.map((degree, index) => (
              <>
                <div className="contain">
                  <div key={index} className="degree-item">
                    <p>
                      <strong>School:</strong> {degree.school}
                    </p>
                    <p>
                      <strong>Faculty:</strong> {degree.falcuty}
                    </p>
                    <p>
                      <strong>Period:</strong> {degree.begin_time} -{' '}
                      {degree.end_time}
                    </p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon
                      className="recycle-bin"
                      sx={{ fontSize: '40px' }}
                      onClick={() => deleteDegree(index)}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="content-degree-btn">
            <button onClick={toggleCre}>Add Credential</button>
          </div>
        </div>
      </Wrapper>
      {openExp && (
        <AddExpertise handleClose={toggleExp} handleSave={setProfile} />
      )}
      {openCre && (
        <AddCredential handleClose={toggleCre} handleSave={setProfile} />
      )}
    </>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.6rem;
    line-height: 1.4;
    font-weight: 700;
    color: #333;
  }

  .expertise {
    height: auto;
    max-height: 200px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    .content-expertise {
      max-height: 100px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .content-expertise-btn {
      display: flex;
      justify-content: flex-end;
      button {
        background-color: #6c757d;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.3s all ease;

        &:hover {
          background-color: #fff;
          color: #6c757d;
          box-shadow: 0 0 0 2px #6c757d;
        }
      }
    }
    label {
      margin-right: 10px;
      height: 50px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      align-items: center;
      color: white;
      background-color: #187bce;
    }
  }

  .degree {
    height: auto;
    max-height: 250px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;

    .content-degree {
      max-height: 140px;
      width: 100%;
      max-width: 600px;
      overflow-y: auto;
      margin-top: 10px;
      margin-bottom: 10px;

      .contain {
        display: flex;
        align-items: center;

        &:hover {
          .recycle {
            opacity: 1;
            left: 10px;
          }
        }

        .degree-item {
          padding: 10px;
          margin: 10px 0;
          border-bottom: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          max-width: 600px;
          transition: background-color 0.3s;

          p {
            margin: 5px 0;
          }

          strong {
            color: #555;
            font-weight: 700;
          }
        }

        .recycle {
          cursor: pointer;
          opacity: 0;
          transition: left 0.3s ease, opacity 0.3s ease;
        }
      }
    }

    .content-degree-btn {
      display: flex;
      justify-content: flex-end;

      button {
        background-color: #6c757d;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1.6rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: 0.3s all ease;

        &:hover {
          background-color: #fff;
          color: #6c757d;
          box-shadow: 0 0 0 2px #6c757d;
        }
      }
    }
    label {
      margin-right: 10px;
      height: 50px;
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display: flex;
      align-items: center;
      color: white;
      background-color: #187bce;
    }
  }
`

export default Education
