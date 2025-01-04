import System from "./screens/system"
import { Admin } from "./screens/admin"
import { Instructor } from "./screens/teacher"
import { Student } from "./screens/student"
import { Course } from "./screens/course"
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <>
      <UserProvider>
        <System />
        <Admin />
        <Instructor />
        <Student />
        <Course />
      </UserProvider>
    </>
  );
}

export default App;

