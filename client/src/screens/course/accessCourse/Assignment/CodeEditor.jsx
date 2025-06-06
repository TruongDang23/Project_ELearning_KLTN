import styled from "styled-components"
import { useRef, useState, useEffect } from "react"
import { Editor } from "@monaco-editor/react"
import { CODE_SNIPPETS } from "./Constants"
import LanguageSelector from "./LanguageSelector"
import Output from "./Output"
import { useSearchParams, useParams } from "react-router-dom"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { student } from "api"
import { Snackbar } from "~/components/general"

function CodeEditor({ testcases }) {
  const editorRef = useRef();
  const [value, setValue] = useState("// Write your code here");
  const [language, setLanguage] = useState("python");
  const params = useParams()
  const [searchParam] = useSearchParams()
  const page = searchParam.get('page')
  const title = params.courseID + params.id + page
  const code = JSON.parse(sessionStorage.getItem(title))
  const userID = localStorage.getItem('userID')

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus()
  }

  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })

  const onSelect = (language) => {
    setLanguage(language)
    setValue(CODE_SNIPPETS[language])
  }

  const [progress, setProgress] = useState({
    userID: userID,
    courseID: params.courseID,
    lectureID: params.id,
    percent: 0
  })

  const updateProgress = async () => {
    const res = await student.updateProgress(progress.courseID, progress.lectureID, progress.percent)
    if (res.status == 200) {
      //
    }
    else {
      setOpenError({
        status: true,
        message: `Can't update progress for course`
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    }
  }

  useEffect(() => {
    if (userID[0] === 'S')
      updateProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.percent])

  return (
    <>
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
        <Output editorRef={editorRef} language={language} testcases={testcases} setProgress={setProgress} />
      </CodeEditorWrapper>
      {openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message} /> </> : <> </>}
    </>
  )
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
