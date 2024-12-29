//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import UserProfile from './UserProfile'
import ExtraProfile from './ExtraProfile'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loading from '~/screens/system/Loading'

import Sticky from 'react-sticky-el'

import Logo from '../../../assets/hdh.png'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function Information() {
  const [userProfile, setUserProfile] = useState()
  const navigate = useNavigate()
  const updateInformation = (newProfile) => {
    setUserProfile(newProfile)
  }
  const [isLoad, setIsLoad] = useState(true) //Data is loading
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')

  useEffect(() => {
    axios
      .get('http://localhost:3000/st/loadInformation', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setUserProfile(response.data)
        setIsLoad(false) //Data is loaded successfully
      })
      .catch((error) => {
        //Server shut down
        if (error.message === 'Network Error') navigate('/server-shutdown')
        //Connection error
        else if (error.response.status === 500) navigate('/500error')
        //Unauthorized. Need login
        else if (error.response.status === 401) navigate('/401error')
        //Forbidden. Token != userAuth
        else if (error.response.status === 403) navigate('/403error')
        else navigate('/error-get-data')
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
            <title>Information | El-Space</title>
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

const Container = styled.section`
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
