import styled from "styled-components"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { admin } from 'api'
import { useState } from "react"
import { Snackbar } from "~/components/general"
const PopupLockAcc = ({ handleClose, account, reload, setReload }) => {
  const [openSuccess, setOpenSuccess] = useState({
    status: false,
    message: ""
  })
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const handleSave = async() => {
    const res = await admin.lockAccount(account)
    if (res.status == 200) {
      setOpenSuccess({
        status: true,
        message: "Action successfuly"
      })
      setTimeout(() => {
        setOpenSuccess({
          status: false
        })
        setReload(!reload)
      }, 3000)
    }
    else {
      setOpenError({
        status: true,
        message: "An error occurred while trying to lock account"
      })
      setTimeout(() => {
        setOpenError({
          status: false
        })
      }, 3000)
    }
  }

  return (
    <>
      <WrapperPopup>
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={handleClose}>x</span>
            <label>
              <LockOutlinedIcon sx={{ color: '#E20000', fontSize: '3.0rem', margin: 'auto' }}/>
              <h1>User <strong>{account}</strong> will be locked</h1>
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
      { openSuccess.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="success" message={openSuccess.message}/> </> : <> </> }
      { openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message}/> </> : <> </> }
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
export default PopupLockAcc;