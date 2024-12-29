import styled from 'styled-components'
import CourseMyLearning from './CourseMyLearning'

function MainMyLearning({ dataCourseMyLearning }) {
  return (
    <MainMyLearningWrapper className="container">
      <div className="main-mylearning">
        {dataCourseMyLearning.length === 0 ? (
          <h1>You have no courses</h1>
        ) : dataCourseMyLearning.length === 1 ? (
          <h1>You have 1 course</h1>
        ) : (
          <h1>You have {dataCourseMyLearning.length} courses</h1>
        )}
        <div className="course-list">
          {dataCourseMyLearning.map((course) => (
            <CourseMyLearning key={course.title} course={course} />
          ))}
        </div>
      </div>
    </MainMyLearningWrapper>
  )
}

const MainMyLearningWrapper = styled.section`
  .main-mylearning {
    h1 {
      margin-top: 20px;
      font-size: 2.6rem;
      font-weight: 700;
      color: #333;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    .course-list {
      margin-top: 20px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 1.6rem;
    }
  }
`

export default MainMyLearning
