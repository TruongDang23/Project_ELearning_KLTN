/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from "@mui/material";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

function Output({ editorRef, language, testcases, setProgress }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const num_topics = JSON.parse(sessionStorage.getItem('assignment')).topics.length
  const params = useParams()
  const [searchParam] = useSearchParams()
  const title = params.courseID + params.id + searchParam.get('page')
  const [output, setOutput] = useState();


  const handleProgress = () => {
    let num_correct = 0
    for (let i = 1; i <= num_topics; i++) {
      let key = params.courseID + params.id + i
      let value = JSON.parse(sessionStorage.getItem(key))

      if (value !== null) {
        if (value.result === 'Accepted') {
          num_correct = num_correct + 1
        }
      }
    }

    setProgress((prev) => ({
      ...prev,
      percent: (num_correct*100 / num_topics).toFixed(1)
    }))
  }

  useEffect(() => {
    const code = JSON.parse(sessionStorage.getItem(title))
    const isNull = (code === null) ? null : code.result
    if (isNull === 'Accepted') {
      setIsError(false)
    } else if (isNull !== null) {
      setIsError(true)
    }
    setOutput(isNull)
  }, [title])

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try
    {
      setIsLoading(true)
      const res = await axios.post('http://localhost:3000/c/acceptAssignment',
        { language, sourceCode, testcases },
        {
          headers: {
            'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
            'user': userAuth
          }
        }
      )
      if (res.data === true)
      {
        let result = 'Accepted'
        sessionStorage.setItem(title, JSON.stringify({ sourceCode, result }))
        handleProgress()
        setOutput(result)
        setIsError(false)
      }
      else
      {
        let result = 'Wrong answer at testcase: ' + res.data.testcase + '\n' +
                      'Expected: ' + res.data.expected + '\n' +
                      'Found: ' + res.data.found
        sessionStorage.setItem(title, JSON.stringify({ sourceCode, result }))
        setOutput(result);
        setIsError(true);
      }
    }
    catch (error) {
      setErrorMessage(error.message || "Unable to run code");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OutputWrapper>
      <Box sx={{ width: "100%" }}>
        <Button
          variant="outlined"
          onClick={runCode}
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Run Code"}
        </Button>
        <Box
          sx={{
            height: "10rem",
            p: 2,
            color: isError ? "error.main" : "#4CAF50",
            borderRadius: 1,
            borderColor: isError ? "error.main" : "grey.500",
            overflow: "auto",
            backgroundColor: "#1e1e1e",
            fontSize: "1.6rem",
            whiteSpace: "pre-wrap",
            lineHeight: "2rem"
          }}
        >
          {output
            ? output
            : (
              <>
                <p style={{ color:'#e3e3e3' }}>Click "Run Code" to see the output here</p>
              </>
            )}
        </Box>
        <Snackbar
          open={isError && !!errorMessage}
          autoHideDuration={6000}
          onClose={() => setIsError(false)}
        >
          <Alert
            onClose={() => setIsError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </OutputWrapper>
  );
}

const OutputWrapper = styled.section`
  grid-column: 2 / 3;
  width: 100%;
  margin-top: 1rem;


  button {
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
    background-color: #fff;
    color: #1971c2;
    box-shadow: 0 0 0 1px #1971c2;
    &:hover {
      background-color: #1971c2;
      color: #fff;
      transition: all 0.3s;
    }
  }

  h6 {
    font-size: 1.6rem;
  }
`;

export default Output;
