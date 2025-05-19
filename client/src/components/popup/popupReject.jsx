import styled from "styled-components"
import CancelIcon from '@mui/icons-material/Cancel'
import { admin } from 'api'
import { useState } from "react"

const PopupReject = ({ handleClose, course, setReload }) => {
  const [reason, setReason] = useState('')

  const handleInputReason = (e) => {
    setReason(e.target.value)
  }

  const handleSave = async() => {
    const res = await admin.rejectCourse(course, reason)
    if (res.status == 200)
      setReload(prev => !prev)
  }
  return (
    <WrapperPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>x</span>
          <label>
            <CancelIcon sx={{ color: '#E20000', fontSize: '3.0rem', margin: 'auto' }}/>
            <h1>The course <strong>{course}</strong> will be rejected</h1>
          </label>
          <h3>Reason:</h3>
          <input
            type="text"
            placeholder='Reason...'
            value={reason}
            onChange={handleInputReason}
          />
          <div className="item-btns">
            <button className="item-btn" onClick={() => {
              handleSave()
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
  width: 300px;
  height: 230px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: #fff;
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
`
export default PopupReject;