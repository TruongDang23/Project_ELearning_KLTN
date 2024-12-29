// src/UserProfile.js
import styled from 'styled-components'
import { Items } from './ActiveItem'

function ActiveList({ account, reload, setReload }) {
  return (
    <>
      {account.length === 0 && <Heading>No account created</Heading>}
      {account.map((accountItem) => (
        <Items
          key={accountItem.userID}
          accountItem={accountItem}
          reload={reload}
          setReload={setReload}
        />
      ))}
    </>
  )
}

const Heading = styled.h1`
  text-align: center;
  margin-top: 20px;
  font-size: 2.4rem;
  font-weight: 700;
`

export default ActiveList
