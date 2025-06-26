import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';


export const protect = async (req, res, next) => {
    console.log("req.headers.authorization",req.headers.authorization);

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    console.log("Token:", token);


    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user= await User.findById(decoded.id).select('-password');
       // console.log("User:", req.user);
        console.log("Decoded token:", decoded);
        next();


    }catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
   // next();

};