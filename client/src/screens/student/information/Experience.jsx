import styled from 'styled-components'
import { useState } from 'react'
import { AddProject, AddWorking } from '~/components/popup/index'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Experience({ profile, setProfile }) {
  const [openPro, setopenPro] = useState(false)
  const [openWork, setopenWork] = useState(false)

  const togglePro = () => {
    setopenPro(!openPro)
  }
  const toggleWork = () => {
    setopenWork(!openWork)
  }

  const deleteProject = (index) => {
    const newProjects = profile.projects.filter((_, i) => i !== index)
    setProfile((prev) => ({
      ...prev,
      projects: newProjects
    }))
  }

  const deleteWorking = (index) => {
    const newWorking = profile.working_history.filter((_, i) => i !== index)
    setProfile((prev) => ({
      ...prev,
      working_history: newWorking
    }))
  }

  return (
    <>
      <Wrapper>
        <div className="experience">
          <h4>Projects:</h4>
          <div className="content-experience">
            {profile.projects.map((project, index) => (
              <>
                <div className="contain">
                  <div key={index} className="experience-item">
                    <p>
                      <strong>Title:</strong> {project.title}
                    </p>
                    <p>
                      <strong>Link:</strong>
                      <a href={project.link} target="_blank" rel="noreferrer">
                        {project.link}
                      </a>
                    </p>
                    <p>
                      <strong>Description:</strong> {project.description}
                    </p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon
                      className="recycle-bin"
                      sx={{ fontSize: '40px' }}
                      onClick={() => deleteProject(index)}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="content-experience-btn">
            <button onClick={togglePro}>Add new</button>
          </div>
        </div>

        <div className="experience">
          <h4>Working History:</h4>
          <div className="content-experience">
            {profile.working_history.map((work, index) => (
              <>
                <div className="contain">
                  <div key={index} className="experience-item">
                    <p>
                      <strong>Company:</strong> {work.company}
                    </p>
                    <p>
                      <strong>Period:</strong> {work.begin_time} -{' '}
                      {work.end_time}
                    </p>
                    <p>
                      <strong>Description:</strong> {work.description}
                    </p>
                  </div>
                  <div className="recycle">
                    <DeleteForeverIcon
                      className="recycle-bin"
                      sx={{ fontSize: '40px' }}
                      onClick={() => deleteWorking(index)}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="content-experience-btn">
            <button onClick={toggleWork}>Add new</button>
          </div>
        </div>
      </Wrapper>
      {openPro && (
        <AddProject handleClose={togglePro} handleSave={setProfile} />
      )}
      {openWork && (
        <AddWorking handleClose={toggleWork} handleSave={setProfile} />
      )}
    </>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h4 {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.4;
  }

  .experience {
    height: auto;
    max-height: 400px;
    width: 100%;
    max-width: 600px;
    border-radius: 5px;
    padding: 10px;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;

    .content-experience {
      max-height: 300px;
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

        .recycle {
          cursor: pointer;
          opacity: 0;
          transition: left 0.3s ease, opacity 0.3s ease;
        }
      }
    }

    .content-experience-btn {
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

    .experience-item {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      border-radius: 4px;
      width: 100%;
      max-width: 600px;
    }

    .experience-item p {
      margin: 5px 0;
      max-width: 500px;
      word-wrap: break-word;
    }

    .experience-item strong {
      color: #555;
      font-weight: 700;
    }
  }
`

export default Experience
