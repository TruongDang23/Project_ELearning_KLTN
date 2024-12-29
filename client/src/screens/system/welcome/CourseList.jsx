import styled from 'styled-components'
import Course from './Course'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Element } from 'react-scroll'

const CourseListWrapper = styled.section`
  .courses {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2.4rem;
  }
  h2 {
    font-size: 3.6rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    color: #1971c2;
  }
`

function CourseList() {
  const navigate = useNavigate()
  const [courses, setCourse] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3000/s/loadCourseWelcome')
      .then((response) => {
        setCourse(response.data)
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CourseListWrapper className="container white-space-medium">
      <Element name="courses">
        <h2 className="heading-tertiary">Courses</h2>
      </Element>
      <div className="courses">
        {courses.map((course) => (
          <Course key={course.course_id} course={course} />
        ))}
      </div>
    </CourseListWrapper>
  )
}

export default CourseList
