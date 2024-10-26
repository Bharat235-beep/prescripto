import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = (props) => {
    const {doc_id,speciality}=props;
    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)
    let [relDocs,setRelDocs]=useState(null)

    useEffect(()=>{
        if(doctors.length>0 && doc_id && speciality){
            let relDoctors=doctors.filter((doc)=>doc._id!==doc_id && doc.speciality===speciality)
            setRelDocs(relDoctors)
        }
    },[doctors,doc_id,speciality])
  return relDocs && (
    <div id='top-doctors' className='text-center'>
    <h1 className='text-3xl font-medium text-center'>Top Doctors to Book</h1>
    <p className='text-center my-5 text-gray-700'>Simply browse through our extensive list of trusted doctors</p>
    <div className='grid grid-cols-auto place-items-center gap-4 my-14'>
  {relDocs.slice(0,5).map((item)=>{
    return(
        <div key={item._id} onClick={()=>{navigate('/appointment/'+item._id);scrollTo(0,0)}} className='flex gap-3 flex-col items-start border w-fit border-gray-500 cursor-pointer rounded-lg hover:translate-y-[-5%] transition-all duration-300'>
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
  <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-purple-300 text-purple-950 font-medium px-10 py-2 my-2 rounded-3xl'>more</button>
</div>
  )
}

export default RelatedDoctors
