import styled from 'styled-components'
import MainContentCourse from './MainContentCourse'
import SideBar from './SideBar'
import Sticky from 'react-sticky-el'

function MainCourse({ inforCourseData }) {
  return (
    <MainCourseWrapper className="container">
      <MainContentCourse inforCourseData={inforCourseData} />
      <Sticky>
        <SideBar inforCourseData={inforCourseData} />
      </Sticky>
    </MainCourseWrapper>
  )
}

const MainCourseWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-top: 50px;
  padding-bottom: 50px;

  @media (max-width: 1440px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`

export default MainCourse
