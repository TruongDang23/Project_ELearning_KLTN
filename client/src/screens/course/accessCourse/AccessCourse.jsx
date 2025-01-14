import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import CourseBanner from './CourseBanner'
import MainAccessCourse from './MainAccessCourse'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'
import { anonymous, admin, instructor, student } from 'api'
import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function AccessCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const [reload, setReload] = useState(false)
  const { courseID } = useParams()
  const [accessCourseData, setAccessCourseData] = useState()
  const userID = localStorage.getItem('userID')

  const loadDetailsCourse = async(courseID) => {
    let course
    switch (userID[0]) {
    case 'A':
      course = await admin.getCourseDetails(courseID)
      break;
    case 'I':
      course = await instructor.getCourseDetails(courseID)
      break;
    case 'S':
      course = await student.getCourseDetails(courseID)
      break;
    }
    setIsLoad(false)
    setAccessCourseData(course.data)
  }

  useEffect(() => {
    loadDetailsCourse(courseID)
  }, [])

  // console.log(accessCourseData)

  return (
    <>
      {
        //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
        //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
        isLoad ? (
          <Loading />
        ) : (
          <>
            <Helmet>
              <title>
                {accessCourseData
                  ? `Course: ${accessCourseData.title} | EL-Space`
                  : 'Course Details'}
              </title>
            </Helmet>
            <GlobalStyle />
            <GeneralHeader />
            <main>
              <CourseBanner accessCourseData={accessCourseData} />
              <MainAccessCourse
                accessCourseData={accessCourseData}
                setReload={setReload}
              />
            </main>
            <FooterNew />
          </>
        )
      }
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
  }
`

export default AccessCourse
