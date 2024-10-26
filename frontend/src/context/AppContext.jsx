import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-toastify';

export const AppContext=createContext()

export const AppProvider=(props)=>{
    const currencySymbol='$'
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors]=useState([])
    const [userData,setUserData]=useState(null)
    const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):null)

    const getAllDoctors=async()=>{
       try {
         const {data}=await axios.get(backendUrl+'/api/doctor/list')
        //  console.log(data)
         setDoctors(data.doctors)
        //  console.log(backendUrl)
       } catch (error) {
        console.log(error)
       }
    }

    const loadUserData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
                // console.log(data.userData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(token){
            loadUserData()
           }
        getAllDoctors()
    },[])
    useEffect(()=>{
       if(token){
        loadUserData()
       }
       else{
        setUserData(null)
       }
    },[token])

    const value={
        backendUrl,loadUserData,getAllDoctors,
        doctors,currencySymbol,
        token,setToken,userData,setUserData
    }
    return(
        <AppContext.Provider value={{...value}}>
            {props.children}
        </AppContext.Provider>
    )
}