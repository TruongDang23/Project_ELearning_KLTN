import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import ChatBotUI from "./screens/system/Chatbot"
import SummaryLecture from "./screens/course/accessCourse/SummaryLecture"
import InteractiveQuestion from "./screens/course/accessCourse/InteractiveQuestion"

function App() {
  return (
    <>
      <InteractiveQuestion />
      <SummaryLecture />
      <System />
      <ChatBotUI/>
      <Admin />
      <Instructor />
      <Student />
      <Course />
    </>
  );
}

export default App;
