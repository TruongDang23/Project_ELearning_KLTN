import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import ChatBotUI from "./screens/system/Chatbot"

function App() {

  return (
    <>
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
