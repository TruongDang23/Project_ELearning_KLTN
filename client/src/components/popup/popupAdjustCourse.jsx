import styled from "styled-components"
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'
import axios from "axios"

const PopupAdjustCourse = ({ handleClose, course, reload, setReload }) => {
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')

  const handleSave = async() => {
    try
    {
      const res = await axios.post('http://localhost:3000/in/recreated',
        { course },
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
      alert('An error occurred while trying to adjust content course.')
      //console.error(error)
    }
  }

  return (
    <WrapperPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>x</span>
          <label>
            <ChangeCircleOutlinedIcon sx={{ color: '#008105', fontSize: '3.0rem', margin: 'auto' }}/>
            <h1>The course <strong>{course}</strong> will be adjust content</h1>
          </label>
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
    color: #008105;
    text-align: center;
    strong{
      font-weight: bold;
    }
  }
}
`
export default PopupAdjustCourse;