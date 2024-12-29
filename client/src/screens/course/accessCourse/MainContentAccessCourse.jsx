import styled from "styled-components";
import VideoPlayer from "./VideoPlayer";
import Quizz from "./Quizz";
import TabviewAccessCourse from "./TabviewAccessCourse";
import PdfViewer from "./PdfViewer";
import { useNavigate } from "react-router-dom";

function MainContentAccessCourse({ accessCourseData, params, setProgress, setReload }) {
  const type = params.get("type")
  const source = params.get("source")
  const id = params.get("id")
  const navigate = useNavigate()

  let quizz;
  let assignment

  if (type === 'quizz') {
    for (const chapter of accessCourseData.chapters) {
      quizz = chapter.lectures.find(lecture => lecture.id == id);
      if (quizz) break;
    }
  }

  if (type === 'assignment') {
    for (const chapter of accessCourseData.chapters) {
      assignment = chapter.lectures.find(lecture => lecture.id == id);
      if (assignment) {
        sessionStorage.setItem('assignment', JSON.stringify(assignment))
        break;
      }
    }
  }

  return (
    <MainAccessCourseWrapper>
      {type === "video" ? (
        <VideoPlayer video={source} setProgress={setProgress}/>
      ) : type === "file" ? (
        <PdfViewer pdfUrl={source} setProgress={setProgress}/>
      ) : type === "quizz" ? (
        <Quizz quizzData={quizz} setProgress={setProgress}/>
      ) : (
        navigate(`/course/${accessCourseData.courseID}/assignment/${id}?page=1`)
      )}
      <TabviewAccessCourse accessCourseData={accessCourseData} lectureId={id} setReload={setReload} />
    </MainAccessCourseWrapper>
  );
}
const MainAccessCourseWrapper = styled.section``;

export default MainContentAccessCourse;
