import { useState, useEffect, useRef } from 'react'
import { Box, TextField, Button, List, ListItem, Paper, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ReplayIcon from '@mui/icons-material/Replay'
import { admin, instructor, student } from "api"
import { Snackbar } from "~/components/general"
import { v4 as uuidv4 } from 'uuid'
import DOMPurify from 'dompurify'
import CircularProgress from '@mui/material/CircularProgress'

function TabChatAI() {
  const [numberConver, setNumber] = useState(0)
  const listRef = useRef(null); // Reference to the message list
  const [text, setText] = useState('')
  const [reload, setReload] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const userID = localStorage.getItem('userID')
  const [sessionID, setSessionID] = useState(uuidv4())
  const [prompt, setPrompt] = useState('Hello Chat Assistant')
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const [input, setInput] = useState([
    {
      role:  'user',
      content: 'Hello Chat Assistant'
    }
  ])

  const regexHTML = (html) => {
    const bodyRegex = /<body[^>]*>([\s\S]*?)<\/body>/i
    const match = html.match(bodyRegex)
    if (match && match[1]) {
      return match[1].trim()
    }
    return null
  }

  const listenKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  const handleClick = () => {
    setInput(
      [
        ...input,
        { role: 'user', content: text }
      ]
    )
    setIsLoading(true)
    setPrompt(text)
    setNumber(prevNum => prevNum + 1)
    setText('')
  }

  const handleReloadChat = () => {
    const newSessionID = uuidv4()
    setSessionID(newSessionID)
    setReload((prevData) => !prevData)
    setNumber(0)
    setInput([
      {
        role:  'user',
        content: 'Hello Chat Assistant'
      }
    ])
    setPrompt('Hello Chat Assistant')
  }

  const chat = async (input) => {
    let client
    switch (userID[0]) {
    case 'A':
      client = admin
      break;
    case 'I':
      client = instructor
      break;
    case 'S':
      client = student
      break;
    }
    const res = await client.chatAI(prompt, sessionID)
    if (res.status == 200) {
      setInput(
        [
          ...input,
          { role: 'assistant', content: regexHTML(res.data) }
        ]
      )
    }
    else {
      setOpenError({
        status: true,
        message: res.response.data.error.message
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    chat(input)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberConver])

  useEffect(() => {
    //Scroll to the bottom of the list whenever messages change
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [input]);

  return (
    <>
      <Box sx={{ width: '100%', margin: '0 auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <List sx={{ height: 300, overflowY: 'auto', marginBottom: 2 }} ref={listRef}>
          {input.map((message, index) => (
            <ListItem key={index} sx={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper
                sx={{
                  padding: 1,
                  backgroundColor: message.role === 'user' ? '#e0f7fa' : '#fce4ec',
                  maxWidth: '70%',
                  borderRadius: '10px',
                  lineHeight: '25px'
                }}>
                {message.role === 'assistant' ? (
                  <Box
                    sx={{
                      fontSize: '16px',
                      lineHeight: 1.8,
                      color: '#333',
                      '& p': {
                        margin: '8px 0'
                      },
                      '& ul': {
                        paddingLeft: '20px',
                        margin: '10px 0',
                        borderRadius: '8px',
                        padding: '10px 15px'
                      },
                      '& li': {
                        marginBottom: '8px',
                        listStyleType: 'circle', //'"👉 "',
                        paddingLeft: '5px'
                      },
                      '& i': {
                        marginRight: '8px',
                        color: '#1976d2'
                      }
                    }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
                  />
                ) : (
                  message.content.split('\n').map((line, lineIndex) => (
                    <Typography key={lineIndex} variant="body1" sx={{ fontSize: '16px' }}>
                      {line}
                    </Typography>
                  ))
                )}
              </Paper>
            </ListItem>
          ))}
        </List>
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={handleReloadChat}
            sx={{ marginRight: 1 }}
          >
            <ReplayIcon sx={{ fontSize: 'large' }}/>
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            InputProps={{
              sx: { fontSize: '16px' }
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={listenKeyDown}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={isLoading ? true : false}
            sx={{ marginLeft: 1 }}
          >
            {isLoading ? <CircularProgress size={20} sx={{ color: '#0d0d0d' }} /> : <SendIcon sx={{ fontSize: 'large' }}/>}
          </Button>
        </Box>
      </Box>
      { openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message}/> </> : <> </> }
    </>
  )
}

export default TabChatAI;
