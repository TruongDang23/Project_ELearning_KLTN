import { GeneralHeader } from '~/components/general'
import FooterNew from '~/components/general/Footer/FooterNew'
import CourseBanner from './CourseBanner'
import MainAccessCourse from './MainAccessCourse'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'

import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function AccessCourse() {
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const [reload, setReload] = useState(false)
  const { courseID } = useParams()
  const [accessCourseData, setAccessCourseData] = useState()
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3000/c/loadDetailsCourse', {
        params: {
          courseID
        },
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setAccessCourseData(response.data[0])
        setIsLoad(false) //Data is loaded successfully
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        if (error.response.status === 403) navigate('/403error')
        setIsLoad(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  // console.log(accessCourseData)

  return (
    <>
      {
        //Ràng điều kiện nếu dữ liệu đang load thì ko gọi thẻ UserProfile
        //Vì react chạy bất đồng bộ nên chưa có dữ liệu mà gọi thẻ là sẽ bị null
        isLoad ? (
          <Loading />
        ) : (
          <>
            <Helmet>
              <title>
                {accessCourseData
                  ? `Course: ${accessCourseData.title} | EL-Space`
                  : 'Course Details'}
              </title>
            </Helmet>
            <GlobalStyle />
            <GeneralHeader />
            <main>
              <CourseBanner accessCourseData={accessCourseData} />
              <MainAccessCourse
                accessCourseData={accessCourseData}
                setReload={setReload}
              />
            </main>
            <FooterNew />
          </>
        )
      }
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f9f9f9 !important;
  }
`

export default AccessCourse
