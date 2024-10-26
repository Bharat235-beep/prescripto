import multer from "multer";

const storage=multer.diskStorage({
    filename:function(req,file,callback){
      try {
          callback(null,file.originalname)
      } catch (error) {
        console.log(error.message)
      }
    }
})

const upload= multer({storage})
export default upload