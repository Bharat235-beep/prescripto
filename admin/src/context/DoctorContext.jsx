import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext()

export const DoctorProvider = (props) => {
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : null)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [appointments, setAppointments] = useState(null)
    const [dashboard,setDashboard]=useState(null)
    const [profile,setProfile]=useState(null)

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } })
            console.log(data)
            if (data.success) {
                setAppointments(data.appointments)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getProfile = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            console.log(data)
            if (data.success) {
                setProfile(data.doctor)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashboard=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                setDashboard(data.dashboard)
                // console.log(data.dashboard)
            }
            else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        const toastId = toast.loading('Please wait...')
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                getAppointments()
                getDashboard()
                return toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
            }
            else {
                return toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
            }
        } catch (error) {
            console.log(error)
            toast.update(toastId, { isLoading: false, type: 'error', render: error.message, autoClose: 4000, closeButton: null })
        }
    }
    const completeAppointment = async (appointmentId) => {
        const toastId = toast.loading('Please wait...')
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                getAppointments()
                getDashboard()
                return toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
            }
            else {
                return toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
            }
        } catch (error) {
            console.log(error)
            return toast.update(toastId, { isLoading: false, type: 'error', render: error.message, autoClose: 4000, closeButton: null })
        }
    }

    const updateProfile=async()=>{
        const toastId = toast.loading('Updating...')
        try {
            const updateData={
                available:profile.available,
                fees:profile.fees,
                address:profile.address
            }
            const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
            if (data.success) {
                getProfile()
                return toast.update(toastId, { isLoading: false, type: 'success', render: data.message, autoClose: 4000, closeButton: null })
            }
            else {
                return toast.update(toastId, { isLoading: false, type: 'error', render: data.message, autoClose: 4000, closeButton: null })
            }
        } catch (error) {
            console.log(error)
            return toast.update(toastId, { isLoading: false, type: 'error', render: error.message, autoClose: 4000, closeButton: null }) 
        }
    }
    const value = {
        dToken, setDToken, backendUrl,
        getAppointments, appointments,
        cancelAppointment, completeAppointment,
        dashboard,getDashboard,profile,
        getProfile,setProfile,updateProfile
    }
    return (
        <DoctorContext.Provider value={{ ...value }}>
            {props.children}
        </DoctorContext.Provider>
    )
}