import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = ()=>{
  const {userData,setUserData,backendUrl,token,loadUserData}=useContext(AppContext)

  // const [userData,setUserData]=useState({
  //   name:'Edward Vincent',
  //   email:'richardjameswap@gmail.com',
  //   phone:'+1  123 456 7890',
  //   address:{
  //     line1:'57th Cross, Richmond ',
  //     line2:'Circle, Church Road, London'
  //   },
  //   gender:'Male',
  //   dob:'2003-12-24'
  // })
  const [isEdit,setIsEdit]=useState(false);
  const [image,setImage]=useState(false);

  const updateProfile=async()=>{
    const toastId=toast.loading('Updating...')
    try {
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)
      formData.append('address',JSON.stringify(userData.address))
      if(image){
        formData.append('image',image)
      }
      const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        setImage(false)
        loadUserData()
        setIsEdit(false)
        toast.update(toastId,{isLoading:false,type:'success',render:data.message,autoClose:4000,closeButton:null})
      }
      else{
        
        toast.update(toastId,{isLoading:false,type:'error',render:data.message,autoClose:4000,closeButton:null})
      }
      
    } catch (error) {
      console.log(error)
      toast.update(toastId,{isLoading:false,type:'error',render:error.message,autoClose:4000,closeButton:null})
    }
  }

  return userData && (
    <div className='flex flex-col items-center sm:items-start justify-center px-2 clear-both'>
      <div className=''>
        <div className='w-56 flex  rounded-full relative m-2 py-2'>
          {
            isEdit?
            <label className='flex flex-col justify-center items-center cursor-pointer' htmlFor="profile_pic">
              <div className=''>
              <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="profile_pic" hidden/>
              <img className='m-auto z-10 opacity-75' src={`${image?URL.createObjectURL(image):(userData.image?userData.image:assets.upload_area)}`} alt="" />
              <img className='absolute top-12 right-16 m-auto z-20' src={assets.upload_icon} alt="" />
              </div>
              <p className='text-gray-500'>Upload Profile Image</p>
            </label>
            :    
              <img className='m-auto' src={userData.image?userData.image:assets.upload_area} alt="" />

          }
        </div>
        {
          isEdit?
          <input onChange={(e)=>setUserData(prev=>({...prev,name:e.target.value}))} 
          className='text-2xl w-full text-neutral-700 bg-gray-50 focus:outline-blue-200' 
          type="text" value={userData.name} />
          :
          <p className='text-2xl text-neutral-700 font-medium'>{userData.name}</p>
        }
        <hr className='border-none bg-neutral-500 h-[1px] my-3'/>
        <p className='text-neutral-500 underline my-5'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr,3fr] gap-5'>
          <p className='text-gray-800'>Email ID:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='text-gray-800'>Phone:</p>
          {
          isEdit?
          <input className='text-neutral-700 bg-gray-50 focus:outline-blue-200 my-1'
          onChange={(e)=>setUserData(prev=>({...prev,phone:e.target.value}))} type="text" value={userData.phone} />
          :
          <p className='text-blue-500'>{userData.phone}</p>
        }
        <p className='text-gray-800'>Address:</p>
        {
          isEdit?
          <div>
            <input   className='text-neutral-700 bg-gray-50 focus:outline-blue-200 my-1' 
            onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} 
            type="text" value={userData.address.line1} />
            <br />
            <input   className='text-neutral-700 bg-gray-50 focus:outline-blue-200 my-1' 
            onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}
            type="text" value={userData.address.line2} />
          </div>
          :
        <p className='text-gray-700'>{userData.address.line1} <br />{userData.address.line2}</p>
        }
        </div>
        <p className='text-neutral-500 underline my-5'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr,3fr] gap-5'>
        <p className='text-gray-800'>Gender:</p>
        {
          isEdit?
          <select value={userData.gender} className='text-neutral-700 bg-gray-50 focus:outline-blue-200 my-1'
          onChange={(e)=>setUserData({...userData,gender:e.target.value})} >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          :
          <p className='text-gray-700'>{userData.gender}</p>
        }
        <p className='text-gray-800'>Birthday: </p>
        {
          isEdit?
          <input value={userData.dob} className='text-neutral-700 bg-gray-50 focus:outline-blue-200 my-1'
          onChange={e=>setUserData({...userData,dob:e.target.value})} type='date'  />
          :
          <p className='text-gray-700'>{userData.dob}</p>
        }
        </div>
      </div>
      {
          isEdit?
          <button className='border border-primary rounded-full px-10 py-2 my-2 hover:bg-primary hover:text-white transition-all duration-200' onClick={updateProfile}>Save Information</button>
          :
          <button className='border border-primary rounded-full px-10 py-2 my-2 hover:bg-primary hover:text-white transition-all duration-200' onClick={()=>setIsEdit(true)}>Edit</button>
        }
    </div>
  )
}

export default MyProfile
