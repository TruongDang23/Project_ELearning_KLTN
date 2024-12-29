import { useState, useRef, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'

const PopupTerminate = ({ handleClose, course, reload, setReload }) => {
  const [dateRange, setDateRange] = useState(['', ''])
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentInput, setCurrentInput] = useState(null)
  const calendarRef = useRef()
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')

  const handleDateChange = (date) => {
    if (currentInput === 'from') {
      setDateRange([dayjs(date).format('YYYY-MM-DD hh:mm:ss'), dateRange[1]])
    } else {
      setDateRange([dateRange[0], dayjs(date).format('YYYY-MM-DD hh:mm:ss')])
    }
    setShowCalendar(false)
  }

  const handleInputClick = (input) => {
    setCurrentInput(input)
    setShowCalendar(true)
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = async() => {
    try
    {
      const res = await axios.post('http://localhost:3000/c/terminated',
        {
          course,
          dateRange
        },
        {
          headers: {
            'Token': token, // Thêm token và user vào header để đưa xuống Backend xác thực
            'user': userAuth
          }
        }
      )
      if (res.data === true)
      {
        alert('Action Successfully')
        setTimeout(() => setReload(!reload), 100);
      }
      else
        alert('Action Failed')
    }
    catch (error) {
      alert('An error occurred while trying to terminate course.')
      //console.error(error)
    }
  }
  return (
    <>
      <WrapperPopup>
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={handleClose}>x</span>
            <label>
              <h1>The course <strong>{course}</strong> will be terminated</h1>
            </label>
            <h3>From:</h3>
            <input
              type="text"
              value={dateRange[0]}
              readOnly
              onClick={() => handleInputClick('from')}
            />
            <h3>To:</h3>
            <input
              type="text"
              value = { (dateRange[1] == '' ? 'Permanently' : dateRange[1])}
              readOnly
              onClick={() => handleInputClick('to')}
            />

            {showCalendar && (
              <div ref={calendarRef} className='show-calendar'>
                <Calendar
                  onChange={handleDateChange}
                  value={currentInput === 'from' ? dateRange[0] : dateRange[1]}
                  selectRange={false}
                />
              </div>
            )}

            <div className="item-btns">
              <button className="item-btn" onClick={() => {
                handleSave()
                handleClose()
              }}>Save</button>
            </div>
          </div>
        </div>
      </WrapperPopup>
    </>
  )
}

const WrapperPopup = styled.section`
  .popup-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  position: relative;
  width: 300px;
  min-height: 300px;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  
  h3{
    margin-bottom: 10px;
  }

  input{
    margin-bottom: 10px;
    font-size: 1.8rem;
    padding: 5px;
    border-radius: 10px;
    border-width: 1px #ccc;
    cursor: pointer;
  }

  .show-calendar{
    position: 'absolute';
    top: '50%';
    left: '50%';
    transform: 'translate(-50%, -50%)';
    background-color: 'white';
    padding: '10px';
    border: '1px solid #ccc';
    border-radius: '4px';
    box-shadow: '0 4px 8px rgba(0,0,0,0.1)';
    margin-bottom: 10px;
  }
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 2rem;
}

.item-btns {
  button {
    margin-left:90px;
    font-size: 2.2rem;
    padding: 1rem 2rem;
    font-weight: 700;
    border-radius: 5px;
    transition: all 0.3s;
    background-color: #1971c2;
    color: #fff;
    border: none;
    &:hover {
      background-color: #155b96;
      transition: all 0.3s;
    }
  }
}

label{
  display: flex;
  justify-content: center;
  h1{
    color: #E20000;
    text-align: center;
    strong{
      font-weight: bold;
    }
  }
}
`
export default PopupTerminate;