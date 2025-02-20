import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import Heading from './Heading'
import MainMyLearning from './MainMyLearning'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import Logo from '../../../assets/hdh.png'
import { useState, useEffect } from 'react'
import Loading from '~/screens/system/Loading'
import { userStore } from '~/context/UserStore'
import { student } from 'api'

function MyLearning() {
  const { updateInfor } = userStore()
  const [userMyLearning, setUserMyLearning] = useState()
  const [isLoad, setIsLoad] = useState(true)
  const userID = localStorage.getItem('userID')

  const getInformation = async (userID) => {
    let userInfo = await student.getInformation(userID)

    if (userInfo) {
      updateInfor(userInfo.data)
      setUserMyLearning(userInfo.data.mylearning)
      setIsLoad(false)
    }
  }

  useEffect(() => {
    if (userID) {
      getInformation(userID)
    }
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
