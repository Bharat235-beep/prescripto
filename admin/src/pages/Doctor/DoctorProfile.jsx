import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {
  const {dToken,getProfile,profile,setProfile,updateProfile}=useContext(DoctorContext)
  const {currency,setProgress}=useContext(AppContext)
  const [isEdit,setIsEdit]=useState(false)

  const handleUpdate=()=>{
    updateProfile()
    setIsEdit(false)
  }
  useEffect(()=>{
    setProgress(40)
    if(dToken){
      getProfile()
    }
    setProgress(100)
  },[dToken])
  return profile && (
    <div className='m-5'>
      <div className='flex flex-col gap-5 max-h-[80vh] overflow-y-scroll'>
        <div className='w-full sm:w-[270px]'>
          <img className='bg-primary/70 rounded-lg' src={profile.image} alt="" />
        </div>

        <div className='flex flex-col gap-5 py-5 px-3 rounded-xl w-full sm:w-3/4 bg-white'>

          <div className=''>
            <p className='text-3xl font-medium text-gray-700'>{profile.name}</p>
            <p className='text-gray-600'>{profile.degree} - {profile.speciality}
              <button className='px-2 text-sm mx-1 rounded-full border border-gray-300'>{profile.experience}</button>
              </p>
          </div>

          <div>
            <p className='text-gray-700 font-medium'>About</p>
            <p className='text-gray-600'>{profile.about}</p>
          </div>
          <p className='text-gray-700'>
            Appointment fee:
            <span className='font-medium'>{currency} {isEdit?
            <input type="number" value={profile.fees} className='border border-gray-400 px-2 rounded-lg' 
            onChange={(e)=>setProfile(prev=>({...prev,fees:e.target.value}))} />
            :
             profile.fees   }
             </span>
          </p>

          <div className='flex gap-3'>
            <p className='text-gray-700 font-medium'>Address:</p>
            <p className='text-gray-600'>
              {isEdit ? <input type="text" value={profile.address.line1} className='border border-gray-400 px-2 rounded-lg'
              onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} />: profile.address.line1} 
              <br />
              {isEdit ? <input type="text" value={profile.address.line2} className='border border-gray-400 px-2 rounded-lg'
              onChange={(e)=>setProfile(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} />: profile.address.line2}
              </p>
          </div>

          <div className='flex gap-2'>
            <input checked={profile.available} onChange={(e)=>isEdit && setProfile(prev=>({...prev,available:!profile.available}))} type="checkbox"  id="available" />
            <label htmlFor="available">Available</label>
          </div>
          {
            isEdit?
            <button onClick={handleUpdate} className='border border-gray-600 w-fit px-7 rounded-full py-2 hover:bg-primary hover:text-white transition-all duration-300'>Save</button>
            :
            <button onClick={()=>setIsEdit(true)} className='border border-gray-600 w-fit px-7 rounded-full py-2 hover:bg-primary hover:text-white transition-all duration-300'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
