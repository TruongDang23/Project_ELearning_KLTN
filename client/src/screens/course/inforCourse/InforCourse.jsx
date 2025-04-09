import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import IntroCourse from './IntroCourse'
import MainCourse from './MainCourse'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '~/screens/system/Loading'
import Logo from '../../../assets/hdh.png'
import styled from 'styled-components'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { anonymous, admin, instructor, student } from 'api'

function InforCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const userID = localStorage.getItem("userID")
  const { courseID } = useParams()
  const [inforCourseData, setInforCourseData] = useState()
  const loadInforCourse = async(courseID) => {
    let course
    if (userID) {
      switch (userID[0]) {
      case 'A':
        course = await admin.getCourseSummary(courseID)
        break;
      case 'I':
        course = await instructor.getCourseSummary(courseID)
        break;
      case 'S':
        course = await student.getCourseSummary(courseID)
        break;
      }
    }
    else
      course = await anonymous.getCourseSummary(courseID)
    setIsLoad(false)
    setInforCourseData(course.data)
  }

  useEffect(() => {
    loadInforCourse(courseID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>
              {inforCourseData
                ? `${inforCourseData.title} | EL-Space`
                : 'Course Details'}
            </title>
          </Helmet>
          <GeneralHeader />
          <InforCourseWrapper>
            <IntroCourse inforCourseData={inforCourseData} />
            <MainCourse inforCourseData={inforCourseData} />
          </InforCourseWrapper>
          <FooterNew />
        </>
      )}
    </>
  )
}

const InforCourseWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

export default InforCourse
