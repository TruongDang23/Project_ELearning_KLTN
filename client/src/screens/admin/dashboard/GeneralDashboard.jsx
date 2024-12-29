import styled from "styled-components";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DnsIcon from "@mui/icons-material/Dns";
import PaidIcon from "@mui/icons-material/Paid";
import ChatIcon from "@mui/icons-material/Chat";

function GeneralDashboard() {
  return (
    <GeneralDashboardWrapper>
      <h3>General</h3>
      <div className="general-card-list">
        <div className="general-card">
          <div className="general-icon">
            <span id="user">
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Instructor</h4>
            <p>1000</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="course">
              <PersonalVideoIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Courses</h4>
            <p>1000</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="student">
              <LocalLibraryIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Students</h4>
            <p>1000</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="category">
              <DnsIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Categories</h4>
            <p>3</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="money">
              <PaidIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Income</h4>
            <p>1000$</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="review">
              <ChatIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Review</h4>
            <p>2000</p>
          </div>
        </div>
      </div>
    </GeneralDashboardWrapper>
  );
}

const GeneralDashboardWrapper = styled.section`
  padding: 3rem;

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }

  .general-card-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;

    .general-card {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);

      &:nth-child(odd) {
        animation-delay: 0.2s;
      }

      &:nth-child(even) {
        animation-delay: 0.4s;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .general-content {
        padding: 0 1rem;

        h4 {
          font-size: 1.6rem;
          font-weight: 200;
        }

        p {
          font-size: 2.4rem;
          font-weight: 600;
          color: rgb(52, 71, 103);
        }
      }

      .general-icon #user,
      .general-icon #course,
      .general-icon #student,
      .general-icon #category,
      .general-icon #money,
      .general-icon #review {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        opacity: 1;
        margin-top: -25px;
        border-radius: 0.75rem;
        box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
          rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      }

      .general-icon #user {
        background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
        color: rgb(255, 255, 255);
      }

      .general-icon #course {
        background: linear-gradient(
          195deg,
          rgb(73, 163, 241),
          rgb(26, 115, 232)
        );
        color: rgb(255, 255, 255);
      }

      .general-icon #student {
        background: linear-gradient(
          195deg,
          rgb(255, 183, 77),
          rgb(255, 109, 0)
        );
        color: rgb(255, 255, 255);
      }

      .general-icon #category {
        background: linear-gradient(195deg, rgb(0, 184, 148), rgb(0, 206, 201));
        color: rgb(255, 255, 255);
      }

      .general-icon #money {
        background: linear-gradient(
          195deg,
          rgb(236, 64, 122),
          rgb(216, 27, 96)
        );
        color: rgb(255, 255, 255);
      }

      .general-icon #review {
        background: linear-gradient(195deg, rgb(255, 938, 0), rgb(255, 152, 0));
        color: rgb(255, 255, 255);
      }
    }
  }

  @media (max-width: 768px) {
    .general-card-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    .general-card-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default GeneralDashboard;
