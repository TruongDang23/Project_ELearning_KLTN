// src/UserProfile.js
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState } from 'react'
import { languages } from '~/constants/listLanguage'
import axios from 'axios'

function UserProfile({ profile, setProfile }) {
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')

  const [isReadOnly, setIsReadOnly] = useState(true)

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleSocialNetworkChange = (index, newUrl) => {
    setProfile((prevProfile) => {
      const updatedSocialNetwork = [...prevProfile.social_network]
      updatedSocialNetwork[index] = newUrl
      return {
        ...prevProfile,
        social_network: updatedSocialNetwork
      }
    })
  }

  const updateInfor = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/in/updateInformation',
        { profile },
        {
          headers: {
            Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
            user: userAuth
          }
        }
      )
      if (res.data === true) alert('Update Successfully')
      else alert('Update Failed')
    } catch (error) {
      alert('An error occurred while trying to update information.')
      //console.error(error)
    }
  }

  return (
    <ProfileContainer>
      <div className="avt">
        <img src={profile.avatar} alt="avatar" />
      </div>
      <div className="content">
        <h3>UserID: </h3>
        <Input
          type="text"
          value={profile.userID}
          isReadOnly={true}
          readOnly={true}
        />

        <h3>Full name:</h3>
        <Input
          type="text"
          value={profile.fullname}
          onChange={(e) => {
            setProfile((prevProfile) => ({
              ...prevProfile,
              fullname: e.target.value
            }))
          }}
          isReadOnly={isReadOnly}
          readOnly={isReadOnly}
        />

        <h3>Date of birth:</h3>
        <Calendar
          //onChange={handleDateChange}
          value={profile.date_of_birth}
          view="month" // Hiển thị lịch tháng
          showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
          onChange={(date) => {
            setProfile((prevProfile) => ({
              ...prevProfile,
              date_of_birth: formatDate(date)
            }))
          }}
          disabled={isReadOnly}
        />

        <h3>Location:</h3>
        <div className="location">
          <Input
            type="text"
            value={profile.street}
            onChange={(e) => {
              setProfile((prevProfile) => ({
                ...prevProfile,
                street: e.target.value
              }))
            }}
            isReadOnly={isReadOnly}
            readOnly={isReadOnly}
          />
          <Input
            type="text"
            value={profile.province}
            onChange={(e) => {
              setProfile((prevProfile) => ({
                ...prevProfile,
                province: e.target.value
              }))
            }}
            isReadOnly={isReadOnly}
            readOnly={isReadOnly}
          />
          <Input
            type="text"
            value={profile.country}
            onChange={(e) => {
              setProfile((prevProfile) => ({
                ...prevProfile,
                country: e.target.value
              }))
            }}
            isReadOnly={isReadOnly}
            readOnly={isReadOnly}
          />
        </div>

        <h3>Language:</h3>
        <div className="language-select">
          <select
            id="language"
            value={profile.language}
            className="language-select"
            disabled={isReadOnly}
            onChange={(e) => {
              setProfile((prevProfile) => ({
                ...prevProfile,
                language: e.target.value
              }))
            }}
          >
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <h3>Social networks:</h3>
        <Input
          type="text"
          placeholder="Link to social profile"
          value={profile.social_network[0]}
          onChange={(e) => handleSocialNetworkChange(0, e.target.value)}
          isReadOnly={isReadOnly}
          readOnly={isReadOnly}
        />
        <Input
          type="text"
          placeholder="Link to social profile"
          value={profile.social_network[1]}
          onChange={(e) => handleSocialNetworkChange(1, e.target.value)}
          isReadOnly={isReadOnly}
          readOnly={isReadOnly}
        />
        <Input
          type="text"
          placeholder="Link to social profile"
          value={profile.social_network[2]}
          onChange={(e) => handleSocialNetworkChange(2, e.target.value)}
          isReadOnly={isReadOnly}
          readOnly={isReadOnly}
        />
        <Input
          type="text"
          placeholder="Link to social profile"
          value={profile.social_network[3]}
          onChange={(e) => handleSocialNetworkChange(3, e.target.value)}
          isReadOnly={isReadOnly}
          readOnly={isReadOnly}
        />

        <h3>Activity status:</h3>
        <Input
          type="text"
          value={profile.activity_status}
          isReadOnly={true}
          readOnly={true}
        />

        <div className="item-btns">
          <button
            className="item-btn save-btn"
            onClick={() => {
              setIsReadOnly(true)
              updateInfor()
            }}
          >
            Save
          </button>
          <button
            className="item-btn update-btn"
            onClick={() => setIsReadOnly(false)}
          >
            Update
          </button>
        </div>
      </div>
    </ProfileContainer>
  )
}

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: none;
  color: #333;
  font-size: 1.6rem;
  padding-left: 10px;
  background: ${(props) =>
    props.isReadOnly ? 'rgba(243, 243, 250, 0.8)' : '#f5f5f5'};
  transition: 0.3s all ease;
  cursor: ${(props) => (props.isReadOnly ? 'not-allowed' : 'text')};

  &:hover {
    box-shadow: ${(props) => (props.isReadOnly ? 'none' : '0 0 0 2px #187bce')};
  }

  &:focus,
  &:active {
    outline: none;
    box-shadow: ${(props) => (props.isReadOnly ? 'none' : '0 0 0 2px #187bce')};
  }
`

const ProfileContainer = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  background-color: #fff;
  .avt {
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
    img {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid #1971c2;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 1.6rem;
      font-weight: 700;
      color: #333;
    }
  }
  .react-calendar {
    width: 300px;
    font-size: 1.6rem;
    margin: 0 auto;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 15px;
    margin-bottom: 20px;
  }

  .react-calendar__tile {
    padding: 10px;
    border-radius: 4px;
    border: none;
    transition: background-color 0.2s;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #76baff;
  }

  .react-calendar__tile--active {
    background-color: #006edc;
    color: white;
  }

  .react-calendar__tile--now {
    background-color: #ffff76;
  }
  .language-select {
    margin-bottom: 20px;
    select {
      width: 100%;
      height: 4rem;
      padding: 8px;
      margin: 0 auto;
      font-size: 1.6rem;
      border: 1px solid #ccc;
      background: rgba(243, 243, 250, 0.8);
      border-radius: 8px;
      box-sizing: border-box;
      transition: border-color 0.3s, border-width;
      &:focus {
        border-color: #187bce;
        border-width: 2px;
        outline: none;
      }
    }
  }

  .location {
    display: flex;
    width: 90%;
    flex-direction: row;
    gap: 10px;
    justify-items: center;
    align-items: center;
    margin: 0 auto;
  }
  .item-btns {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    padding: 4px 8px 20px 18px;
    width: 90%;

    margin-top: auto;
    .item-btn {
      display: inline-block;
      font-size: 1.6rem;
      padding: 1rem 2rem;
      font-weight: 700;
      border-radius: 5px;
      text-decoration: none;
      transition: all 0.3s;

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
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }

  @media screen and (max-width: 320px) {
    width: 100%;
  }
`

export default UserProfile
