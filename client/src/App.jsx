import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import { Snackbar } from "./components/general"

function App() {
  return (
    <>
      <System />
      <Admin />
      <Instructor />
      <Student />
      <Course />
      <Snackbar />
    </>
  );
}

export default App;

