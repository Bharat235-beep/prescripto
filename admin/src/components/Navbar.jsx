import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext.jsx'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate()
    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)
    const logout=()=>{
        if(aToken){
            localStorage.removeItem('aToken');
            setAToken(null)
            navigate('/')
        }
        else if(dToken){
          localStorage.removeItem('dToken');
            setDToken(null)
            navigate('/')
        }
    }
  return (
    <div className='flex items-center justify-between border-b px-3 sm:px-10 py-2 border-b-gray-300'>
      <div className='flex items-center justify-center text-xs gap-1'>
        <img className='w-32 sm:w-36' src={assets.admin_logo} alt="" />
        <p className='border border-gray-500 px-2 py-0.5 rounded-xl'>{localStorage.getItem('aToken')?'Admin':'Doctor'}</p>
      </div>

      <button className='bg-primary text-white w-20 px-2 py-1 rounded-3xl' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
