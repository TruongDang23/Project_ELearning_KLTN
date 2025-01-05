import { GeneralHeader } from '~/components/general'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'
import Sticky from 'react-sticky-el'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import Logo from '../../../assets/hdh.png'
import { admin, instructor, student } from 'api'
import styled from 'styled-components'
import { useEffect, useContext } from 'react'
import { UserContext } from "~/context/UserContext"

function Welcome() {
  const { setUserInfo } = useContext(UserContext)

  const getInformation = async (userID) => {
    let userInfo
    switch (userID[0]) {
    case 'A':
      userInfo = await admin.getInformation(userID)
      break
    case 'I':
      userInfo = await instructor.getInformation(userID)
      break
    case 'S':
      userInfo = await student.getInformation(userID)
      break
    }

    if (userInfo) {
      setUserInfo(userInfo.data)
    }
  }

  useEffect(() => {
    const userID = localStorage.getItem("userID")
    if (userID)
      getInformation(userID)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Helmet>
        <title>Website ELearning | EL-Space</title>
      </Helmet>
      <Sticky disabled={window.innerWidth <= 768}>
        <GeneralHeader />
      </Sticky>
      <WelcomeWrapper>
        <HeroSection />
        <Feature />
        <CourseList />
        <Instructor />
      </WelcomeWrapper>
      <FooterNew />
    </>
  )
}

const WelcomeWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

export default Welcome
