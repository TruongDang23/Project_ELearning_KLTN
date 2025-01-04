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
    social_networks: ["www.facebook.com", "www.youtube.com"],
    expertise: ["C#", "C++", "Javascript", "MERN stack"],
    self_introduce: "I have a diverse background with experience in various industries.",
    degrees: [
      {
        school: "HCMUTE",
        falcuty: "Information Technology",
        begin_time: "11/10/2000",
        end_time: "06/02/2008"
      },
      {
        school: "UIT",
        falcuty: "Machine Learning",
        begin_time: "11/10/2009",
        end_time: "06/02/2013"
      }
    ],

    working_history: [
      {
        company: "VNG",
        begin_time: "20/11/2014",
        end_time: "29/05/2021",
        description: "Senior Software Engineer"
      },
      {
        company: "FPT IS",
        begin_time: "08/04/2024",
        end_time: "07/07/2024",
        description: "Intern SAP system"
      }
    ],

    projects: [
      {
        title: "NCKH",
        link: "https://github.com/TruongDang23/Code_Mobileapp-mysql-.git",
        description: "Project mobile"
      },
      {
        title: "Website manage employee",
        link: "https://github.com/TruongDang23/projectweb.git",
        description: "Make a website to manage employee. Using JavaEE"
      }
    ],

    course_enrolled: [
      {
        courseID: "C000",
        image_introduce: "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
        title: "Database basic",
        instructor: "Nguyễn Văn A",
        star: 4,
        raters: 25,
        price: 25,
        currency: 'VND'
      },
      {
        courseID: "C001",
        image_introduce: "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
        title: "Database basic",
        instructor: "Nguyễn Văn A",
        star: 4,
        raters: 25,
        price: 25,
        currency: 'VND'
      },
      {
        courseID: "C002",
        image_introduce: "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
        title: "Database basic",
        instructor: "Nguyễn Văn A",
        star: 4,
        raters: 25,
        price: 25,
        currency: 'VND'
      },
      {
        courseID: "C003",
        image_introduce: "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
        title: "Database basic",
        instructor: "Nguyễn Văn A",
        star: 4,
        raters: 25,
        price: 25,
        currency: 'VND'
      },
      {
        courseID: "C004",
        image_introduce: "https://th.bing.com/th/id/R.e4764a69fbcdad81466dc87e56828111?rik=ssloj%2fcULHvTtA&pid=ImgRaw&r=0",
        title: "Database basic",
        instructor: "Nguyễn Văn A",
        star: 4,
        raters: 25,
        price: 25,
        currency: 'VND'
      }
    ]
  })

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  )
}