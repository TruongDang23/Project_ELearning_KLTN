import styled from "styled-components"
import { useState } from "react"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const PopupWork = ({ handleClose, handleSave }) => {
  const [working, setWorking] = useState({
    company: '',
    description: '',
    begin_time: '',
    end_time: ''
  })

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <WrapperPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>x</span>
          <h1>Add Working History</h1>
          <h2>Company</h2>
          <input onChange={(e) => setWorking((degree => ({
            ...degree,
            company: e.target.value
          })))} />

          <h2>Description</h2>
          <input onChange={(e) => setWorking((degree => ({
            ...degree,
            description: e.target.value
          })))} />

          <h2>Period:</h2>
          <span>
            <Calendar
              //onChange={handleDateChange}
              //value={'2003-05-01'}
              view="month" // Hiển thị lịch tháng
              showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
              onChange={(date) => {
                setWorking((degree) => ({
                  ...degree,
                  begin_time: formatDate(date)
                }))
              }}
            />
            <Calendar
              //onChange={handleDateChange}
              //value={'2003-05-01'}
              view="month" // Hiển thị lịch tháng
              showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
              onChange={(date) => {
                setWorking((degree) => ({
                  ...degree,
                  end_time: formatDate(date)
                }))
              }}
            />
          </span>
          <div className="item-btns">
            <button className="item-btn" onClick={() => {
              handleSave((prev) => ({
                ...prev,
                working_history: [...prev.working_history, working]
              })),
              handleClose()
            }}>Save</button>
          </div>
        </div>
      </div>
    </WrapperPopup>
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
  width: 800px;
  height: 700px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 2rem;
}

input {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  height: 50px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  display:flex;
  align-items: center;
  font-size: 1.8rem
}

.item-btns {
  button {
    margin-left: 43%;
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

span {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.react-calendar {
  width: 300px;
  font-size: 1.8rem;
  border: none;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 15px;
  margin: 0 auto;
}

.react-calendar__tile {
  padding: 10px;
  border-radius: 4px;
  border: none;
  transition: background-color 0.2s;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #76baff;
}

.react-calendar__tile--active {
  background-color: #006edc;
  color: white;
}

.react-calendar__tile--now {
  background-color: #ffff76;
}
`
export default PopupWork;