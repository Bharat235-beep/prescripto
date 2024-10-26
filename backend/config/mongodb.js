import mongoose from "mongoose";

let isConnected=false;
export default async function connectDb(){
    
try {
    if(!isConnected)
     {
         await  mongoose.connect(`${process.env.MONGODB_URI}`,{
            dbName:'prescripto'
         })
      console.log('Database Connected')
      isConnected=true
    }
} catch (error) {
    console.log(error.message)
}
}