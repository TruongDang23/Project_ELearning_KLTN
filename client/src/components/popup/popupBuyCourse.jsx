import styled from "styled-components"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'

const PopupBuyCourse = ({ handleClose, status }) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/student/my-learning')
  }
  return (
    <>
      {status === 'created' ? (
        <WrapperPopup>
          <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={handleClose}>x</span>
              <label>
                <ShoppingCartIcon sx={{ color: '#008105', fontSize: '5.0rem', margin: 'auto' }} />
                <h1>Enrolled Successfully</h1>
              </label>
              <div className="item-btns">
                <button className="item-btn" onClick={handleNavigate}>
                  My Learning
                </button>
              </div>
            </div>
          </div>
        </WrapperPopup>
      ) : status === 'enrolled' ? (
        <WrapperPopup>
          <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={handleClose}>x</span>
              <label>
                <ShoppingCartIcon sx={{ color: '#ff9800', fontSize: '5.0rem', margin: 'auto' }} />
                <h1 style={{ color: '#ff9800' }}>You Are Already Enrolled</h1>
              </label>
            </div>
          </div>
        </WrapperPopup>
      ) : null}
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
    margin-left: 50px;
    font-size: 2.0rem;
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
export default PopupBuyCourse;