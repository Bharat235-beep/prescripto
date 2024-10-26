import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'
import { toast } from 'react-toastify'
const Login = () => {
    const {backendUrl,setAToken,aToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)
    const [state,setState]=useState('Doctor')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
       let toastId= toast.loading('Please wait...')
       try {
         if(state==='Admin'){
           const {data}=await  axios.post(`${backendUrl}/api/admin/login`,{email,password})
           console.log(data)
          if(data.success){
            localStorage.setItem('aToken',data.token)
            setAToken(data.token)
            toast.update(toastId,{type:'success',isLoading:false,render:'Login Successfull',closeButton:null,autoClose:3000})
          }
          else{
            toast.update(toastId,{type:'error',isLoading:false,render:data.message,closeButton:null,autoClose:3000})
          }
         }
         else{
          const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
          console.log(data)
          if(data.success){
            localStorage.setItem('dToken',data.token)
            setDToken(data.token)
            toast.update(toastId,{type:'success',isLoading:false,render:'Login Successfull',closeButton:null,autoClose:3000})
          }
          else{
            toast.update(toastId,{type:'error',isLoading:false,render:data.message,closeButton:null,autoClose:3000})
          }
         }
       } catch (error) {
        console.log(error)
       }
    }

   
  return (
    <>
    <form onSubmit={handleOnSubmit} className='min-h-[80vh] flex items-center justify-center text-gray-600'>
        <div className='flex flex-col  justify-center w-96 gap-5 py-5 px-5 sm:min-w-[375px] border border-gray-700 shadow-2xl rounded-xl'>
            <p className=' text-center font-semibold text-3xl'><span className='text-primary'>{state}</span> Login</p>
            <div className='w-full'>
                <p>Email:</p>
                <input placeholder='richard@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)} className='border w-full py-1 px-2 border-gray-600 rounded focus:outline-primary' type="email" required />
            </div>
            <div className='w-full'>
                <p>Password:</p>
                <input placeholder='123456' value={password} onChange={(e)=>setPassword(e.target.value)} className='border w-full py-1 px-2 border-gray-600 rounded focus:outline-primary' type="password" required />
            </div>
            <button className='bg-primary text-white font-medium w-full rounded py-1 px-2 hover:bg-indigo-600'>Login</button>
            {
                state==='Admin'?
                <p className=''>Doctor Login?<span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}>Click here</span></p>
                :
                <p className=''>Admin Login?<span className='text-primary underline cursor-pointer'  onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
    </>
  )
}

export default Login
