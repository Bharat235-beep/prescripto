import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../Components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { doc_id } = useParams()
  const navigate = useNavigate()
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const { doctors, currencySymbol, backendUrl, getAllDoctors, token,setProgress} = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [dayIndex, setDayIndex] = useState(0);
  const [timeSlot, setTimeSlot] = useState('')
  const fetchDoctor = async () => {
    let doctor = await doctors.find(doc => doc._id === doc_id)
    console.log(doctor)
    setDocInfo(doctor)
  }

  const fetchTimeSlots = async () => {
   try {
     setDocSlots([])
     let today = new Date()
 
     for (let i = 0; i < 7; i++) {
       let currentDate = new Date(today);
       currentDate.setDate(today.getDate() + i);
       // console.log(currentDate)
       let endTime = new Date();
       endTime.setDate(today.getDate() + i);
       endTime.setHours(21, 0, 0, 0);
       // console.log(endTime)
       if (today.getDate() == currentDate.getDate()) {
         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
       }
       else {
         currentDate.setHours(10)
         currentDate.setMinutes(0)
       }
       let timeSlots = [];
       while (currentDate < endTime) {
         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
         let day = currentDate.getDate()
         let month = currentDate.getMonth() + 1
         let year = currentDate.getFullYear()
         const slotDate = day + '_' + month + '_' + year
         const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true
         if (isSlotAvailable) {
           timeSlots.push({
             dateTime: new Date(currentDate),
             time: formattedTime
           })
         }
         currentDate.setMinutes(currentDate.getMinutes() + 30)
       }
       // console.log(timeSlots)
       setDocSlots(prev => ([...prev, timeSlots]))
     }
   } catch (error) {
    console.log(error)
   }
  }

  const bookAppointment = async () => {
    const toastId = toast.loading('Please wait...')
    try {
      let date = docSlots[dayIndex][0].dateTime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = day + '_' + month + '_' + year
      // console.log(slotDate)
      // console.log(timeSlot)
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {
        docId: doc_id,
        slotTime: timeSlot, slotDate
      }, { headers: { token } })

      if (data.success) {
        getAllDoctors()
        toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
        return navigate('/my-appointments')
      }
      else {
        toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
      }
    } catch (error) {
      console.log(error)
      toast.update(toastId, { isLoading: false, type: 'error', render: error.message, autoClose: 4000, closeButton: null })
    }
  }

  useEffect(() => {
    setProgress(20)
    fetchDoctor()
    setProgress(100)
    // console.log(docSlots)
  }, [doctors, doc_id])

  useEffect(() => {
    fetchTimeSlots();
  }, [docInfo])
  // useEffect(() => {
  //   console.log(docSlots)
  // }, [docSlots])
  return docInfo && (
    <div className='clear-both'>
      {/* Top section */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-5 mt-3'>
        {/* Doctor Image */}
        <div className='w-fit flex items-center justify-center bg-primary rounded-lg'>
          <img className='w-full sm:w-64' src={docInfo.image} alt="" />
        </div>
        {/* right section */}
        <div className='flex flex-1 flex-col items-start justify-center gap-5 border border-gray-600 rounded-lg px-3 py-2'>
          {/* doctor info-name,degree,experience */}
          <div className='flex flex-col gap-2'>
            <p className='flex text-gray-950 font-medium text-xl gap-1'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
            <p className='flex text-gray-700 font-medium gap-1'>{docInfo.degree}-{docInfo.speciality} <button className='border border-gray-600 px-1 py-0.5 rounded-full'>{docInfo.experience}</button></p>
          </div>
          {/* doctor about */}
          <div className='flex flex-col gap-2'>
            <p className='flex text-gray-900 font-medium  gap-1'>About <img className='w-5' src={assets.info_icon} alt="" /></p>
            <p className='text-gray-700 text-justify'>{docInfo.about}</p>
          </div>
          <div className=''>
            <p className='text-gray-700'>Appointment fee: <span className='text-black font-medium'>{currencySymbol + docInfo.fees}</span></p>
          </div>
        </div>
      </div>
      {/* Booking slots */}
      <div className='sm:ml-72 sm:pl-3 py-7 gap-y-5 flex flex-col gap-3'>
        <p className='text-black font-medium text-xl'>Booking Slots</p>
        <div className='flex gap-5 w-full overflow-x-auto text-gray-700'>
          {
            docSlots.length && docSlots.map((item, index) => {
              return (
                <div onClick={() => setDayIndex(index)} key={index} className={`flex flex-col justify-center items-center border border-gray-500 cursor-pointer rounded-full w-14 mt-2 px-3 py-4 ${index === dayIndex ? 'bg-primary text-black' : ''}`}>
                  <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              )
            })
          }
        </div>
        {/* time slots */}
        <div className='flex gap-5 w-full overflow-x-auto text-sm text-gray-700'>
          {
            docSlots.length && docSlots[dayIndex].map((item, index) => {
              return (
                <div onClick={() => setTimeSlot(item.time)} key={index} className={` border border-gray-500 cursor-pointer rounded-full py-1 mt-2  ${timeSlot === item.time ? 'bg-primary text-black' : ''}`}>
                  <p className='w-20 text-center'>{item && item.time.toLowerCase()}</p>
                </div>
              )
            })
          }
        </div>
        {/* Booking button */}
        <div className='mt-2'>
          <button onClick={bookAppointment} className='bg-blue-700 hover:bg-primary px-4 py-2 text-white rounded-full'>Book Appointment</button>
        </div>
      </div>

      <RelatedDoctors doc_id={doc_id} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
