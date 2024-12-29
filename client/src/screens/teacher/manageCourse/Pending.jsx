// src/UserProfile.js
import { Items } from './PendingItem'
import styled from 'styled-components'

function PendingCourse({ course, reload, setReload }) {
  return (
    <>
      {course.length == 0 && <Heading>No course pending</Heading>}
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

export default PendingCourse
