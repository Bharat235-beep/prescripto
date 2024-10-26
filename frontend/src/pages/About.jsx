import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='flex  flex-col gap-10 py-10 clear-both'>

      <p className='text-center text-2xl text-gray-500 '>ABOUT <span className='text-gray-800'>US</span></p>

      <div className='flex items-center justify-center flex-col lg:flex-row gap-10'>
        <img className='w-full h-full sm:max-w-[360px]' src={assets.about_image} alt="" />
       <div className='flex flex-col gap-5 text-justify text-gray-600'>
       <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
        <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
        <p className='font-medium text-gray-900 text-xl'>Our Vision</p>
        <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
       </div>
      </div>

      <div className='flex items-start'>
        <p className='text-2xl text-gray-600'>WHY <span className='text-gray-900 font-medium'>CHOOSE US ?</span></p>
      </div>

      <div className='flex flex-col md:flex-row text-gray-600'>
        <div className='flex flex-col gap-3 text-start items-start w-full md:w-1/3 border border-black px-10 py-10 hover:bg-primary hover:text-white transition-all duration-300'>
          <b>EFFICIENCY:</b>
          <p >Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='flex flex-col gap-3 text-start items-start w-full md:w-1/3 border border-black px-10 py-10 hover:bg-primary hover:text-white transition-all duration-300'>
          <b>CONVENIENCE:</b>
          <p >Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='flex flex-col gap-3 text-start items-start w-full md:w-1/3 border border-black px-10 py-10 hover:bg-primary hover:text-white transition-all duration-300'>
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
