import styled from 'styled-components'
import VideoPlayer from './VideoPlayer'
import Quizz from './Quizz'
import TabviewAccessCourse from './TabviewAccessCourse'
import PdfViewer from './PdfViewer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import FaceTracking from './FaceTracking'

function MainContentAccessCourse({
  accessCourseData,
  params,
  setProgress,
  setReload
}) {
  const [isFaceTrackingEnabled, setIsFaceTrackingEnabled] = useState(false)
  const [isFocused, setIsFocused] = useState(true)
  const type = params.get('type')
  const source = params.get('source')
  const id = params.get('id')
  const navigate = useNavigate()

  // Hàm xử lý khi trạng thái focus thay đổi
  const handleFocusChange = (focused) => {
    setIsFocused(focused)
  }

  // Hàm bật/tắt Eye Tracking
  const toggleFaceTracking = () => {
    setIsFaceTrackingEnabled(!isFaceTrackingEnabled)
  }

  let quizz
  let assignment

  if (type === 'quizz') {
    for (const chapter of accessCourseData.chapters) {
      quizz = chapter.lectures.find((lecture) => lecture.id == id)
      if (quizz) break
    }
  }

  if (type === 'assignment') {
    for (const chapter of accessCourseData.chapters) {
      assignment = chapter.lectures.find((lecture) => lecture.id == id)
      if (assignment) {
        sessionStorage.setItem('assignment', JSON.stringify(assignment))
        break
      }
    }
  }

  return (
    <MainAccessCourseWrapper>
      {type === 'video' ? (
        <VideoPlayer
          video={source}
          setProgress={setProgress}
          isFaceTrackingEnabled={isFaceTrackingEnabled}
          toggleFaceTracking={toggleFaceTracking}
          isFocused={isFocused}
        />
      ) : type === 'file' ? (
        <PdfViewer pdfUrl={source} setProgress={setProgress} />
      ) : type === 'quizz' ? (
        <Quizz quizzData={quizz} setProgress={setProgress} />
      ) : (
        navigate(`/course/${accessCourseData.courseID}/assignment/${id}?page=1`)
      )}
      <TabviewAccessCourse
        accessCourseData={accessCourseData}
        lectureId={id}
        setReload={setReload}
      />
      {isFaceTrackingEnabled && type === 'video' && (
        <FaceTracking
          onFocusChange={handleFocusChange}
          isEnabled={isFaceTrackingEnabled}
        />
      )}
    </MainAccessCourseWrapper>
  )
}
const MainAccessCourseWrapper = styled.section``

export default MainContentAccessCourse
