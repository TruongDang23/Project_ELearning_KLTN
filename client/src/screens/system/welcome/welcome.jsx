import { GeneralHeader } from '~/components/general'
import HeroSection from './HeroSection'
import Feature from './Feature'
import CourseList from './CourseList'
import Instructor from './Instructor'
import FooterNew from '~/components/general/Footer/FooterNew'
import Sticky from 'react-sticky-el'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import Logo from '../../../assets/hdh.png'

import styled from 'styled-components'

function Welcome() {
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
