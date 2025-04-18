import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import ChatBotUI from "./screens/system/Chatbot"
import SummaryLecture from "./screens/course/accessCourse/SummaryLecture"

function App() {
  return (
    <>
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
