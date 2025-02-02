import styled, { createGlobalStyle } from 'styled-components'

import { GeneralHeader } from '~/components/general'
import { GeneralFooter } from '~/components/general'
import Heading from './Heading'
import MainMyLearning from './MainMyLearning'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import Logo from '../../../assets/hdh.png'
import { useState } from 'react'
import Loading from '~/screens/system/Loading'
import { userStore } from '~/context/UserStore'

function MyLearning() {
  const myLearning = userStore((state) => state.mylearning);
  const [userMyLearning, setUserMyLearning] = useState(myLearning)
  const [isLoad, setIsLoad] = useState(false)

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
