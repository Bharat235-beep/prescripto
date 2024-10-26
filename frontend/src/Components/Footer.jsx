import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='py-5 mt-10 flex flex-col gap-5'>
      {/* left side */}
      <div className='flex flex-col sm:grid sm:grid-cols-[3fr,1fr,1fr]'>
      <div className='flex flex-col gap-5'>
        <img className='w-36' src={assets.logo} alt="" />
        <p className='text-gray-700 w-full sm:w-4/5 text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      {/* center */}
      <div className='flex flex-col gap-5'>
        <p className='font-medium text-xl text-gray-800'>COMPANY</p>
        <ul className='text-gray-700 flex flex-col gap-1'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
        </ul>
      </div>
      {/* right side */}
      <div className='flex flex-col gap-5'>
        <p className='font-medium text-xl text-gray-800'>GET IN TOUCH</p>
        <ul className='text-gray-700 flex flex-col gap-1'>
            <li>+1-212-456-7890</li>
            <li>xyz@gmail.com</li>
        </ul>
      </div>
      </div>
      <hr />
      <div className='py-2'>
      <p className='text-gray-700 text-center'>Copyright © 2024 Bharat - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
