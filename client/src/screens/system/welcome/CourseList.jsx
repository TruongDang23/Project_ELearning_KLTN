import styled from 'styled-components'
import Course from './Course'
import { useState, useEffect } from 'react'
import { Element } from 'react-scroll'
import { anonymous, model } from 'api'
import { Snackbar } from "~/components/general"

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
  const userID = localStorage.getItem('userID') ? localStorage.getItem('userID') : 'anonymous'
  const [courses, setCourse] = useState([])
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const params = {
    limit: 9,
    page: 'welcome'
  }
  let res
  const loadCourseWelcome = async() => {
    switch (userID[0]) {
    case 'S':
      res = await model.recommendCourse()
      break
    case 'I':
      res = await model.recommendCourse()
      break
    default:
      res = await anonymous.searchCourse(params)
      break
    }
    if (res.status === 200) {
      setCourse(res.data)
    }
    // Case học viên chưa mua khóa học nào hoặc giảng viên chưa tạo khóa học nào
    // => trả về danh sách khóa học mặc định
    else if (res.status === 204) {
      res = await anonymous.searchCourse(params)
      if (res.status === 200) {
        setCourse(res.data)
      }
      else {
        setOpenError({
          status: true,
          message: res.response.data.error
        })
      }
    }
    else {
      setOpenError({
        status: true,
        message: res.response.data.error
      })
    }
  }
  useEffect(() => {
    loadCourseWelcome()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CourseListWrapper className="container white-space-medium">
        <Element name="courses">
          <h2 className="heading-tertiary">Recommended for You</h2>
        </Element>
        <div className="courses">
          {courses.map((course) => (
            <Course key={course.course_id} course={course} />
          ))}
        </div>
      </CourseListWrapper>
      { openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message}/> </> : <> </> }
    </>
  )
}

export default CourseList
