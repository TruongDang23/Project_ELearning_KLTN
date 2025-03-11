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


// import { useState } from "react";
// import System from "./screens/system";
// import { Admin } from "./screens/admin";
// import { Instructor } from "./screens/teacher";
// import { Student } from "./screens/student";
// import { Course } from "./screens/course";
// import ChatbotUI from "./components/ChatbotUI"; // Import chatbot

// function App() {
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   return (
//     <>
//       <System />
//       <Admin />
//       <Instructor />
//       <Student />
//       <Course />

//       {/* Nút mở chatbot */}
//       <button
//         onClick={() => setIsChatOpen(!isChatOpen)}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
//       >
//         {isChatOpen ? "✖" : "💬"}
//       </button>

//       {/* Popup chatbot */}
//       {isChatOpen && (
//         <div className="fixed bottom-16 right-4 w-80 shadow-lg rounded-lg bg-white border">
//           <ChatbotUI />
//         </div>
//       )}
//     </>
//   );
// }

// export default App;

