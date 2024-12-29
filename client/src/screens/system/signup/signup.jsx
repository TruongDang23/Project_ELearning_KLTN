import imgLogin from "../assets/image_signup_new.png";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang


function Signup() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const hashPassword = (password) => {
    return CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);
  };

  const typeRepass = (e) => {
    setRepass(e.target.value);
    if (e.target.value !== pass) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
    }
  };

  const createUser = async () => {
    try {
      const hassed = hashPassword(pass);
      const res = await axios.post("http://localhost:3000/s/signup", {
        username,
        pass: hassed,
        role
      });
      if (res.data === true) alert("Signup Successfully");
      else alert("Signup Failed");
    } catch (error) {
      alert("An error occurred while trying to sign up.");
      //console.error(error)
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | EL-Space</title>
      </Helmet>
      <SignupWrapper>
        <div className="wrapper">
          <div className="container">
            <div className="image">
              <img src={imgLogin} alt="Image" />
            </div>
            <div className="content">
              <h1>Sign Up</h1>
              <div className="input-username">
                <label>
                  Username/Email <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <PersonOutlineIcon
                    sx={{
                      width: "55px",
                      fontSize: 40,
                      color: "#187BCE",
                      paddingLeft: "10px",
                      paddingRight: "10px"
                    }}
                    className="icon"
                  />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-pass">
                <label>
                  Password <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <LockIcon
                    sx={{
                      width: "55px",
                      fontSize: 40,
                      color: "#187BCE",
                      paddingLeft: "10px",
                      paddingRight: "10px"
                    }}
                    className="icon"
                  />
                  <input
                    type="password"
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-repass">
                <label>
                  Re-password <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <LockIcon
                    sx={{
                      width: "55px",
                      fontSize: 40,
                      color: "#187BCE",
                      paddingLeft: "10px",
                      paddingRight: "10px"
                    }}
                    className="icon"
                  />
                  <input
                    type="password"
                    required
                    value={repass}
                    onChange={typeRepass}
                  />
                </div>
              </div>

              <div className="role">
                <label>
                  <input
                    type="radio"
                    value="Student"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    value="Instructor"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="custom-radio"></span>
                  Instructor
                </label>
                {/* <label>
                  <input
                    type="radio"
                    value="Admin"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
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
                <button onClick={createUser} className="button-login">
                  <PersonAddAltIcon
                    sx={{ paddingRight: "10px", fontSize: 35 }}
                  />
                  Create
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
              <div className="forgot">
                <label>
                  If you have an account <a href="/login">Login now</a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </SignupWrapper>
    </>
  );
}

const SignupWrapper = styled.section`
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
    height: 600px;
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
      h1 {
        color: #187bce;
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        line-height: 1.6;
      }

      .input-username,
      .input-pass,
      .input-repass {
        margin-bottom: 15px;
        label {
          color: #333;
          font-size: 2rem;
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

      .role {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        font-weight: 700;
        width: 300px;
        margin: 30px auto 0;
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
        margin-top: 20px;
        font-size: 1.6rem;
        text-align: center;

        a {
          font-size: 1.6rem;
          font-weight: 700;
          color: #187bce;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
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
        .input-pass .input-box input,
        .input-repass .input-box input {
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
      .content .input-pass label,
      .content .input-repass label {
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

export default Signup;
