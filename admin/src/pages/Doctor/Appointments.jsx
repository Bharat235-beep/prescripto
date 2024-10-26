import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Appointments = () => {
    const { appointments, dToken, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
    const { formatDate, calculateAge, currency } = useContext(AppContext)
    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])
    return (
        <div className='m-5'>
            <p className='text-2xl text-gray-600 mb-5 font-medium'>My Appointments</p>
            <div className='max-h-[80vh] min-h-[50vh] bg-white overflow-y-scroll'>
                <div className='max-sm:hidden text-lg grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_2fr] gap-5 py-4 px-2 text-gray-600 font-medium items-center border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
                {
                    appointments &&
                    appointments.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-wrap gap-5 justify-between max-sm:box-border sm:grid grid-cols-[0.5fr,3fr,1fr,1fr,3fr,1fr,2fr] items-center text-gray-600 p-2 border-b hover:bg-gray-50'>
                                <p className='max-sm:hidden py-4'>{index + 1}.</p>
                                <div className='flex items-center gap-2'>
                                    <img className='w-8 h-8 rounded-full' src={item.userData.image} alt="" />
                                    <p>{item.userData.name}</p>
                                </div>
                                <div className='flex items-center justify-start'>
                                    <p className='px-1 text-sm text-blue-500 font-medium rounded-full place-self-center border border-violet-200'>{item.payment ? 'Online' : 'Cash'}</p>
                                </div>
                                <p className='max-sm:hidden py-4'>{calculateAge(item.userData.dob)}</p>
                                <p className='py-4 text-sm'>{formatDate(item.slotDate)},{item.slotTime}</p>
                                <p className='py-4'>{currency}{item.docData.fees}</p>
                                {
                                    item.cancelled ?
                                        <p className='text-red-400 text-xs font-medium'>Cancelled</p> :
                                        item.isCompleted ?
                                            <p className='text-green-500 text-xs font-medium'>Completed</p> :
                                            <div className='flex'>
                                                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                                <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
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

export default Appointments
