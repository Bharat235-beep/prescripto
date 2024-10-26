import {doctorModel} from '../models/doctorModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

export async function changeAvailabilty(req,res) {
    try {
        const {docId}=req.body
        const doctor=await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId,{available:!doctor.available})
        return res.json({success:true,message:'Availabilty changed '})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export async function getDoctorsList(req,res) {
    try {
        const doctors=await doctorModel.find({}).select(['-email','-password'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export async function doctorLogin(req,res) {
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:false,message:'Invalid credentials'})
        }
        const isMatch=await bcrypt.compare(password,doctor.password)
        if(!isMatch){
            return res.json({success:false,message:'Invalid credentials'}) 
        }
        const token=await jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        return res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}
export async function doctorAppointments(req,res){
    try {
        const {docId}=req.body
        console.log(docId)
        const appointments=await appointmentModel.find({docId})
        return res.json({success:true,appointments:appointments.reverse()})
        
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})  
    }
}
export async function appointmentCancel(req,res){
    try {
        const {docId,appointmentId}=req.body
        const appointment=await appointmentModel.findById(appointmentId)
        if(appointment.docId!==docId){
            return res.json({sucess:false,message:'Unauthorized Access'})
        }
        if(appointment.isCompleted){
            return res.json({sucess:false,message:'Operation failed'})
        }
        const {slotDate,slotTime}=appointment
       await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        const docData=await doctorModel.findById(docId)
        let slots_booked=docData.slots_booked
        slots_booked[slotDate]=await slots_booked[slotDate].filter(val=>val!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        console.log( slots_booked[slotDate])
        return res.json({ success: true, message: 'Appointment Cancelled' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
export async function appointmentComplete(req,res){
    try {
        const {docId,appointmentId}=req.body
        const appointment=await appointmentModel.findById(appointmentId)
        if(appointment.docId!==docId){
            return res.json({sucess:false,message:'Unauthorized Access'})
        }
        if(appointment.cancelled){
            return res.json({sucess:false,message:'Operation failed'})
        }
        const {slotDate,slotTime}=appointment
       await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
        const docData=await doctorModel.findById(docId)
        let slots_booked=docData.slots_booked
        slots_booked[slotDate]=await slots_booked[slotDate].filter(val=>val!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        console.log( slots_booked[slotDate])
        return res.json({ success: true, message: 'Appointment Completed' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function doctorDashboard(req,res){
    try {
        const {docId}=req.body
        const appointments=await appointmentModel.find({docId})
        let earnings=0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings+=Number(item.docData.fees)
            }
        })
        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashboard={
            earnings,
            patients:patients.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashboard})
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function doctorProfile(req,res) {
    try {
        const {docId}=req.body
        const doctor=await doctorModel.findById(docId)
        res.json({success:true,doctor})
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
export async function updateDoctorProfile(req,res) {
    try {
        const {docId,address,fees,available}=req.body
        await doctorModel.findByIdAndUpdate(docId,{address,fees,available})
        return res.json({ success: true, message: 'Profile Updated' })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
