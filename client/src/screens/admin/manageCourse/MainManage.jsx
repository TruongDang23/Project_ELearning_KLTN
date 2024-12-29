//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import PublishedCourse from './PublishedCourse'
import MonitoringCourse from './Monitoring'
import TerminatedCourse from './Terminated'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../assets/hdh.png'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function ManageCourse() {
  const token = sessionStorage.getItem('token')
  const userAuth = sessionStorage.getItem('userAuth')
  const [reload, setReload] = useState(false)
  const [activeTab, setActiveTab] = useState('Tab1')
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const [pub, setPub] = useState([])
  const [monitor, setMonitor] = useState([])
  const [ter, setTer] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/c/getPublishCourse', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setPub(response.data)
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
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  useEffect(() => {
    axios
      .get('http://localhost:3000/c/getMonitorCourse', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setMonitor(response.data)
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
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  useEffect(() => {
    axios
      .get('http://localhost:3000/c/getTerminateCourse', {
        headers: {
          Token: token, // Thêm token và user vào header để đưa xuống Backend xác thực
          User: userAuth
        }
      })
      .then((response) => {
        setTer(response.data)
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
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return (
    <>
      <Helmet>
        <title>Manage Course | EL-Space</title>
      </Helmet>
      <GeneralHeader />
      <MainManageWrapper>
        <Container className="container">
          <div className="tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === 'Tab1' ? 'active' : ''}
                onClick={() => handleTabClick('Tab1')}
              >
                Published
              </button>
              <button
                className={activeTab === 'Tab2' ? 'active' : ''}
                onClick={() => handleTabClick('Tab2')}
              >
                Monitoring
              </button>
              <button
                className={activeTab === 'Tab3' ? 'active' : ''}
                onClick={() => handleTabClick('Tab3')}
              >
                Terminated
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'Tab1' && (
                <PublishedCourse
                  course={pub}
                  reload={reload}
                  setReload={setReload}
                />
              )}
              {activeTab === 'Tab2' && (
                <MonitoringCourse
                  course={monitor}
                  reload={reload}
                  setReload={setReload}
                />
              )}
              {activeTab === 'Tab3' && (
                <TerminatedCourse
                  course={ter}
                  reload={reload}
                  setReload={setReload}
                />
              )}
            </div>
          </div>
        </Container>
      </MainManageWrapper>
      <GeneralFooter />
    </>
  )
}

const MainManageWrapper = styled.main`
  background-image: url(${Logo});
  background-repeat: repeat;
  background-size: auto;
  background-attachment: fixed;
  min-height: 100vh;
`

const Container = styled.section`
  .tabs {
    min-width: 800px;
    padding: 50px 0px;
    border-radius: 8px;
  }

  .tab-buttons {
    display: flex;
    width: 50px;
    background-color: #f1f1f1;
    margin-bottom: 20px;
  }

  .tab-buttons button {
    flex: 1;
    padding: 15px;
    margin: 0px 5px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    color: #187bce;
    box-shadow: 0 0 0 2px #187bce;
    font-weight: 700;
    font-size: 1.6rem;
    transition: background-color 0.3s, color 0.3s;
  }

  .tab-buttons button:hover {
    background-color: #fff;
    color: #187bce;
  }

  .tab-buttons button.active {
    background-color: #187bce;
    color: white;
  }

  .tab-content {
    max-height: 800px;
    overflow: hidden;
    overflow-y: auto;
    padding: 20px;
  }

  .tab-content div {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
export default ManageCourse
