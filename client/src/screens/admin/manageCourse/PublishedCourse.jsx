// src/UserProfile.js
import { Items } from './PublishedItem'
import styled from 'styled-components'

function PublishedCourse({ course, setReload }) {
  return (
    <>
      {course.length === 0 && <Heading>No course created</Heading>}
      {course.map((courseItem) => (
        <Items
          key={courseItem.courseID}
          courseItem={courseItem}
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

export default PublishedCourse
