import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './Components/Navbar'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Footer from './Components/Footer'
import Login from './pages/Login'
function App() {

  return (
    <div className='mx-4 sm:mx-[10%]'>
    <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/doctors' exact element={<Doctors/>}/>
          <Route path='/doctors/:speciality' exact element={<Doctors/>}/>
          <Route path='/about' exact element={<About/>}/>
          <Route path='/contact' exact element={<Contact/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/my-profile' exact element={<MyProfile/>}/>
          <Route path='/my-appointments' exact element={<MyAppointments/>}/>
          <Route path='/appointment/:doc_id' exact element={<Appointment/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
