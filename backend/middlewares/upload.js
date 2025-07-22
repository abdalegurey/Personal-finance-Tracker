import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/Cloudinary.js';


export const upload = multer({

    cloudinary,
    limits:{
        fileSize: 1024 * 1024 * 10 // 10 MB
    }
})