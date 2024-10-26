import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { doctorModel } from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import Razorpay from 'razorpay';

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        if (password.length < 5) {
            return res.json({ success: false, message: 'Please provide strong password' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please provide valid email' })
        }
        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        //creating new user
        const userData = {
            name, email,
            password: hashPassword
        }

        const newUser = await userModel(userData)
        const user = await newUser.save()

        const token = await jwt.sign(user._id.toString(), process.env.JWT_SECRET)

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })

    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Please check your password' })
        }
        const token = jwt.sign( user._id.toString() , process.env.JWT_SECRET)
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function getProfile(req, res) {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password')
        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        } else {
            return res.json({ success: true, userData })
        }
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function updateProfile(req, res) {
    try {
        const { userId, name, gender, dob, phone, address } = req.body
        const imageFile = req.file
        console.log(req.body)
        if (!(name || gender || dob || phone || address)) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        await userModel.findByIdAndUpdate(userId, { name, gender, dob, phone, address: JSON.parse(address) })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path);
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        return res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function bookAppointment(req, res) {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        if(!slotDate||!slotTime){
            return res.json({ success: false, message: "Date or time not provided" })
        }
        let docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" })
        }

        let slots_booked = docData.slots_booked
        docData=await doctorModel.findById(docId).select(['-password','-slots_booked'])
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot Not Available" })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        

        const userData = await userModel.findById(userId).select('-password')

        const appointment = await appointmentModel.create({
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        })
        appointment.save()
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        return res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
export async function listAppointments(req,res){
    try {
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId})
        return res.json({ success: true,appointments })
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}
export async function cancelAppointment(req,res){
    try {
        const {userId,appointmentId}=req.body
        const appointment=await appointmentModel.findById(appointmentId)
        if(appointment.userId!==userId){
            return res.json({sucess:false,message:'Unauthorized Access'})
        }
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
const razorpayInstance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

export async function paymentRazorpay(req,res){
    try {
        const {appointmentId}=req.body
        const appointment=await appointmentModel.findById(appointmentId)
        if(appointment.cancelled || appointment.payment){
            return res.json({sucess:false,message:'Appointment Not Found'})
        }
        const options={
            amount:appointment.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId
        }
        const order=await razorpayInstance.orders.create(options)
        return res.json({success:true,order})
        
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export async function verifyRazorPay(req,res){
    try {
        const {razorpay_order_id}=req.body
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            return res.json({ success: true, message: "Payment Successfull" })
        }
      
            return res.json({ success: false, message: "Payment Failed" })  
        
    
    } catch (error) {
        console.log(error)
         return res.json({ success: false, message: error.message })
    }
}
