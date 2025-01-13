//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'
import { useState } from 'react'
import Loading from '~/screens/system/Loading'
import Sticky from 'react-sticky-el'
import Logo from '../../../assets/hdh.png'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { userStore } from '~/context/UserStore'

function Information() {
  const [userProfile, setUserProfile] = useState(userStore.getState())
  const [isLoad, setIsLoad] = useState(false) //Data is loading
  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }

  return (
    <>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title>Information | EL-Space</title>
          </Helmet>
          <Sticky disabled={window.innerWidth <= 768}>
            <GeneralHeader />
          </Sticky>
          <InformationWrapper>
            <Container className="container">
              <LeftPane>
                <UserProfile
                  profile={userProfile}
                  setProfile={updateInformation}
                />
              </LeftPane>
              <RightPane>
                <ExtraProfile
                  profile={userProfile}
                  setProfile={updateInformation}
                />
              </RightPane>
            </Container>
          </InformationWrapper>
          <GeneralFooter />
        </>
      )}
    </>
  )
}

const InformationWrapper = styled.main`
  padding: 40px 20px;
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

const Container = styled.div`
  margin: 0 auto;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  border: 1px solid #ccc;

  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    margin: 0;
  }

  @media (max-width: 320px) {
    padding: 20px;
  }
`

const RightPane = styled.div`
  padding: 24px;
`

const LeftPane = styled.div`
  padding: 24px;
`

export default Information
