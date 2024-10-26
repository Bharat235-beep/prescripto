import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { appointments, getAllAppointments, aToken,calculateAge,cancelAppointment } = useContext(AdminContext)
  const {formatDate,currency}=useContext(AppContext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])
  return (
    <div className='max-w-6xl m-5 max-h-[80vh] overflow-y-scroll'>
      <p className='text-gray-700 text-2xl font-medium'>All Appointments</p>
      <div className='bg-white rounded text-sm'>
        <div className='hidden sm:grid max-sm:gap-2 grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 text-stone-600 font-medium text-lg border border-b px-5 items-center py-2'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments &&
          appointments.map((item, index) => {
            return (
              <div key={index} className='flex flex-wrap justify-between border-b max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-5 px-4 py-2 hover:bg-gray-50'>
                <p className='max-sm:hidden'>{index + 1}.</p>
                <div className='flex gap-2 items-center'>
                  <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                  <p>{item.userData.name}</p>
                </div>
                <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                <div className='flex gap-2 max-sm:text-xs text-gray-600 items-center'>
                  <p>{formatDate(item.slotDate)}</p>
                  <p>{item.slotTime}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <img className='w-8 rounded-full' src={item.docData.image} alt="" />
                  <p>{item.docData.name}</p>
                </div>
                <p>{currency} {item.docData.fees}</p>
                <div className='min-w-[100px] flex justify-center max-w-[100px] py-2'>

                {
                  item.cancelled?
                  <p className='rounded text-red-600 font-medium text-center px-2 py-2 text-xs'>Cancelled</p>
                  :item.isCompleted
                  ? <p className='rounded text-green-600 font-medium text-center px-2 py-2 text-xs'>Completed</p>
                  :
                <img className='w-10 cursor-pointer' onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllAppointments
