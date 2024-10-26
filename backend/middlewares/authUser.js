import jwt from 'jsonwebtoken';

export async function authUser(req,res,next) {
    try {
        const {token}=req.headers;
        // console.log(req.headers)
        if(!token){
          return  res.json({success:false,message:'Authentication Failed.Please Login Again !!'})
        }
        const token_decode= jwt.verify(token,process.env.JWT_SECRET)
        console.log(token_decode)
        if(token_decode){
            req.body.userId=token_decode
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