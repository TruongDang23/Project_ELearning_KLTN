import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "./Constants";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CodeEditor({ testcases }) {
  const editorRef = useRef();
  const [value, setValue] = useState("// Write your code here");
  const [language, setLanguage] = useState("python");
  const params = useParams()
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page')
  const title = params.courseID + params.id + page
  const code = JSON.parse(sessionStorage.getItem(title))
  const userData = JSON.parse(sessionStorage.getItem('userAuth'))
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const navigate = useNavigate()

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const [progress, setProgress] = useState({
    userID: userData.userID,
    courseID: params.courseID,
    lectureID: params.id,
    percent: 0
  })

  useEffect(() => {
    axios.post('http://localhost:3000/c/updateNewProgress',
      {
        progress
      },
      {
        headers: {
          'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
          'user': userAuth
        }
      })
      .catch(error => {
        //Server shut down
        if (error.message === 'Network Error')
          navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500)
          navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401)
          navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403)
          navigate('/403error')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.percent])

  return (
    <CodeEditorWrapper>
      <div className="header-editor">
        <LanguageSelector language={language} onSelect={onSelect} />
        <CircularProgressbar
          value={progress.percent}
          text={`${progress.percent}%`}
          styles={{
            root: { width: 50 },
            backgroundColor: "#ffffff"
          }}
        />
      </div>
      <Editor
        height="50rem"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue="// Write your code here"
        onMount={onMount}
        value={(code === null) ? value : code.sourceCode}
        // onChange={(value) => setValue(value)}
      />
      <Output editorRef={editorRef} language={language} testcases={testcases} setProgress={setProgress}/>
    </CodeEditorWrapper>
  );
}

const CodeEditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #333537;
  border-radius: 5px;
  color: #e3e3e3;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);

  .header-editor {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default CodeEditor;
