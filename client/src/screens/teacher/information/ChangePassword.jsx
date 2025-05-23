import styled from 'styled-components'
import ChangePasswordModal from './ChangePasswordModal'
import { useState } from 'react'
function ChangePassword({ userID }) {
  const [openChangePass, setOpenChangePass] = useState(false)

  return (
    <Wrapper>
      <h3>Change Password</h3>
      <p>
        Please click the button below to open the password change form. After
        submitting your new password, you will need to use it the next time you
        log in.
      </p>
      <div className="footer-btn">
        <btn
          className="item-btn save-btn"
          onClick={() => setOpenChangePass(true)}
        >
          Change
        </btn>
      </div>
      <ChangePasswordModal
        open={openChangePass}
        onClose={() => setOpenChangePass(false)}
        userID={userID}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #187bce;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
  }

  .footer-btn {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .item-btn {
    display: inline-block;
    font-size: 1.6rem;
    padding: 1rem 2rem;
    font-weight: 700;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;

    &.save-btn {
      background-color: #1971c2;
      color: #fff;
      border: none;
      &:hover {
        background-color: #155b96;
        transition: all 0.3s;
      }
    }

    &.update-btn {
      background-color: #fff;
      color: #1971c2;
      border: 2px solid #1971c2;
      margin-left: 10px;
      &:hover {
        background-color: #1971c2;
        color: #fff;
        transition: all 0.3s;
      }
    }
  }
`

export default ChangePassword
