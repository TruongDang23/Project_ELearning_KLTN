import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Snackbar } from '~/components/general'
import CloseIcon from '@mui/icons-material/Close'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { anonymous } from 'api'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await anonymous.forgotPassword(email)
      setMessage(res.data.message)
      setOpenSuccess(true)
      setTimeout(() => setOpenSuccess(false), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.')
      setOpenError(true)
      setTimeout(() => setOpenError(false), 3000)
    }
  }

  return (
    <ForgotPasswordWrapper>
      <div className="wrapper">
        <div className="container">
          <div className="content">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-email">
                <label>
                  Email: <span>*</span>
                </label>
                <div className="input-box">
                  <input
                    type="email"
                    id="email"
                    placeholder="example@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="button">
                <button type="submit" className="button-submit">
                  <MailOutlineIcon
                    sx={{ paddingRight: '10px', fontSize: 35, color: '#fff' }}
                  />
                  Send
                </button>
                <Link to="/login">
                  <button className="button-cancel">
                    <CloseIcon
                      sx={{ paddingRight: '10px', fontSize: 35, color: 'red' }}
                    />
                    Back
                  </button>
                </Link>
              </div>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
      {openSuccess && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="success"
          message="Email sent successfully!"
        />
      )}
      {openError && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={message}
        />
      )}
    </ForgotPasswordWrapper>
  )
}

const ForgotPasswordWrapper = styled.section`
  .wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        rgba(24, 123, 206, 0.5),
        rgba(243, 243, 250, 0.5)
      );
      animation: gradientShift 7s infinite alternate;
      z-index: 1;
    }
  }

  @keyframes gradientShift {
    0% {
      transform: translateY(-20%);
    }
    100% {
      transform: translateY(20%);
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 500px;
    height: auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;
    z-index: 2;
    position: relative;

    .content {
      width: 100%;
      text-align: center;

      h1 {
        color: #187bce;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }

      .input-email {
        margin-bottom: 15px;

        label {
          color: #333;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 10px;
          display: block;
          text-align: left;

          span {
            color: red;
          }
        }

        .input-box {
          input {
            width: 100%;
            height: 40px;
            border-radius: 5px;
            border: none;
            color: #187bce;
            font-size: 1.6rem;
            font-style: normal;
            line-height: normal;
            padding-left: 10px;
            background: rgba(243, 243, 250, 0.8);
            transition: 0.3s all ease;

            &:hover {
              box-shadow: 0 0 0 2px #187bce;
            }

            &:focus,
            &:active {
              outline: none;
              box-shadow: 0 0 0 2px #187bce;
            }
          }
        }
      }

      .button {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 0 auto;
        margin-top: 40px;
        justify-content: center;

        .button-submit {
          background-color: #187bce;
          color: #fff;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          transition: 0.3s all ease;

          &:hover {
            background-color: #0d5aa7;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
        }

        a {
          text-decoration: none;
        }

        .button-cancel {
          background-color: #fff;
          color: #187bce;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          transition: 0.3s all ease;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;

          &:hover {
            box-shadow: 0 0 0 2px #1971c2;
          }
        }
      }

      .message {
        margin-top: 1rem;
        font-size: 1.6rem;
        color: #333;
        font-weight: 700;
        text-align: center;
      }
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 90%;
      padding: 20px;

      .content {
        .button {
          flex-direction: column;
          gap: 10px;

          .button-submit,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 10px;

      .content {
        h1 {
          font-size: 24px;
        }

        .input-email label {
          font-size: 1.6rem;
        }

        .input-box input {
          font-size: 1.4rem;
        }

        .button-submit,
        .button-cancel {
          font-size: 1.6rem;
        }
      }
    }
  }
`

export default ForgotPassword
