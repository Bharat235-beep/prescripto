import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();

  return (
    <div className='flex flex-col sm:flex-row flex-wrap my-5 rounded-lg items-center justify-around bg-primary text-white clear-both'>
      {/* left side */}
      <div className='flex flex-col items-start gap-4 ml-2 mt-2'>
        <p className='text-3xl font-medium'>Book Appointment<br/>With Trusted Doctors</p>
        <div className='flex flex-col sm:flex-row items-center justify-center'>
            <img className='w-20' src={assets.group_profiles} alt="" />
            <p className='text-xs'>Simply browse through our extensive list of trusted doctors,<br/>schedule your appointment hassle-free</p>
        </div>
        <a href={'#speciality'} className='flex items-center gap-1 justify-center bg-slate-100 text-black px-3 py-2 rounded-3xl hover:scale-105 transition-all duration-200'>
        Book Appointment <img src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/* right side */}
      <div className='w-72 sm:w-96'>
        <img className='w-full' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
