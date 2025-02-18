import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import styled, { createGlobalStyle } from 'styled-components'
import Sticky from 'react-sticky-el'
import MainDesignCourse from './MainDesignCourse'
import Sidebar from './Sidebar'
import { DesignCourseProvider } from './DesignCourseContext'
import Logo from '../../../assets/hdh.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'
import { instructor } from 'api'
import { Snackbar } from "~/components/general"

function DesignCourse() {
  const formData = new FormData()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const userID = localStorage.getItem('userID')
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
    setIsLoad(true)

    formData.append(
      `image_introduce-${userID}`,
      structure.image_introduce
    )
    formData.append(
      `video_introduce-${userID}`,
      structure.video_introduce
    )

    structure.chapters.map((chapter) => {
      chapter.lectures.map((lecture) => {
        lecture.id = lectureId++
        formData.append(
          `${lecture.source.name}-${userID}`,
          lecture.source
        )
      })
    })

    // console.log('structure', structure)
    // console.log('form', formData)
    // console.log('userID', userID)
    // console.log(formData.get(`image_introduce-${userID}`))
    const res = await instructor.createCourse(structure, formData)
    if (res.status === 201) {
      setOpenSuccess(true)
      setTimeout(() => {
        navigate('/instructor/manageCourse')
      }, 2000)
    }
    else {
      console.log(res)
      setOpenError({
        status: true,
        message: res.response.data.error
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    }
    setIsLoad(false)
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
      {openSuccess ? <> <Snackbar vertical="bottom" horizontal="right" severity="success" message="Create Successfully" /> </> : <> </>}
      {openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message} /> </> : <> </>}
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
