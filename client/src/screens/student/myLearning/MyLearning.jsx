import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import Heading from './Heading'
import MainMyLearning from './MainMyLearning'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import Logo from '../../../assets/hdh.png'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Loading from '~/screens/system/Loading'

function MyLearning() {
  const [userMyLearning, setUserMyLearning] = useState()
  const navigate = useNavigate()

  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')

  useEffect(() => {
    axios
      .get('http://localhost:3000/st/loadMyLearning', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        console.log(response.data)
        setUserMyLearning(response.data)
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
  }, [])

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>My Learning | EL-Space</title>
          </Helmet>
          <GlobalStyle />
          <GeneralHeader />
          <MyLearningWrapper>
            <Heading />
            <MainMyLearning dataCourseMyLearning={userMyLearning} />
          </MyLearningWrapper>
          <GeneralFooter />
        </>
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
body {
    background-color: #F1F3F5 !important;
  }
`
const MyLearningWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export default MyLearning
