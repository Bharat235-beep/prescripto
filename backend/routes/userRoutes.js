import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointments, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorPay } from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.get('/list-appointments',authUser,listAppointments)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verify-razorpay',authUser,verifyRazorPay)

export default userRouter