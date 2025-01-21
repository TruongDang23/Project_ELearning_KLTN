//This is information screen of admin
import { GeneralFooter, GeneralHeader } from '~/components/general'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import ActiveList from './ActiveList'
import LockedList from './LockedList'
import Logo from '../../../assets/hdh.png'
import { admin } from 'api'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

function ManageAccount() {
  const [reload, setReload] = useState(false)
  const [activeTab, setActiveTab] = useState('Tab1')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const [active, setActive] = useState([])
  const [locked, setLocked] = useState([])

  const loadListStudent = async () => {
    const res = await admin.loadListStudent()
    if (res.status == 200) {
      setActive((prev) => [...prev, ...res.data.active])
      setLocked((prev) => [...prev, ...res.data.locked])
    }
  }

  const loadListInstructor = async () => {
    const res = await admin.loadListInstructor()
    if (res.status == 200) {
      setActive((prev) => [...prev, ...res.data.active])
      setLocked((prev) => [...prev, ...res.data.locked])
    }
  }

  useEffect(() => {
    loadListStudent()
    loadListInstructor()
  }, [reload])

  return (
    <>
      <Helmet>
        <title> Manage Account | EL-Space </title>
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
                Active
              </button>
              <button
                className={activeTab === 'Tab2' ? 'active' : ''}
                onClick={() => handleTabClick('Tab2')}
              >
                Locked
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'Tab1' && (
                <ActiveList
                  account={active}
                  reload={reload}
                  setReload={setReload}
                />
              )}
              {activeTab === 'Tab2' && (
                <LockedList
                  account={locked}
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

export default ManageAccount
