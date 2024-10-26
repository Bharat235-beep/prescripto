import jwt from 'jsonwebtoken';

export async function authAdmin(req,res,next) {
    try {
        const {atoken}=req.headers;
        console.log(req.headers)
        if(!atoken){
            console.log(atoken)
          return  res.json({success:false,message:'Authentication failed.Please login again !!'})
        }
        const token_decode= jwt.verify(atoken,process.env.JWT_SECRET)
        console.log(token_decode)
        if(token_decode===process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){

            next()
        }
        else{
            return res.json({success:false,message:'Login Failed'}) 
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message}) 
        
    }
}