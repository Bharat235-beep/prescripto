import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality}=useParams();
  const navigate=useNavigate();
  const {doctors,setProgress}=useContext(AppContext)
  const [filterDoc,setFilterDoc]=useState([])
  const [showFilter,setShowFilter]=useState(false)
  // console.log(speciality)
  useEffect(()=>{
    setProgress(20)
    if(speciality){
      setFilterDoc(doctors.filter(val=>val.speciality===speciality))
      setProgress(60)
    }
    else{
      setFilterDoc(doctors)
      setProgress(60)
    }
    setProgress(100)
  },[speciality,doctors])
  return (
    <div className='clear-both'>
      <p className='text-gray-700'>Browse through the doctors specialist.</p>
      <button className={`border block lg:hidden border-gray-400 rounded-full px-5 py-1 ${showFilter?'bg-primary text-white':''}`} onClick={()=>setShowFilter(!showFilter)}>Filter</button>
      <div className='flex flex-col md:flex-row place-items-start'>
        <div className={`w-full flex flex-col gap-3 py-5 md:w-auto mx-2 text-gray-600 ${showFilter?'flex':'hidden lg:flex'}`}>
          <p onClick={()=>{speciality==='General Physician'?navigate('/doctors'):navigate('/doctors/General Physician');scrollTo(0,0)}} className={' border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer'+`${speciality==='General Physician'?' bg-indigo-200 text-black':''}`}>General physician</p>
          <p onClick={()=>{speciality==='Gynecologist'?navigate('/doctors'):navigate('/doctors/Gynecologist');scrollTo(0,0)}} className={' border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer'+`${speciality==='Gynecologist'?'  bg-indigo-200 text-black':''}`}>Gynecologist</p>
          <p onClick={()=>{speciality==='Dermatologist'?navigate('/doctors'):navigate('/doctors/Dermatologist');scrollTo(0,0)}} className={' border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer'+`${speciality==='Dermatologist'?' bg-indigo-200 text-black':''}`}>Dermatologist</p>
          <p onClick={()=>{speciality==='Pediatricians'?navigate('/doctors'):navigate('/doctors/Pediatricians');scrollTo(0,0)}} className={' border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer'+`${speciality==='Pediatricians'?' bg-indigo-200 text-black':''}`}>Pediatricians</p>
          <p onClick={()=>{speciality==='Neurologist'?navigate('/doctors'):navigate('/doctors/Neurologist');scrollTo(0,0)}} className={` border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer ${speciality!=='Neurologist'?'':'bg-indigo-200 text-black'}`}>Neurologist</p>
          <p onClick={()=>{speciality==='Gastroenterologist'?navigate('/doctors'):navigate('/doctors/Gastroenterologist');scrollTo(0,0)}} className={' border border-gray-500 rounded-lg px-2 py-1 pr-20 cursor-pointer'+`${speciality==='Gastroenterologist'?' bg-indigo-200 text-black':''}`}>Gastroenterologist</p>
        </div>
        <div className='w-full py-5 grid grid-cols-auto place-items-center gap-2 gap-y-5'>
      {filterDoc.map((item)=>{
        return(
            <div key={item._id} onClick={()=>navigate('/appointment/'+item._id)} className='flex gap-3 flex-col items-start border w-fit border-gray-500 cursor-pointer rounded-lg hover:translate-y-[-5%] transition-all duration-300'>
                <img className='bg-blue-100 w-80' src={item.image} alt="" />
                <div className={`gap-2 flex items-center px-2 py-1 ${item.available?'text-green-500':'text-gray-500'}`}>
                    <p className={`w-2 h-2 rounded-full  ${item.available?'bg-green-500':'bg-gray-500'}`}></p><p>{item.available? 'Available':'Not Available'}</p>
                </div>
                <div className='px-2 py-1 flex flex-col items-start'>
                    <p>{item.name}</p>
                    <p className='text-sm text-gray-600'>{item.speciality}</p>
                </div>
            </div>
        )
      })}
      </div>
      </div>
    </div>
  )
}

export default Doctors
