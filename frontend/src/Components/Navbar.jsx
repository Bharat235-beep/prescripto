import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const navigate=useNavigate();
    const {token,setToken,userData}=useContext(AppContext)
  const [showMenu,setShowMenu]=useState(false)

  const logOut=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <>
    <div className='flex items-center justify-between border-b p-0.5 py-1.5 border-gray-500 mt-1'>
      <img src={assets.logo} onClick={()=>{navigate('/');scrollTo(0,0);}} className='w-32 py-1 md:w-40' alt="" />
      <ul className='hidden text-sm sm:flex items-center justify-around gap-10'>
        <NavLink to={'/'}>
            <li>HOME</li>
            <hr className='outline-none border-none w-3/4 m-auto bg-primary h-0.5 hidden'/>
        </NavLink>
        <NavLink to={'/doctors'}>
            <li className='text-nowrap'>ALL DOCTORS</li>
            <hr className='outline-none border-none w-3/4 m-auto bg-primary h-0.5 hidden'/>
        </NavLink>
        <NavLink to={'/about'}>
            <li>ABOUT</li>
            <hr className='outline-none border-none w-3/4 m-auto bg-primary h-0.5 hidden'/>
        </NavLink>
        <NavLink to={'/contact'}>
            <li>CONTACT</li>
            <hr className='outline-none border-none w-3/4 m-auto bg-primary h-0.5 hidden'/>
        </NavLink>
      </ul>
      <div className='flex flex-col gap-1'>
        {
          token && userData ?
          <div className='flex gap-1.5 items-center justify-around group relative'>
            <img className='w-9 rounded-full' src={userData.image?userData.image:assets.upload_area} alt="" />
            <img src={assets.dropdown_icon} alt="" />
            <div className='hidden group-hover:flex flex-col gap-2 text-gray-600 z-10 p-1 absolute top-9 bg-gray-100 min-w-36 '>
              <p onClick={()=>navigate('my-profile')} className=' hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={()=>navigate('my-appointments')} className=' hover:text-black cursor-pointer'>My Appointments</p>
              <p onClick={logOut} className=' hover:text-black cursor-pointer'>LogOut</p>
            </div>
        
          </div>
          :
        <button onClick={()=>navigate('/login')} className='bg-primary text-gray-200 hover:bg-blue-500 p-1 sm:p-1.5 text-sm sm:text-base rounded-3xl'>Create Account</button>
        }
        {/* Mobile menubar */}
       
        <div className={`fixed  top-0 flex-col left-0 w-screen h-screen z-20 bg-white ${showMenu?'flex sm:hidden':'hidden'}`}>
          <div className='flex w-full items-center justify-between bg-slate-400'>
            <img className='w-28 m-2' src={assets.logo} alt="" />
            <img onClick={()=>setShowMenu(false)} className='w-10 m-2' src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col gap-5 mt-2 items-center text-lg justify-center'>
            <NavLink onClick={()=>setShowMenu(false)} to={'/'}>
              <p className='px-2 py-1 rounded-lg'>Home</p>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/doctors'}>
              <p className='px-2 py-1 rounded-lg'>All Doctors</p>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/about'}>
              <p className='px-2 py-1 rounded-lg'>About</p>
            </NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to={'/contact'}>
              <p className='px-2 py-1 rounded-lg'>Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
    <img onClick={()=>setShowMenu(true)} className='sm:hidden w-7 float-right z-10 my-2' src={assets.menu_icon} alt="" />
    </>
  )
}

export default Navbar
