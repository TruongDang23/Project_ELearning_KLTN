import { GeneralFooter, GeneralHeader } from '~/components/general'
import ListNotifications from './ListNotifications'
import { NotificationProvider } from '../../../context/NotificationContext'
import Logo from '../../../assets/hdh.png'
import Sticky from 'react-sticky-el'
import { Helmet } from 'react-helmet'

import styled from 'styled-components'

function Notication() {
  return (
    <>
      <Helmet>
        <title>Notifications</title>
      </Helmet>
      <Sticky disabled={window.innerWidth <= 768}>
        <GeneralHeader />
      </Sticky>
      <WelcomeWrapper>
        <NotificationProvider>
          <ListNotifications />
        </NotificationProvider>
      </WelcomeWrapper>
      <GeneralFooter />
    </>
  )
}

const WelcomeWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

export default Notication
