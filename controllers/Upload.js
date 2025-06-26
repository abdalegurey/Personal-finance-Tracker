import cloudinary from '../utils/Cloudinary.js';
import User from '../models/User.js';

export const uploadFile = async (req, res,next) => {
    console.log("reqqqq",req)
    if(!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }



    const stream=cloudinary.uploader.upload_stream({

       folder: 'uploads',
       resource_type: 'auto',

    },

   // console.log("stream",stream),

  async(error, result) => {
        if(error){
            return next(error);
        }

          console.log("Cloudinary Upload Result:", result);

       await  User.findByIdAndUpdate(
            req.user._id,
            {   profile: result.secure_url },
            { new: true }
        )

console.log("req.file:", req.file); // File info (from multer)
// console.log("req.body:", req.body); // Form data
 console.log("req.user:", req.user); // User info (from auth middleware)
// console.log("req.headers:", req.headers); // Request headers


        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            fileUrl: result.secure_url,
            
            user:{
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                profile: result.secure_url // Assuming you want to return the updated profile URL
            },
            result,
     
        });

    }


);


stream.end(req.file.buffer);

}