import User from "../models/user.model.js";
export const signUp =async (req,res)=>{
    const {fullName,email,passord}=req.body;

    if(passord.length<6){
        res.status(400).json("Passord length must be greater than 6");
    }

    const user=await User.findOne({email});
    if(user){
        res.status(400).json("user already exits")
    }
}

export const login =(req,res)=>{
    res.send("login");
}

export const logout =(req,res)=>{
    res.send("logout");
}