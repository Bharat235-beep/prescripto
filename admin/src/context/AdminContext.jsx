import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext=createContext()

export const AdminProvider=(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):null)
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState(null)
    const [appointments,setAppointments]=useState(null)
    const [dashboard,setDashboard]=useState(null)
    const getAllDoctors=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/all-doctors',{headers:{aToken}})
            // console.log(data)
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            // console.log(data)
            if(data.success){
                setAppointments(data.appointments)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const changeAvailability=async(docId)=>{
      try {
          const {data}=await axios.post(backendUrl+'/api/admin/set-availability',{docId},{headers:{aToken}})
        //   console.log(data)
          if(data.success){
              toast.success(data.message)
             const tempList=await doctors.map((val)=>{
                if(val._id===docId){
                 val.available=!val.available
                }
                return val
              })
              setDoctors(tempList)
          }
          else{
              toast.error(data.message)
          }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    const cancelAppointment=async(appointmentId)=>{
        const toastId = toast.loading('Updating...')
        try {
          const {data}=await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
          if(data.success){
            getAllDoctors()
            getAllAppointments()
            toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
          }
          else{
            toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
          }
          console.log(appointmentId)
          
        } catch (error) {
          console.log(error)
          toast.update(toastId, { isLoading: false, type: 'error', render: error.message, autoClose: 4000, closeButton: null })
        }
      }
      const getDashboard=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                console.log(data.dashboard)
                setDashboard(data.dashboard)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
      }
    const calculateAge=(dob)=>{
        const birthDate=new Date(dob)
        const today=new  Date()
        return today.getFullYear()-birthDate.getFullYear()
    }

    const value={
        backendUrl,setAToken,aToken,getAllDoctors,doctors,
        changeAvailability,getAllAppointments,appointments,setAppointments,
        calculateAge,cancelAppointment,dashboard,getDashboard
    }
    return(
        <AdminContext.Provider value={{...value}}>
            {props.children}
        </AdminContext.Provider>
    )
}