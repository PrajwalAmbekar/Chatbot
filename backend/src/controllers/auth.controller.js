import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";





export const signUp = async (req, res) => {
    try {
        const { fullName, email, password, profilePic } = req.body;
        if (!fullName || !password || !email) {
            res.status(400).json("Every field are required");
        }

        if (password.length < 6) {
            res.status(400).json("Passord length must be greater than 6");
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json("user already exits");
        }
        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,

            })
        } else {
            res.status(400).json("Error in creating newUser account")
        }
    }
    catch(error){
        console.log("Error in creating sign-up page",error.message);
        res.status(500).json("Internal Server Error");
    }




}

export const login =async (req, res) => {
   try {
    const [email,password]=req.body;
    const user=await new User.findOne({email});
    if (!email){
        res.status(400).json("Invalid Credentials");
    }
    const isPasswordCorrect=bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        res.status(400).json("Invalid credentials");
    }

    generateToken(newUser._id,res);
    res.status(200).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic,
    })
    
   } catch (error) {
    console.log("Error in Login",error.message);
    res.status(500).json("Onternal Server Error");
   }
}

export const logout = (req, res) => {
    try {
        res.cookies("jwt","",{maxAge:0});
        res.status(200).json("Logged out successfully");
        
    } catch (error) {
        console.log("Error in logout controller");
        res.status(500).json("Internal Server Error");
    }
}
export const updateProfile=async (req,res)=>{
    try {
        const {profilePic} =req.body;
        const userId=req.user._id;
        if(!profilePic){
            res.status(401).json("Profile pic is not provided");
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        res.status(200).json("Profile pic is updated successfully");
    } catch (error) {
        console.log("Error in updating profile pic");
        res.status(500).json("Internal Server error");
        
    }
   


}