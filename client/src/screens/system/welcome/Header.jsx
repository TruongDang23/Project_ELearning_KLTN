import styled from "styled-components";
import { Link } from "react-router-dom";
function Header() {
  return (
    <Navbar>
      <a className="brand">
        <img
          src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
          alt="Udemy Logo"
        />
      </a>
      <div className="navLinks">
        <a href="#" className="link">
          Categories
        </a>
        <div className="searchBox">
          <input type="text" placeholder="Search for anything" />
          <a href="search">
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="Search Icon"
            />
          </a>
        </div>
        <a href="#" className="link">
          Teach on Udemy
        </a>
        <a href="#" className="link">
          My learning
        </a>
      </div>
      <div className="authButtons">
        <Link to="/login">
          <button className="login">Log in</button>
        </Link>

        <Link to="/signup">
          <button className="signup">Sign up</button>
        </Link>
      </div>
    </Navbar>
  );
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 2px 2px 8px rgba(40, 44, 51, 0.2) !important;

  .brand {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      margin-right: 10px;
    }
  }

  .navLinks {
    display: flex;
    align-items: center;
    gap: 20px;

    .link {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        color: #1971c2;
        transition: all 0.3s;
      }
    }

    .searchBox {
      display: flex;
      font-size: 16px;
      align-items: center;
      padding: 5px 10px;
      border: 1px solid #1971c2;
      border-radius: 5px;
      background-color: #fff;

      input {
        border: none;
        outline: none;
        background: none;
        padding: 5px;
        width: 400px;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .authButtons {
    display: flex;
    align-items: center;
    gap: 10px;

    .login,
    .signup {
      padding: 8px 15px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
    }

    .login {
      background-color: #fff;
      color: #1971c2;
      border: 2px solid #1971c2;

      &:hover,
      &:visited {
        background-color: #1971c2;
        color: #fff;
        transition: all 0.3s;
      }
    }

    .signup {
      background-color: #1971c2;
      color: #fff;
      border: none;

      &:hover,
      &:visited {
        background-color: #155b96;
        transition: all 0.3s;
      }
    }
  }
`;

export default Header;
