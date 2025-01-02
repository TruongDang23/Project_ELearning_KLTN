import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"

function App() {
  return (
    <>
      <System />
      <Admin />
      <Instructor />
      <Student />
      <Course />
    </>
  );
}

export default App;

