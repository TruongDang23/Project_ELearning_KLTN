import styled from 'styled-components'
import { useState } from 'react'

const PopupExp = ({ handleClose, handleSave }) => {
  const [newValue, setValue] = useState('')

  return (
    <WrapperPopup>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}>
            x
          </span>
          <h1>Add Expertise</h1>
          <input onChange={(e) => setValue(e.target.value)} />
          <div className="item-btns">
            <button
              className="item-btn"
              onClick={() => {
                handleSave((prev) => ({
                  ...prev,
                  expertise: [...prev.expertise, newValue]
                }))
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
    padding: 20px;
    background: #fff;
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
      margin-left: 90px;
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
`
export default PopupExp
