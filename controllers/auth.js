import User from '../models/user.js'; // Waxaa muhiim ah `.js` in la daro
// auth.js
import {generateToken} from "../utils/generateToken.js";


//Register a new user
export const registerUser = async (req, res, next) => {
    let { name, email, password, role,  profile } = req.body;

   try {
    // Check if all fields are provided
     

    email= email.toLowerCase();
    const exists= await User.findOne({
        email: email
    });
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    };


    // if (!name || !email || !password) {
    //     return res.status(400).json({ message: "Please fill all fields" });
    // }


    const user= await User.create({
        name,
        email,
        password,
        role
    });

    // Generate a token for the user

    const token =generateToken(user._id);
        res.status(201).json({ token,user });
    



   } catch (error) {
    console.log("error:", error);
    next(error)
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    
    
   }
  
}


// Login a user
export const loginUser= async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const userExists= await User.findOne({ email: email.toLowerCase() });
        // Check if user exists
        if (!userExists || !(await userExists.comparePassword(password))) {
            return res.status(400).json({ message: "User does not exist" });
        }
       
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Generate a token for the user
        const token = generateToken(userExists._id);
        res.status(200).json({ token, userExists });


        

    } catch (error) {
        console.error("Error logging in user:", error);
        next(error);
    }

}