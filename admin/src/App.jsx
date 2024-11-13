import React, { useContext } from 'react'
import Login from './pages/Login'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddDoctor from './pages/Admin/AddDoctor'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import Appointments from './pages/Doctor/Appointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import LoadingBar from 'react-top-loading-bar'
import { AppContext } from './context/AppContext'

const App = () => {
  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  const {progress,setProgress}=useContext(AppContext)
 
  return dToken||aToken?
  (
    <div className=''>
     <Navbar/>
     <LoadingBar color='blue' progress={progress} onLoaderFinished={()=>setProgress(0)}/>
     <div className='flex bg-violet-50'>
     <Sidebar/>
      <Routes>
        {/* Admin routes */}
        <Route path='/' element={<></>} />
        <Route path='/add-doctor' element={<AddDoctor/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/all-appointments' element={<AllAppointments/>} />
        <Route path='/doctors-list' element={<DoctorsList/>} />
        {/* Doctor routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor-appointments' element={<Appointments/>}/>
        <Route path='/doctor-profile' element={<DoctorProfile/>}/>
      </Routes>
     </div>
    </div>
  ):
  (<div className='mx-10 sm:mx-[10%]'>
     <Login/>
  </div>)
}

export default App
