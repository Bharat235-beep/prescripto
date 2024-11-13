import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const {dToken, dashboard,getDashboard,cancelAppointment,completeAppointment}=useContext(DoctorContext)
  const {currency,formatDate,setProgress}=useContext(AppContext)
  useEffect(()=>{
    setProgress(40)
    if(dToken){
      getDashboard()
    }
    setProgress(100)
  },[dToken])
  return dashboard && (
    <div className='m-5 min-h-[50vh] max-h-[80vh] overflow-y-scroll'>
      <div className='flex flex-wrap justify-center gap-2'>
        <div className='flex gap-2 bg-white rounded-xl border-gray-500 w-56 items-center py-3 px-2 hover:scale-105 transition-all duration-300'>
          <img className='w-14 rounded' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-gray-700 font-medium text-2xl'>{currency+dashboard.earnings}</p>
            <p className='text-gray-500 text-sm'>Earnings</p>
          </div>
        </div>
        <div className='flex gap-2 bg-white rounded-xl border-gray-500 w-56 items-center py-3 px-2 hover:scale-105 transition-all duration-300'>
          <img className='w-14 rounded' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-gray-700 font-medium text-2xl'>{dashboard.appointments}</p>
            <p className='text-gray-500 text-sm'>Appointments</p>
          </div>
        </div>
        <div className='flex gap-2 bg-white rounded-xl border-gray-500 w-56 items-center py-3 px-2 hover:scale-105 transition-all duration-300'>
          <img className='w-14 rounded' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-gray-700 font-medium text-2xl'>{dashboard.patients}</p>
            <p className='text-gray-500 text-sm'>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white mt-10'>
        <div className='flex gap-1 border-b border-gray-300 px-2 py-5'>
          <img src={assets.list_icon} alt="" />
          <p className='text-gray-700 font-medium text-xl'>Latest Appointments</p>
        </div>
      {
        dashboard && dashboard.latestAppointments.map((item,index)=>{
          return(
            <div key={index} className='flex max-sm:flex-wrap justify-between items-center mx-2 py-3 border-b hover:bg-gray-50'>
              <div className='flex gap-3 flex-1'>
                <img className='w-10 h-10 rounded-full' src={item.userData.image} alt="" />
                <div>
                  <p className='text-gray-600 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-500 text-xs'>{formatDate(item.slotDate)},{item.slotTime}</p>
                </div>
              </div>
              {
                item.cancelled?
                <p className='text-red-400 font-medium text-xs'>Cancelled</p> :
                item.isCompleted?
                <p className='text-green-500 font-medium text-xs'>Completed</p> :
                <div className='flex gap-1 items-center'>
                  <img className='w-10 cursor-pointer' onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                  <img className='w-10 cursor-pointer' onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" />

                </div>
              }
            </div>
          )
        })
      }
      </div>

    </div>
  )
}

export default DoctorDashboard
