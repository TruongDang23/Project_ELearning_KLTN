// src/UserProfile.js
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useState, useRef } from 'react'
import { languages } from '~/constants/listLanguage'
import EditIcon from '@mui/icons-material/Edit'
import { userStore } from '~/context/UserStore'
import { admin } from 'api'
import { Snackbar } from "~/components/general"

function UserProfile({ profile, setUserProfile }) {
  const [isReadOnly, setIsReadOnly] = useState(true)
  const formData = useRef(new FormData())
  const userID = localStorage.getItem("userID")
  const [openError, setOpenError] = useState({
    status: false,
    message: ""
  })
  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleSocialNetworkChange = (index, newUrl) => {
    setUserProfile((prevProfile) => {
      const updatedSocialNetwork = [...prevProfile.social_network]
      updatedSocialNetwork[index] = newUrl
      return {
        ...prevProfile,
        social_network: updatedSocialNetwork
      }
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    formData.current.set(`${userID}-avatar`, file)

    if (file) {
      const objectUrl = URL.createObjectURL(file)
      //Update avatar in EditProfile screen
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        avatar: objectUrl
      }))

      //Update avatar in header
      userStore.getState().updateInfor({ avatar: objectUrl })

      // Cleanup Blob URL khi không cần nữa
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const updateInfor = async() => {
    if (!formData.current.keys().next().done) {
      //FormData has data
      const res_avatar = await admin.updateAvatar(userID, formData.current)
      console.log(res_avatar)
      if (res_avatar.status === 201) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          avatar: res_avatar.data
        }))
      }
      else {
        setOpenError({
          status: true,
          message: res_avatar.response.data.error
        })
        setTimeout(() => {
          setOpenError({
            status: false
          })
        }, 3000)
      }
    } else {
      //FormData is empty

    }
  }

  return (
    <>
      <ProfileContainer>
        <div className="avt">
          <div className="avatar-container">
            <img src={profile.avatar} alt="avatar" />
            <EditIcon sx={{ fontSize: '3rem', color: '#898989' }}
              onClick={() => document.getElementById('upload-avatar').click()}
              className="edit-icon" />
            <input
              type="file"
              id="upload-avatar"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="content">
          <h3>UserID: </h3>
          <input
            type="text"
            value={ profile.userID }
            readOnly={ true }
          />

          <h3>Full name:</h3>
          <input
            type="text"
            value={ profile.fullname }
            onChange={(e) => {
              setUserProfile((prevProfile) => ({
                ...prevProfile,
                fullname: e.target.value
              }))
            }}
            readOnly={ isReadOnly }
          />

          <h3>Date of birth:</h3>
          <Calendar
            value={ profile.date_of_birth }
            view="month" // Hiển thị lịch tháng
            showNeighboringMonth={false} // Ẩn các ngày của tháng liền kề
            onChange={(date) => {
              setUserProfile((prevProfile) => ({
                ...prevProfile,
                date_of_birth: formatDate(date)
              }))
            }}
          />

          <h3>Location:</h3>
          <div className="location">
            <input
              type="text"
              value={ profile.street }
              readOnly={ isReadOnly }
              onChange={(e) => {
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  street: e.target.value
                }))
              }}
            />
            <input
              type="text"
              value={ profile.province }
              readOnly={ isReadOnly }
              onChange={(e) => {
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  province: e.target.value
                }))
              }}
            />
            <input
              type="text"
              value={ profile.country }
              readOnly={ isReadOnly }
              onChange={(e) => {
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  country: e.target.value
                }))
              }}
            />
          </div>

          <h3>Language:</h3>
          <select
            id="language"
            value={ profile.language }
            className="language-select"
            disabled={ isReadOnly }
            onChange={(e) => {
              setUserProfile((prevProfile) => ({
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

          <h3>Social networks:</h3>
          <input
            type="text"
            placeholder='Link to social profile'
            value={ profile.social_network[0] }
            readOnly={ isReadOnly }
            onChange={(e) => handleSocialNetworkChange(0, e.target.value)}
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ profile.social_network[1] }
            readOnly={ isReadOnly }
            onChange={(e) => handleSocialNetworkChange(1, e.target.value)}
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ profile.social_network[2] }
            readOnly={ isReadOnly }
            onChange={(e) => handleSocialNetworkChange(2, e.target.value)}
          />
          <input
            type="text"
            placeholder='Link to social profile'
            value={ profile.social_network[3] }
            readOnly={ isReadOnly }
            onChange={(e) => handleSocialNetworkChange(3, e.target.value)}
          />

          <h3>Activity status:</h3>
          <input
            type="text"
            value={ profile.activity_status }
            readOnly={ true }
          />

          <div className="item-btns">
            <button className="item-btn save-btn" onClick={() => {setIsReadOnly(true); updateInfor()}}>Save</button>
            <button className="item-btn update-btn" onClick={() => setIsReadOnly(false)}>Update</button>
          </div>
        </div>
      </ProfileContainer>
      { openError.status ? <> <Snackbar vertical="bottom" horizontal="right" severity="error" message={openError.message}/> </> : <> </> }
    </>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .avt {
    align-self: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .avatar-container {
    position: relative; /* Để định vị phần tử con */
    width: 200px;
    height: 200px;
  }

  .avatar-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 40%; /* Làm tròn các góc */
  }

  .avatar-container .edit-icon {
    position: absolute;
    bottom: 10px; /* Cách đáy 10px */
    right: -10px; /* Cách phải 10px */
    cursor: pointer; /* Thêm hiệu ứng khi hover */
  }
  .content{
    margin-left: 50px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 2.2rem;
      color: #898989;
    }
    input {
      width: 90%;
      height: 50px;
      padding: 8px;
      font-size: 2rem;
      border: 1px solid #ccc;
      border-radius: 15px;
      transition: border-color 0.3s, border-width 0.3s;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    input:focus{
      border-color: #187BCE; 
      border-width: 2px;
      outline: none; /* Loại bỏ viền mặc định của trình duyệt */
    }
  }
  .react-calendar {
    width: 300px;
    font-size: 1.8rem;
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
    width: 90%;
    height: 50px;
    padding: 8px;
    font-size: 2.2rem;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s, border-width;
  }

  .language-select:focus {
    border-color: #187BCE;
    border-width: 2px;
    outline: none;
  }
  .location{
    display:flex;
    width: 90%;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
    input {
      margin: 0 5px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 15px;
      box-sizing: border-box;
    }
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
      font-size: 2.2rem;
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
        border: 1px solid #1971c2;
        margin-left: 10px;
        &:hover {
          background-color: #1971c2;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
  }
`;

export default UserProfile;
