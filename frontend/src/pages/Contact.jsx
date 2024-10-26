import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='flex flex-col text-center py-5 gap-10 items-center clear-both text-gray-600'>
      <p className='text-xl text-gray-600 mt-3'>CONTACT <span className='text-gray-900 font-medium'>US</span></p>
      <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col items-start gap-5 text-start'>
          <p className='text-xl text-gray-700 font-semibold'>OUR OFFICE</p>
          <p>54709 Willms Station <br />Suite 350, Washington, USA</p>
          <p>Tel: (415) 555‑0132 <br />Email: xyz@gmail.com</p>
          <p className='text-xl text-gray-700 font-semibold'>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-black px-4 py-2 hover:bg-black hover:text-white'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
