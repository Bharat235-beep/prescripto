import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const {backendUrl,token,setToken,loadUserData}=useContext(AppContext)
    const navigate=useNavigate()

    const [currState,setCurrState]=useState('Login')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleSubmit=async(e)=>{
      const toastId=toast.loading('Please wait...')
      try {
          e.preventDefault()
          if(currState==='Sign Up'){
            const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password})
            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
              setName('')
              setEmail('')
              setPassword('')
              return toast.update(toastId,{type:'success',isLoading:false,autoClose:5000,render:'Account created successfully',closeButton:null})
              // toast.update(toastId,{isLoading:false,type:'success',render:'Account created successfully',closeButton:null,autoClose:5000})
            }
            else{
              return toast.update(toastId,{type:'error',isLoading:false,autoClose:5000,render:data.message,closeButton:null})
             
            }
          }
          else{
            const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
              setEmail('')
              setPassword('')
              return toast.update(toastId,{type:'success',isLoading:false,autoClose:5000,render:'Login successfull',closeButton:null})
            }
            else{
              return toast.update(toastId,{type:'error',isLoading:false,autoClose:5000,render:data.message,closeButton:null})
            }
          }
      } catch (error) {
        console.log(error)
        toast.update(toastId,{isLoading:false,type:'error',render:error.message,closeButton:null,autoClose:4000})
      }
    }
    useEffect(()=>{
      if(token){
        navigate('/')
      }
    },[token])

  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex flex-col items-center justify-center clear-both'>
      <div className='flex flex-col gap-3 text-gray-600 items-start justify-center border border-gray-500 rounded-xl shadow-xl px-4 py-3'>
        <p className='text-2xl text-gray-700 font-semibold'>{currState==='Sign Up'?'Create Account':'Login'}</p>
        <p>Please {currState==='Sign Up'?'sign up':'login'} to book appointment</p>
        {
            currState==='Sign Up' &&
            <div className='sm:min-w-[340px] w-full'>
                <p className='font-medium text-gray-700'>Full Name</p>
                <input className='w-full border border-gray-500 rounded-md py-1 focus:outline-primary px-2' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
            </div>
        }
          <div className='sm:min-w-[340px] w-full'>
                <p className='font-medium text-gray-700'>Email</p>
                <input placeholder='bharat@demo.com' className='w-full border border-gray-500 rounded-md py-1 focus:outline-primary px-2' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </div>
            <div className='sm:min-w-[340px] w-full'>
                <p className='font-medium text-gray-700'>Password</p>
                <input placeholder='user123' className='w-full border border-gray-500 rounded-md py-1 focus:outline-primary px-2' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <button className='w-full py-1 rounded-md my-1.5 bg-primary text-white hover:bg-blue-800'>{currState==='Sign Up'?'Create Account':'Login'}</button>
            {
                currState==='Sign Up'?
                <p>Already have an account? <span className='text-primary underline cursor-pointer' onClick={()=>setCurrState('Login')}>Login here</span></p>
                :
                <p>Not have account?<span className='text-primary underline cursor-pointer' onClick={()=>setCurrState('Sign Up')}>Create account</span></p>
            }
      </div>
      <p>Login as Doctor/Admin <a  href={import.meta.env.VITE_ADMIN_PANEL} className='text-primary underline mt-1 cursor-pointer'>Click here</a></p>
    </form>
  )
}

export default Login
