import styled from 'styled-components'
import { useState } from 'react'
import { UnLockAccount } from '~/components/popup/index'
import { Link } from 'react-router-dom'

export function Items({ accountItem, reload, setReload }) {
  const [openPopup, setopenPopup] = useState(false)

  const togglePub = () => {
    setopenPopup(!openPopup)
  }
  return (
    <>
      <Wrapper>
        <div key={accountItem.userID} className="course-item">
          <div className="image">
            <img src={accountItem.avatar} alt="image" />
          </div>

          <div className="center_infor">
            <h2>Name: {accountItem.fullname}</h2>

            <p>
              <strong>Date of birth:</strong> {accountItem.date_of_birth}
            </p>
            <p>
              <strong>Location:</strong> {accountItem.street},{' '}
              {accountItem.province}, {accountItem.country}
            </p>
            <p>
              <strong>Created Time:</strong> {accountItem.created_time}
            </p>
          </div>

          <div className="right_infor">
            <h2>UserID: {accountItem.userID}</h2>
            <p>{accountItem.role}</p>
            <div className="button">
              <a
                href={`/course/infor/${accountItem.userID}`}
                className="btn-view"
                target="_blank"
                rel="noopener noreferrer"
              >
                Show Information
              </a>
              <button onClick={togglePub} className="btn-unlock">
                UnLock Account
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
      {openPopup && (
        <UnLockAccount
          handleClose={togglePub}
          account={accountItem.userID}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  )
}

const Wrapper = styled.div`
  background-color: #fff;
  .course-item {
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;

    border-radius: 8px;
    border: 2px solid #74c0fc;
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
      transition: all ease 0.3s;
    }

    .image {
      align-self: center;
      width: 10%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .center_infor {
      width: 50%;

      h2 {
        color: #187bce;
        font-weight: bold;
        font-size: 2.4rem;
        padding-bottom: 5px;
      }
      p {
        font-size: 1.6rem;
        line-height: 1.2;
        strong {
          font-weight: 700;
        }
      }
    }

    .right_infor {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      h2 {
        color: #187bce;
        font-weight: bold;
        font-size: 2.4rem;
        padding-bottom: 5px;
        text-align: center;
      }

      p {
        font-size: 2rem;
        text-align: center;
      }

      .button {
        width: 50%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;

        button,
        a {
          text-align: center;
          text-decoration: none;
          align-self: center;
          width: 80%;
          padding: 10px;
          font-size: 1.6rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .btn-view {
          background-color: #187bce;
          color: #fff;
        }

        .btn-view:hover {
          background-color: #155b96;
        }

        .btn-unlock {
          background-color: #fff;
          color: #37b24d;
          box-shadow: 0 0 0 2px #37b24d;
        }

        .btn-unlock:hover {
          color: #fff;
          background-color: #37b24d;
        }
      }
    }
  }
`
