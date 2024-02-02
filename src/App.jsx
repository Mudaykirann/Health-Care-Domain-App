import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import CoachSignup from './Components/CoachSignup'
import UserSignup from './Components/UserSignup'
import Coachlogin from './Components/Coachlogin'
import CoachHome from './Components/CoachHome'
import CoachSchedules from './Components/CoachSchedules'
import Coachviewprofile from './Components/Coachviewprofile'
import Userlogin from './Components/Userlogin'
import Userhome from './Components/Userhome'
import Userappointments from './Components/Userappointments'
import UserProfile from './Components/UserProfile'
import PageNotFound from './Components/PageNotFound'
import ScheduleAppointment from './Components/ScheduleAppointment'
import Reschuduleappointments from './Components/Reschuduleappointments'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='coachsignup' element={<CoachSignup />}></Route>
        <Route path='usersignup' element={<UserSignup />}></Route>
        <Route path='coachlogin' element={<Coachlogin />}></Route>
        <Route path='coachhome' element={<CoachHome />}></Route>
        <Route path='coachschedules' element={<CoachSchedules />}></Route>
        <Route path='coachviewprofile' element={<Coachviewprofile />}></Route>
        <Route path='userlogin' element={<Userlogin />}></Route>
        <Route path='userhome' element={<Userhome />}></Route>
        <Route path='userappointments' element={<Userappointments />}></Route>
        <Route path='userprofile' element={<UserProfile />}></Route>
        <Route path='scheduleappoinntment' element={<ScheduleAppointment />}></Route>
        <Route path='rescheduleappointment' element={<Reschuduleappointments />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
