import imgLogin from "../assets/image_loginNew.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function Login() {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const typeUsername = (e) => {
    setUsername(e.target.value);
    setMessage("");
  };

  const typePassword = (e) => {
    setPass(e.target.value);
    setMessage("");
  };

  const typeRole = (e) => {
    setRole(e.target.value);
    setMessage("");
  };

  const hashPassword = (password) => {
    return CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);
  };

  const handleSuccess = async (response) => {
    try {
      const res = await axios.post("http://localhost:3000/s/loginWithGoogle", {
        loginCredential: response.credential
      });
      if (res.data === "error")
        setMessage("An error occurred when logging in with Google!")
      else if (res.data === "locked")
        setMessage("Your account is locked. Please choose another one")
      else {
        const { token, userID, role } = res.data;
        const userData = JSON.stringify({ userID, role })
        alert("Login successfully")
        sessionStorage.setItem(`token`, token)
        sessionStorage.setItem(`userAuth`, userData)
        navigate(`/`)
      }
    } catch (error) {
      alert("An error occurred while trying to log in.");
      //console.error(error)
    }
  };

  const handleFailure = () => {
    setMessage("An error occurred when logging in with Google!")
  };

  const checkLogin = async () => {
    try {
      const hassed = hashPassword(pass);
      const res = await axios.post("http://localhost:3000/s/login", {
        username,
        pass: hassed,
        role
      });
      if (res.data === "User are not existed")
        setMessage("Username or Password is incorrect");
      else {
        const { token, userID, role } = res.data;
        const userData = JSON.stringify({ userID, role });
        alert("Login successfully")
        sessionStorage.setItem(`token`, token)
        sessionStorage.setItem(`userAuth`, userData)
        navigate(`/`)
      }
    } catch (error) {
      alert("An error occurred while trying to log in.");
      //console.error(error)
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | EL-Space</title>
      </Helmet>
      <LoginWrapper>
        <div className="wrapper">
          <div className="container">
            <div className="image">
              <img src={imgLogin} alt="Image" />
            </div>
            <div className="content">
              <h1>Login</h1>

              <div className="input-username">
                <label>
                  Username/Email: <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <PersonOutlineIcon
                    sx={{
                      width: "10%",
                      fontSize: 40,
                      color: "#187BCE",
                      padddingLeft: "10px",
                      marginRight: "10px"
                    }}
                    className="icon"
                  />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={typeUsername}
                  />
                </div>
              </div>

              <div className="input-pass">
                <label>
                  Password: <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <LockIcon
                    sx={{
                      width: "10%",
                      fontSize: 40,
                      color: "#187BCE",
                      paddingBottom: "2px",
                      marginRight: "10px"
                    }}
                    className="icon"
                  />
                  <input
                    type="password"
                    required
                    value={pass}
                    onChange={typePassword}
                  />
                </div>
              </div>

              <div className="role">
                <label>
                  <input
                    type="radio"
                    value="Student"
                    name="role"
                    onChange={typeRole}
                  />
                  <span className="custom-radio"></span>
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    value="Instructor"
                    name="role"
                    onChange={typeRole}
                  />
                  <span className="custom-radio"></span>
                  Instructor
                </label>
                {/* <label>
                  <input
                    type="radio"
                    value="Admin"
                    name="role"
                    onChange={typeRole}
                  />
                  <span className="custom-radio"></span>
                  Admin
                </label> */}
              </div>

              {message && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginTop: "20px",
                    fontSize: "1.6rem"
                  }}
                >
                  {message}
                </p>
              )}
              <div className="button">
                <button onClick={checkLogin} className="button-login">
                  <ExitToAppIcon sx={{ paddingRight: "10px", fontSize: 35 }} />
                  Log in
                </button>
                <Link to="/">
                  <button className="button-cancel">
                    <CloseIcon
                      sx={{ paddingRight: "10px", fontSize: 35, color: "red" }}
                    />
                    Cancel
                  </button>
                </Link>
              </div>
              <GoogleOAuthProvider clientId="801061480969-6i55dvk4l281orpnv8l4tde3t8d4jrn4.apps.googleusercontent.com">
                <div className="loginGoogle">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleFailure}
                  />
                </div>
              </GoogleOAuthProvider>
              {/* <div className="forgot">
                <a href="#">Forgot Password</a>
              </div> */}
            </div>
          </div>
        </div>
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.section`
  .wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    /* Background animation */
    &::after {
      content: "";
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
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 550px;
    overflow: hidden;
    padding-left: 0px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;
    z-index: 2;
    position: relative;
    overflow: hidden;

    .image {
      width: 50%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      width: 50%;
      flex: 1;
      h1 {
        color: #187bce;
        text-align: center;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.6;
      }

      .input-username {
        margin-bottom: 15px;

        label {
          color: #333;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 10px;
          span {
            color: red;
          }
        }
        .input-box {
          input {
            width: 80%;
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
              transition: 0.3s all ease;
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

      .input-pass {
        margin-bottom: 15px;

        label {
          color: #333;
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 10px;
          span {
            color: red;
          }
        }

        .input-box {
          input {
            width: 80%;
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
              transition: 0.3s all ease;
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

      .role {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 300px;
        margin: 0 auto;
        margin-top: 30px;
        align-items: center;

        input[type="radio"] {
          display: none;
        }

        label {
          display: flex;
          align-items: center;
          cursor: pointer;

          .custom-radio {
            width: 20px;
            height: 20px;
            border: 2px solid #187bce;
            border-radius: 50%;
            margin-right: 5px;
            position: relative;
          }

          .custom-radio::after {
            content: "";
            width: 12px;
            height: 12px;
            background-color: #187bce;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.2s;
          }
        }

        /* Sửa lại selector để nó target đúng element */
        input[type="radio"]:checked + .custom-radio::after {
          opacity: 1;
        }
      }

      .button {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 0 auto;
        margin-top: 40px;
        justify-content: center;

        .button-login {
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

          &:hover {
            box-shadow: 0 0 0 2px #1971c2;
          }
        }

        @media (max-width: 1185px) {
          flex-direction: column;
          width: 100%;
          gap: 0px;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }

      .forgot {
        text-align: end;
        margin: 0px 10px;
        a {
          color: #555;
          font-size: 1.6rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          text-decoration: none;
          transition: 0.3s all ease;

          &:hover {
            color: #187bce;
            text-decoration: underline;
          }
        }
      }

      .loginGoogle {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      width: 90%;
      height: auto;
      padding: 20px;
      gap: 20px;

      .image {
        width: 100%;
        height: 250px;
      }

      .content {
        width: 100%;

        .input-username .input-box input,
        .input-pass .input-box input {
          width: 100%;
        }

        .input-box {
          .icon {
            display: none;
          }
        }

        .button {
          flex-direction: column;
          width: 100%;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }

        .role {
          width: 100%;

          label {
            width: 100%;
            justify-content: flex-start;
            margin-bottom: 10px;
          }
        }

        .forgot {
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .image {
      display: none;
    }
    .container {
      padding: 10px;

      .content .input-username label,
      .content .input-pass label {
        font-size: 1.6rem;
      }

      .content .input-box input {
        font-size: 1.4rem;
        padding-left: 5px;
      }

      .content .button-login,
      .content .button-cancel {
        font-size: 1.6rem;
      }

      .content .forgot a {
        font-size: 1.4rem;
      }
    }
  }
`;
export default Login;
