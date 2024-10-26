import jwt from 'jsonwebtoken';

export async function authDoctor(req,res,next) {
    try {
        const {dtoken}=req.headers;
        //  console.log(req.headers)
        if(!dtoken){
          return  res.json({success:false,message:'Authentication Failed.Please Login Again !!'})
        }
        const token_decode= jwt.verify(dtoken,process.env.JWT_SECRET)
        console.log(token_decode)
        if(token_decode){
            req.body.docId=token_decode.id
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