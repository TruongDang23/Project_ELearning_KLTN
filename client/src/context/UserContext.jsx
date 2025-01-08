import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  //contains all information of user. Use to read faster
  const [userInfo, setUserInfo] = useState({
    //MySQL
    userID: '',
    avatar: '',
    fullname: '',
    date_of_birth: '',
    mail: '',
    street: '',
    province: '',
    country: '',
    language: '',
    role: '',
    //MongoDB
    social_networks: [],
    expertise: [],
    self_introduce: "",
    degrees: [],

    working_history: [],

    projects: [],

    course_enrolled: []
  })

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  )
}