import { Route, Routes } from 'react-router-dom'
import Signup from './signup/signup'
import Login from './login/login'
import Welcome from './welcome/welcome'
import UnauthorizedPage from './401error'
import ForbiddenPage from './403error'
import ConnectError from './500error'
import ServerShutdownPage from './ServerShutdown'
import ErrorGetData from './ErrorGetData'
import Notication from '~/components/general/notification/Notication'
/* index.jsx của các folder: system, admin, student, teacher có nhiệm vụ
  tạo route để hiển thị các màn hình tương ứng theo từng folder */

// Sử dụng thư viện react-router-dom để tạo các route
function System () {
  return (
    <>
      {/* Để tạo route thì cần import màn hình cần có và đặt url cho màn hình đó
        VD: /signup thì gọi ra màn hình Signup */}
      <Routes>
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/signup' element = {<Signup/>} />
        <Route path = '/' element = {<Welcome/>} />
        <Route path = '/401error' element = {<UnauthorizedPage/>} />
        <Route path = '/403error' element = {<ForbiddenPage/>} />
        <Route path = '/500error' element = {<ConnectError/>} />
        <Route path = '/error-get-data' element = {<ErrorGetData/>} />
        <Route path = '/server-shutdown' element = {<ServerShutdownPage/>} />
        <Route path = '/notification' element = {<Notication/>} />
      </Routes>
    </>
  )
}

export default System