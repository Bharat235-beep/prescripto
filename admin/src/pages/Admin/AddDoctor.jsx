import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const AddDoctor = () => {

  const {backendUrl,aToken}=useContext(AdminContext)
  const [docImg,setDocImg]=useState(false);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('')
  const [fees,setFees]=useState('')
  const [speciality,setSpeciality]=useState('General Physician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')
  const [about,setAbout]=useState('')

  const handleOnSubmit=async(e)=>{
    let id= toast.loading('Saving Doctor Details...')
    try {
      e.preventDefault();
      if(!docImg){
        return toast.update(id,{type:'error',theme:'colored',isLoading:false,render:'Image not selected',autoClose:5000,closeButton:null})
      // return toast.error('Image not selected')
      }
      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('degree',degree)
      formData.append('speciality',speciality)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.append('about',about)

      formData.forEach((val)=>console.log(val))
      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
      if(data.success){
        setDocImg(false);
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        return toast.update(id,{type:'success',isLoading:false,autoClose:5000,render:data.message,closeButton:null})
        
      }
      else{
        
        return toast.update(id,{type:'error',isLoading:false,autoClose:5000,render:data.message,closeButton:null})
      }
    } catch (error) {
      console.log(error)
      return toast.update(id,{type:'error',isLoading:false,autoClose:5000,render:error.message,closeButton:null})

    }
  }


  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col mx-5 sm:mx-14 py-5 w-full  max-h-[90vh] overflow-y-scroll'>
      <div className='flex flex-col gap-5 text-gray-600 font-medium'>
        <p className='text-3xl text-gray-600 font-medium'>Add Doctor</p>
        <div className='bg-white rounded-xl py-5 w-[95%] box-border flex flex-col gap-2'>
          <div className='flex gap-2 p-2 items-center text-gray-600'>
            <label htmlFor="doc-img">
              <img className='w-20 cursor-pointer rounded-full' src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
            </label>
            <input type="file" onChange={(e)=>setDocImg(e.target.files[0])} accept='image/*' id='doc-img' hidden />
            <p className='text-gray-800 font-medium'>Upload doctor <br />picture</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex flex-col p-2 flex-1 gap-1'>
                <p>Doctor name</p>
                <input value={name}  onChange={(e)=>setName(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="text" placeholder='Name' />
              </div>
              <div className='flex flex-col p-2 flex-1 gap-1'>
                <p>Doctor email</p>
                <input value={email}  onChange={(e)=>setEmail(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="email" placeholder='Email' />
              </div>
              <div className='flex flex-col p-2 flex-1 gap-1'>
                <p>Doctor password</p>
                <input value={password}  onChange={(e)=>setPassword(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="password" placeholder='Password' />
              </div>
              <div className='flex flex-col p-2 flex-1 gap-1'>
                <p>Experience</p>
                <select value={experience}  onChange={(e)=>setExperience(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' >
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  <option value="6 year">6 year</option>
                  <option value="7 year">7 year</option>
                  <option value="8 year">8 year</option>
                  <option value="9 year">9 year</option>
                  <option value="10 year">10 year</option>
                </select>
              </div>
              <div className='flex flex-col p-2 flex-1 gap-1'>
                <p>Fees</p>
                <input value={fees}  onChange={(e)=>setFees(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="number" />
              </div>
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <div className='flex flex-col p-1 gap-2'>
                <p>Speciality</p>
                <select value={speciality}  onChange={(e)=>setSpeciality(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded'>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className='flex flex-col p-2 gap-2'>
                <p>Education</p>
                <input value={degree}  onChange={(e)=>setDegree(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="text" placeholder='Education' />
              </div>
              <div className='flex flex-col p-2 gap-2'>
                <p>Address</p>
                <div className='flex flex-col gap-12'>
                  <input value={address1}  onChange={(e)=>setAddress1(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="text" placeholder='Address 1' />
                  <input value={address2}  onChange={(e)=>setAddress2(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' type="text" placeholder='Address 2' />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col p-2 gap-2'>
            <p>About Me</p>
            <textarea value={about}  onChange={(e)=>setAbout(e.target.value)} className='flex flex-1 px-2 py-1 border border-gray-500 rounded' rows={5} placeholder='Write about yourself' />
          </div>
          <button className='bg-primary text-white w-44 hover:bg-indigo-700 mx-2 px-3 py-1 rounded-full'>Add Doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
