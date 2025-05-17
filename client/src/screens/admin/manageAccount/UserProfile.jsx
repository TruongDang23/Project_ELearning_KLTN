import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'

import ContactInfo from '~/screens/student/profile/ContactInfo'
import AboutMe from '~/screens/student/profile/AboutMe'
import Education from '~/screens/student/profile/Education'
import WorkExperience from '~/screens/student/profile/WorkExperience'
import PersonalProject from '~/screens/student/profile/PersonalProject'
import CourseEnrolled from '~/screens/student/profile/CourseEnrolled'
import CoursePublish from '~/screens/teacher/profile/CoursePublish'
import Loading from '~/screens/system/Loading'
import Sticky from 'react-sticky-el'
import Logo from '../../../assets/hdh.png'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { useParams } from 'react-router-dom'
import { student, instructor } from 'api'
import { useState, useEffect } from 'react'
import { Snackbar } from '~/components/general'

function UserProfile() {
  const { userID } = useParams()
  const userRole = (userID[0] === 'S') ? 'student' : 'instructor'
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })
  const [userProfiles, setUserProfile] = useState()

  const getUserInformation = async () => {
    let response
    switch (userRole) {
    case 'student':
      try {
        response = await student.getInformation(userID)
        if (response.status === 200) {
          setUserProfile(response.data)
          setIsLoad(false)
        }
      }
      // eslint-disable-next-line no-unused-vars
      catch (error) {
        setOpenError({
          status: true,
          message: `Failed to load profile of user ${userID}`
        })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
      }
      break
    case 'instructor':
      try {
        response = await instructor.getInformation(userID)
        if (response.status === 200) {
          setUserProfile(response.data)
          setIsLoad(false)
        }
      }
      // eslint-disable-next-line no-unused-vars
      catch (error) {
        setOpenError({
          status: true,
          message: `Failed to load profile of user ${userID}`
        })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
      }
      break
    }
  }
  useEffect(() => {
    if (userID)
      getUserInformation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Profile | EL-Space</title>
          </Helmet>
          <GlobalStyle />
          <Sticky disabled={window.innerWidth <= 768}>
            <GeneralHeader />
          </Sticky>
          <ProfileMainWrapper>
            <ProfileStudentWrapper className="container">
              <ContactInfo userProfile={userProfiles} />
              <AboutMe self_introduce={userProfiles.self_introduce} />
              <Education degrees={userProfiles.degrees} />
              <WorkExperience working_history={userProfiles.working_history} />
              <PersonalProject projects={userProfiles.projects} />
              {userRole === 'student' ? (
                <CourseEnrolled course_enrolled={userProfiles.course_enrolled} />
              ) : (
                <CoursePublish course_enrolled={userProfiles.course_published} />
              )}
            </ProfileStudentWrapper>
          </ProfileMainWrapper>
          <GeneralFooter />
        </>
      )}

      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F1F3F5 !important;
  }
`

const ProfileMainWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

const ProfileStudentWrapper = styled.main`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default UserProfile
