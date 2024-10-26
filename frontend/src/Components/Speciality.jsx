import React from 'react'
import { specialityData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Speciality = () => {
  const navigate=useNavigate();

  return (
    <div id='speciality' className='flex flex-col items-center justify-center gap-5'>
      <h1 className='text-3xl font-medium'>Find By Speciality</h1>
      <p className='w-3/4 text-center text-gray-700'>Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free</p>
      <div className='flex  w-full overflow-scroll items-center sm:justify-center gap-5 my-12'>
      {
        specialityData.map((val,index)=>{
            return (
                <div key={index} onClick={()=>navigate('/doctors/'+val.speciality)} className='flex flex-col items-center cursor-pointer justify-center hover:translate-y-[-8%] transition-all duration-300'>
                    <img className='w-20' src={val.image} alt="" />
                    <p className='text-center text-sm'>{val.speciality}</p>
                </div>
            )
        })
      }
      </div>
    </div>
  )
}

export default Speciality
