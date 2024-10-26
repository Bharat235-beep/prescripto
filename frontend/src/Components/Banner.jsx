import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate=useNavigate()

  return (
    <div className='flex items-center py-24 my-12 rounded-lg justify-evenly bg-primary text-white '>
      {/* -----left side----- */}
      <div className='flex flex-col items-start justify-center gap-6 mx-3'>
        <p className='text-xl sm:text-2xl md:text-5xl font-semibold'>Book Appointment</p>
        <p className='text-xl sm:text-2xl md:text-5xl font-semibold'>With 100+ Trusted Doctors</p>
        <button onClick={()=>navigate('/login')} className='bg-white text-black px-3 py-2 rounded-full hover:scale-105 transition-all duration-300'>Create Account</button>
      </div>
      {/* -----right side----- */}
      <div className='hidden sm:flex items-baseline sm:w-1/2 md:w-[390px] relative'>
        <img className='w-full absolute -top-60  right-0' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
