import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  return (
    <div className='min-h-screen text-sm sm:text-base bg-white   border-r border-gray-400'>
     {aToken && <ul className='flex flex-col gap-3 w-full items-start justify-center  text-nowrap py-2 text-gray-700'>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/dashboard'} >
            <img src={assets.home_icon} alt="" />
            <li className='max-sm:hidden'>Dashboard</li>
        </NavLink>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <li className='max-sm:hidden'>Appointments</li>
        </NavLink>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" />
            <li className='max-sm:hidden'>Add Doctor</li>
        </NavLink>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/doctors-list'}>
            <img src={assets.people_icon} alt="" />
            <li className='max-sm:hidden'>Doctors List</li>
        </NavLink>
      </ul>}
     {dToken && <ul className='flex flex-col gap-3 w-full items-center justify-center text-nowrap  py-2 text-gray-700'>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/doctor-dashboard'} >
            <img src={assets.home_icon} alt="" />
            <li className='max-sm:hidden'>Dashboard</li>
        </NavLink>
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/doctor-appointments'}>
            <img src={assets.appointment_icon} alt="" />
             <li className='max-sm:hidden'>Appointments</li>
        </NavLink>
        
        <NavLink className={({isActive})=>`flex gap-2 w-10 sm:w-40 p-2 ${isActive?'bg-violet-100 border-r-4 border-primary':''}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt="" />
             <li className='max-sm:hidden'>Profile</li>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar
