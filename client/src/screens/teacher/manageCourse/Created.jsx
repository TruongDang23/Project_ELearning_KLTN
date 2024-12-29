// src/UserProfile.js
import { Items } from './CreatedItem'
import styled from 'styled-components'

function CreatedCourse({ course, reload, setReload }) {
  return (
    <>
      {course.length === 0 && <Heading>No course created</Heading>}
      {course.map((courseItem) => (
        <Items
          key={courseItem.courseID}
          courseItem={courseItem}
          reload={reload}
          setReload={setReload}
        />
      ))}
    </>
  )
}

const Heading = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 2.4rem;
  font-weight: 700;
`

export default CreatedCourse
