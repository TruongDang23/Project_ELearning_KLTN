import styled from "styled-components"
import MainContentAccessCourse from "./MainContentAccessCourse"
import SideBarAccessCourse from "./SideBarAccessCourse"
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { student } from "api"
import { Snackbar } from "~/components/general"

function MainAccessCourse({ accessCourseData, setReload }) {
  const userID = localStorage.getItem('userID')
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const [searchParams, setSearchParams] = useSearchParams({
    id: accessCourseData.chapters[0].lectures[0].id,
    type: accessCourseData.chapters[0].lectures[0].type,
    source: accessCourseData.chapters[0].lectures[0].source
  })

  const [progress, setProgress] = useState({
    userID: userID,
    courseID: accessCourseData.courseID,
    lectureID: searchParams.get('id'),
    percent: 0
  })

  const updateProgress = async() => {
    if ( progress.percent != 0 ) {
      if ( userID[0] === 'S' )
      {
        const res = await student.updateProgress(progress.courseID, progress.lectureID, progress.percent)
        if (res.status == 200) {
          setReload((prev) => ({
            reload: !prev.reload
          }))
        }
        else {
          setOpenError({
            status: true,
            message: `Can't update progress for course`
          })
          setTimeout(() => {
            setOpenError({
              status: false
            })
          }, 3000)
        }
      }
    }
  }

  useEffect(() => {
    if (userID[0] === 'S')
      updateProgress()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.percent])

  return (
    <>
      <MainAccessCourseWrapper className="white-space-small">
        <MainContentAccessCourse accessCourseData={accessCourseData} params={searchParams} setProgress={setProgress} setReload={setReload} />
        <SideBarAccessCourse accessCourseData={accessCourseData} setParams={setSearchParams} setProgress={setProgress} />
      </MainAccessCourseWrapper>
      {openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message} /> </> : <> </>}
    </>

  );
}

const MainAccessCourseWrapper = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;

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
`;

export default MainAccessCourse;
