import styled from 'styled-components'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const PopupCre = ({ handleClose, handleSave }) => {
  const [degree, setDegree] = useState({
    school: '',
    falcuty: '',
    begin_time: '',
    end_time: ''
  })

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  return (
    <WrapperPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          <h1>Add Credential</h1>
          <h2>School:</h2>
          <input
            onChange={(e) =>
              setDegree((degree) => ({
                ...degree,
                school: e.target.value
              }))
            }
          />

          <h2>Faculty:</h2>
          <input
            onChange={(e) =>
              setDegree((degree) => ({
                ...degree,
                falcuty: e.target.value
              }))
            }
          />

          <h2>Year:</h2>
          <span>
            <Calendar
              //onChange={handleDateChange}
              //value={'2003-05-01'}
              view="month" // Hiển thị lịch tháng
              showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
              onChange={(date) => {
                setDegree((degree) => ({
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
                setDegree((degree) => ({
                  ...degree,
                  end_time: formatDate(date)
                }))
              }}
            />
          </span>
          <div className="item-btns">
            <button
              className="item-btn"
              onClick={() => {
                handleSave((prev) => ({
                  ...prev,
                  degrees: [...prev.degrees, degree]
                })),
                handleClose()
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </WrapperPopup>
  )
}

const WrapperPopup = styled.section`
  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
    color: #1971c2;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 700;
    color: #333;
  }

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
    color: #dc3545;
    font-weight: 700;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 2rem;
  }

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    color: #333;
    font-size: 1.6rem;
    font-style: normal;
    line-height: normal;
    padding-left: 10px;
    background: rgba(243, 243, 250, 0.8);
    transition: 0.3s all ease;

    &:hover {
      transition: 0.3s all ease;
      box-shadow: 0 0 0 2px #187bce;
    }

    &:focus,
    &:active {
      outline: none;
      box-shadow: 0 0 0 2px #187bce;
    }
  }

  .item-btns {
    button {
      margin-left: 43%;
      font-size: 1.6rem;
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
    font-size: 1.6rem;
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
export default PopupCre
