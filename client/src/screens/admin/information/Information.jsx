//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import UserActivity from './HistoryActivity'
import { useState } from 'react'
import Loading from "~/screens/system/Loading";
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
      {
        isLoad ? (<Loading/>) :
          (
            <>
              <div>
                <Helmet>
                  <title> Information | EL-Space</title>
                </Helmet>
                <GeneralHeader />
                <main>
                  <Container>
                    <LeftPane>
                      <UserProfile profile={userProfile} setUserProfile={updateInformation} />
                    </LeftPane>
                    <RightPane>
                      <UserActivity profile={ userProfile } />
                    </RightPane>
                  </Container>
                </main>
                <GeneralFooter />
              </div>
            </>
          )
      }
    </>
  )
}

export default Information
const Container = styled.div`
  width: 1450px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 4.8rem;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 992px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 95%;
    flex-direction: column;
    height: auto;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const RightPane = styled.div`
  flex: 2;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow-y: auto;

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #ddd;
  }
`;

const LeftPane = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;