import express from 'express'
import { authAdmin } from '../middlewares/authAdmin.js'
import { appointmentCancel, appointmentComplete, changeAvailabilty, doctorAppointments, doctorDashboard, doctorLogin, doctorProfile, getDoctorsList, updateDoctorProfile } from '../controllers/doctorController.js'
import { authDoctor } from '../middlewares/authDoctor.js'


const doctorRouter=express.Router()

doctorRouter.post('/set-availability',authAdmin,changeAvailabilty)
doctorRouter.get('/list',getDoctorsList)
doctorRouter.get('/appointments',authDoctor,doctorAppointments)
doctorRouter.post('/login',doctorLogin)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter;