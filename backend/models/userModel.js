import mongoose from 'mongoose'

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,default:null},
    gender:{type:String,default:'Not Selected'},
    dob:{type:String,default:'Not Selected'},
    address:{type:Object,default:{line1:'',line2:''}},
    date:{type:Number,default:Date.now()},
    phone:{type:String,default:'0000000000'}
  
},{minimize:false})

export const userModel=mongoose.models.user || mongoose.model('user',UserSchema) 