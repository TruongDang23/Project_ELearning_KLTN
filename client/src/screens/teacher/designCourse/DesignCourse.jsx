import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'

import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'
import { DesignCourseProvider } from './DesignCourseContext'
import Logo from '../../../assets/hdh.png'

import { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'

function DesignCourse() {
  const formData = new FormData()

  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))
  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(false)

  const [structure, setStructure] = useState({
    //Data in mongoDB
    image_introduce: '',
    video_introduce: '',
    image_file: '',
    video_file: '',
    keywords: [],
    targets: [],
    requirements: [],
    chapters: [],

    //Data in mysql
    type_of_course: 'Course',
    title: '',
    method: '',
    language: '',
    price: '',
    currency: '',
    program: '',
    category: '',
    course_for: '',
    userID: '',
    num_lecture: 0 //num_lecture sẽ phụ thuộc vào độ dài của chapters
  })

  let lectureId = 1

  const handleSave = async () => {
    formData.append(
      `image_introduce-${userData.userID}`,
      structure.image_introduce
    )
    formData.append(
      `video_introduce-${userData.userID}`,
      structure.video_introduce
    )

    structure.chapters.map((chapter) => {
      chapter.lectures.map((lecture) => {
        lecture.id = lectureId++
        formData.append(
          `${lecture.source.name}-${userData.userID}`,
          lecture.source
        )
      })
    })

    //API upload file into folder uploads
    await axios
      .post('http://localhost:3000/c/uploadfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Token: token,
          user: userAuth
        }
      })
      .then((response) => {
        if (response.status === 200) setIsLoad(true) //Start loading page
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
      })

    //API insert data into mysql & mongoDB & GCS
    await axios
      .post(
        'http://localhost:3000/c/createcourse',
        {
          structure
        },
        {
          headers: {
            Token: token,
            user: userAuth
          }
        }
      )
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        setIsLoad(false) //Data is loaded successfully
        navigate('/instructor/manageCourse')
        alert('Upload Course Successfully')
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
      })
  }

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <DesignCourseProvider>
            <GlobalStyle />
            <GeneralHeader />
            <DesignCourseWrapper>
              <Sticky disabled={window.innerWidth <= 768}>
                <Sidebar handleSave={handleSave} />
              </Sticky>
              <MainDesignCourse setStructure={setStructure} />
            </DesignCourseWrapper>
            <FooterNew />
          </DesignCourseProvider>
        </>
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
  }
`

const DesignCourseWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .sticky {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    margin: 10px;
  }

  @media (max-width: 768px) {
    margin: 5px;
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`

export default DesignCourse
