import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'

import ContactInfo from './ContactInfo'
import AboutMe from './AboutMe'
import Education from './Education'
import WorkExperience from './WorkExperience'
import PersonalProject from './PersonalProject'
import CourseEnrolled from './CourseEnrolled'
import Loading from '~/screens/system/Loading'
import Sticky from 'react-sticky-el'

import Logo from '../../../assets/hdh.png'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { userStore } from '~/context/UserStore'

function ProfileStudent() {
  const userProfiles = userStore.getState()

  const isLoad = false //Data is loading

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
              <CourseEnrolled course_enrolled={userProfiles.course_enrolled} />
            </ProfileStudentWrapper>
          </ProfileMainWrapper>
          <GeneralFooter />
        </>
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

export default ProfileStudent
