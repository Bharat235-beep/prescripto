import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

function Dashboard() {
  const {dashboard,getDashboard,aToken,cancelAppointment}=useContext(AdminContext)
  const {formatDate}=useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getDashboard()
    }
  },[aToken])
  return dashboard && (
    <div className='m-5 max-h-[80vh] overflow-y-scroll'>
  
      <div className='flex flex-wrap gap-4'>
        <div className='flex gap-6 cursor-pointer rounded-lg bg-white w-full sm:w-56 px-2 py-3 hover:scale-105 transition-all'>
          <img className='w-16 rounded' src={assets.doctor_icon} alt="" />
          <div>
          <p className='text-2xl text-gray-600 font-semibold'>{dashboard.doctors}</p>
          <p className='text-gray-500 font-medium'>Doctors</p>
          </div>
        </div>
        <div className='flex gap-6 cursor-pointer rounded-lg bg-white w-full sm:w-56 px-2 py-3 hover:scale-105 transition-all'>
          <img className='w-16 rounded' src={assets.appointments_icon} alt="" />
          <div>
          <p className='text-2xl text-gray-600 font-semibold'>{dashboard.appointments}</p>
          <p className='text-gray-500 font-medium'>Appointments</p>
          </div>
        </div>
        <div className='flex gap-6 cursor-pointer rounded-lg bg-white w-full sm:w-56 px-2 py-3 hover:scale-105 transition-all'>
          <img className='w-16 rounded' src={assets.patients_icon} alt="" />
          <div>
          <p className='text-2xl text-gray-600 font-semibold'>{dashboard.patients}</p>
          <p className='text-gray-500 font-medium'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white mt-10 '>
        <div className='flex gap-3 px-7 py-4 border-b border-gray-500'>
          <img src={assets.list_icon} alt="" />
          <p className='text-stone-600 font-medium text-xl'>Latest Appointments</p>
        </div>
        {
          dashboard.latestAppointments.map((item,index)=>{
            return(
              <div key={index} className='flex flex-wrap gap-2 items-center py-2 justify-between mx-2 hover:bg-gray-100 transition-all'>
                <div className='flex flex-wrap gap-2'>
                <img className='w-14 aspect-square bg-gray-100 rounded-full' src={item.docData.image} alt="" />
                <div>
                <p className='text-lg text-gray-700 font-medium'>{item.docData.name}</p>
                <p className='text-gray-400 font-medium'>{formatDate(item.slotDate)}</p>
                </div>

                </div>
                {
                  item.cancelled?
                  <p className='rounded text-red-600 font-medium text-center px-2 py-2 text-xs'>Cancelled</p>
                  :item.isCompleted
                  ? <p className='rounded text-green-600 font-medium text-center px-2 py-2 text-xs'>Completed</p>
                  :
                <img className='w-10 cursor-pointer' onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                }
              </div>
            )
          })
        }
        <div>
</div>
      </div>
    </div>
  )
}

export default Dashboard
