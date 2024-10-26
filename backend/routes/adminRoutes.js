import express from 'express'
import { addDoctor, adminDashboard, adminLogin, cancelAppointment, getAllAppointments, getAllDoctors } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import { authAdmin } from '../middlewares/authAdmin.js'
import { changeAvailabilty } from '../controllers/doctorController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.get('/all-doctors',authAdmin,getAllDoctors)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.get('/appointments',authAdmin,getAllAppointments)
adminRouter.post('/set-availability',authAdmin,changeAvailabilty)
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointment)
export default adminRouter
