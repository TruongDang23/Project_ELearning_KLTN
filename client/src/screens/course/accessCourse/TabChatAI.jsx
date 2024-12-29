import axios from "axios";
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, List, ListItem, Paper, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ReplayIcon from '@mui/icons-material/Replay'

function TabChatAI() {
  const navigate = useNavigate()
  const [numberConver, setNumber] = useState(0)
  const listRef = useRef(null); // Reference to the message list
  const [text, setText] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [reload, setReload] = useState(true)

  const [input, setInput] = useState([
    {
      role:  'user',
      content: 'Hello Chat Assistant'
    }
  ])

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
    );
    setNumber(prevNum => prevNum + 1)
    setText('')
  }

  const handleReloadChat = () => {
    setReload((prevData) => !prevData)
    setNumber(0)
    setInput([
      {
        role:  'user',
        content: 'Hello Chat Assistant'
      }
    ])
  }

  useEffect(() => {
    axios.get('http://localhost:3000/chat/chatAI', {
      params: {
        input
      }
    })
      .then(response => {
        setInput(
          [
            ...input,
            { role: 'assistant', content: response.data }
          ]
        )
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
              {message.content.split('\n').map((line, lineIndex) => (
                <Typography key={lineIndex} variant="body1" sx={{ fontSize: '16px' }}>
                  {line}
                </Typography>
              ))}
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
          sx={{ marginLeft: 1 }}
        >
          <SendIcon sx={{ fontSize: 'large' }}/>
        </Button>
      </Box>
    </Box>
  );
}

export default TabChatAI;
