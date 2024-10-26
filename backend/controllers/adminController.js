import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import {doctorModel} from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js';
import { userModel } from '../models/userModel.js';

export async function addDoctor(req,res) {
    try {
        const{name,email,password,experience,degree,about,fees,speciality,available,address}=await req.body;
        const imageFile=req.file
        if(!name||!email||!password||!experience||!about||!fees||!speciality||!address||!degree){
            return res.json({success:false,message:'Please provide all fields'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please provide valid email'})
        }
        if(!validator.isLength(password)>5){
            return res.json({success:false,message:'Please provide strong password'})
        }
        //hashing password 
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //uploading image to cloudinary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl=await imageUpload.secure_url

        const doctor=new doctorModel({
            name,
            email,
            password:hashedPassword,
            experience,about,degree,
            fees,speciality,
            image:imageUrl,
            address:JSON.parse(address),
            date:Date.now()
        })
       await doctor.save()
        console.log('hashPass',hashedPassword)
        console.log('image',imageUrl)
        console.log(req.body)
        console.log({name,email,password,experience,about,fees,speciality,available,address},imageUrl)
        res.json({success:true,message:"Success !!"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export async function adminLogin(req,res) {
    try {
        const {email,password}=req.body;
        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'Invalid Credentials !!'})
        }
        const token=jwt.sign(email+password,process.env.JWT_SECRET);
       return res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export async function getAllDoctors(req,res){
    try {
        const doctors=await doctorModel.find({}).select('-password')
        return  res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export async function getAllAppointments(req,res){
    try {
        const appointments=await appointmentModel.find({})
        return  res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export async function cancelAppointment(req,res){
    try {
        const {appointmentId}=req.body
        const appointment=await appointmentModel.findById(appointmentId)

        const {docId,slotDate,slotTime}=appointment
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

export async function adminDashboard(req,res){
    try {
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})
        return res.json({success:true,dashboard:{
            doctors:doctors.length,
            patients:users.length,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }})
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
