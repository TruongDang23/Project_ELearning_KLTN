import React from "react";
import InforIMG from "../../../assets/dash1.png";
import styled from "styled-components";

function InforDashboard() {
  return (
    <InforDashboardWrapper>
      <div className="infor-card">
        <h3>Information</h3>
        <div className="infor-button">
          <button className="btn-edit">Edit</button>
          <button className="btn-view">View</button>
        </div>
      </div>
    </InforDashboardWrapper>
  );
}

const InforDashboardWrapper = styled.section`
  width: 100%;
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${InforIMG});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .infor-card {
    background-color: rgba(255, 255, 255, 0.8);
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.8s ease-out;
    opacity: 0;
    transform: translateY(20px);
    animation-fill-mode: forwards;

    @keyframes fadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h3 {
      font-size: 2.4rem;
      font-weight: 600;
      color: #344767;
      margin-bottom: 1.5rem;
    }

    .infor-button {
      display: flex;
      width: 100%;
      gap: 3rem;
      justify-content: center;

      .btn-edit,
      .btn-view {
        padding: 0.5rem 1rem;
        font-size: 1.6rem;
        font-weight: 600;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.05);
        }
      }

      .btn-edit {
        background-color: #0f4e8b;
        color: #fff;
        border: none;

        &:hover {
          background-color: #1971c2;
        }
      }

      .btn-view {
        background-color: #fff;
        color: #1971c2;
        outline: none;
        border: none;
        box-shadow: inset 0 0 0 2px #1971c2;

        &:hover {
          background-color: #1971c2;
          color: #fff;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .infor-card {
      width: 50%;
    }
  }

  @media screen and (max-width: 480px) {
    .infor-card {
      width: 80%;
    }
  }
`;

export default InforDashboard;
