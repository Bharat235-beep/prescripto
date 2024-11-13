import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify';

export const AppContext=createContext()

export const AppProvider=(props)=>{
    const [progress, setProgress] = useState(0)
    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [userData,setUserData]=useState(null)
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):null)

    const getAllDoctors=async()=>{
       try {
        setProgress(20)
        const {data}=await axios.get(backendUrl+'/api/doctor/list')
        setProgress(60)
        //  console.log(data)
        if(data.success){
            
            setDoctors(data.doctors)
            setProgress(100)
        }
        else{
            setProgress(100)
            toast.error(data.message)
        }
        //  console.log(backendUrl)
    } catch (error) {
        console.log(error)
        setProgress(100)
       }
    }

    const loadUserData=async()=>{
        try {
            setProgress(20)
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            setProgress(60)
            if(data.success){
                setUserData(data.userData)
                console.log('load user',data)
                setProgress(100)
                return
                //  console.log(data.userData)
            }
            else{
                console.log('load user',data)
                toast.error(data.message)
                setProgress(100)
            }
        } catch (error) {
            console.log(error)
            setProgress(100)
        }
    }
    useEffect(()=>{
        if(token){
            loadUserData()
        }
       
    },[token])
    useEffect(()=>{   
        getAllDoctors()    
    },[])
    

    const value={
        backendUrl,loadUserData,getAllDoctors,
        doctors,currencySymbol,
        token,setToken,userData,setUserData,
        progress, setProgress
    }
    return(
        <AppContext.Provider value={{...value}}>
            {props.children}
        </AppContext.Provider>
    )
}