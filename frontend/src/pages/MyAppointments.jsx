import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom';

const MyAppointments = () => {
  const navigate=useNavigate()
  const { token,backendUrl ,getAllDoctors,setProgress} = useContext(AppContext)
  const [appointments,setAppointments]=useState(null)
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const formateDate=(date)=>{
    let dateArray=date.split('_')
    return dateArray[0]+' '+months[Number(dateArray[1]-1)]+','+dateArray[2]
  }

  const listAppointments=async()=>{
    try {
      setProgress(10)
      const {data}=await axios.get(backendUrl+'/api/user/list-appointments',{headers:{token}})
      if (data.success) {
        setAppointments(data.appointments.reverse())
        setProgress(100)
        // console.log(data.appointments)
      }
      else{
        // console.log(data.message)
        setProgress(100)
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      setProgress(100)
    }
  }
  const cancelAppointment=async(appointmentId)=>{
    const toastId = toast.loading('Updating...')
    try {
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        getAllDoctors()
        listAppointments()
        toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
      }
      else{
        toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
      }
      // console.log(appointmentId)
      
    } catch (error) {
      console.log(error)
      toast.update(toastId, { isLoading: false, type: 'success', render: error.message, autoClose: 4000, closeButton: null })
    }
  }
  const initPay=async(order)=>{
    try {
      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:order.amount,
        currency:order.currency,
        order_id:order.id,
        name:"Appointment Payment",
        description:"Appointment Payment",
        receipt:order.receipt,
        handler:async(res)=>{
          // console.log(res)
          try {
            const {data}=await axios.post(backendUrl+'/api/user/verify-razorpay',res,{headers:{token}})
            if(data.success){
              listAppointments()
              toast.success(data.message)
              navigate('/my-appointments')
            }
            else{
              toast.error(data.message)
            }
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        }
      }
      const rzp=new window.Razorpay(options)
      rzp.open()
      
    } catch (error) {
      console.log(error)
    }
  }

  const AppointmentRazorpay=async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(object)
    }
  }


  useEffect(()=>{
    if(token){
      listAppointments()
    }
  },[token])
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-2xl text-gray-700 font-medium mt-4'>My Appointments</p>
      <div className='flex flex-col'>
        {
         appointments && appointments.map((item, index) => {
            return (
              <div key={index} className='flex flex-col sm:flex-row items-center flex-wrap  justify-between py-2  border-t border-gray-500'>
                <div className='flex flex-row flex-1 gap-2 items-center'>
                  <img className='w-32 bg-blue-200' src={item.docData.image} alt="" />
                  <div className='flex flex-col items-start gap-0.5  text-gray-600'>
                    <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                    <p className='-mt-1 text-sm'>{item.docData.speciality}</p>
                    <p className='font-medium'>Address:</p>
                    <p className='text-sm'>{item.docData.address.line1} <br />{item.docData.address.line2}</p>
                    <p className='font-medium text-sm'>Date & Time: <span className='font-normal text-xs'>{formateDate(item.slotDate)} |  {item.slotTime}</span></p>
                  </div>
                </div>
  
                <div className='flex w-auto flex-col self-end sm:px-2 my-1 gap-2 md:gap-5'>
             
                 {!(item.cancelled || item.payment || item.isCompleted) &&<button onClick={()=>AppointmentRazorpay(item._id)} className='border border-gray-500 hover:bg-primary hover:text-white w-40 md:w-72 py-0.5 md:py-1.5 rounded'>Pay here</button>}
                 {!(item.cancelled || item.payment || item.isCompleted) && <button onClick={()=>cancelAppointment(item._id)} className='border border-gray-500 text-nowrap w-40 md:w-72 py-0.5 md:py-1.5  rounded hover:bg-red-600 hover:text-white'>Cancel appointment</button>}
                 {item.cancelled && !item.isCompleted && <button className='border border-red-500 text-red-500 text-nowrap px-1 sm:min-w-40 md:w-72 py-0.5 md:py-1.5  rounded '> Appointment Cancelled</button>}
                 {item.isCompleted && <button className='border border-green-500 text-green-500 text-nowrap px-1 sm:min-w-40 md:w-72 py-0.5 md:py-1.5  rounded '> Appointment Completed</button>}
                 {item.payment && 
                 <button className='border border-blue-700 bg-blue-50 text-blue-900 text-nowrap px-1 sm:min-w-40 md:w-72 py-0.5 md:py-1.5  rounded '> {(item.payment && item.cancelled)
                  ?<span className='text-sm'>Amount will be refunded</span>:'Paid Online'}
                  </button>}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyAppointments
