import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const DoctorsList = () => {
  const {aToken,doctors,getAllDoctors,changeAvailability}=useContext(AdminContext)
  const {setProgress}=useContext(AppContext)

  useEffect(()=>{
    setProgress(40)
    if(aToken){
      getAllDoctors()
    }
    setProgress(100)
  },[aToken])
  return doctors && (
    <div className='flex flex-col gap-5 py-2 mx-4 max-h-[90vh] overflow-y-scroll'>  
      <h1 className='text-3xl font-medium text-neutral-700 mt-2'>All Doctors</h1>
      <div className='flex flex-wrap gap-6 gap-y-8 w-full items-center'>
        {
          doctors.map((item,index)=>{
            return(
              <div key={index} className='flex flex-col gap-2 items-start border border-gray-300 rounded group w-56'>
                <img className='bg-blue-100 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                <div className='flex flex-col py-2 mx-2 gap-2'>
                  <p className='text-lg text-gray-900 font-medium'>{item.name}</p>
                  <p className='text-sm text-zinc-700'>{item.speciality}</p>
                  <div className='flex gap-1'>
                    <input type="checkbox" onChange={()=>changeAvailability(item._id)} checked={item.available}/>
                    <p>Available</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DoctorsList
