import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js';
import cloudinaryConnect from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';
const app=express();
app.use(cors({
    origin:["https://prescripto-zm75.vercel.app"],
    methods:['POST','GET'],
    credentials:true
}))
const port=process.env.PORT || 4000
connectDb();
cloudinaryConnect();
app.use(express.json())
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    console.log('successfully running')
    res.send('Api working')
})

app.listen(port,()=>{
    console.log('Server connected')
})