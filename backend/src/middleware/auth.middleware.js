import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookie.jwt;
    if(!token){
        res.status(401).json("unauthorized-No token provided");
    }
    const decode=jwt.verify(token.process.env.JWT_SECRET);
    if(!decode){
        res.status(401).json("Unauthorized - Invalid token");
    }
    const user = await User.findById(decode.userId).select("-password");
    if(!user){
        res.status(404).json("user not found");
    }
    req.user=user;
    next();
    } catch (error) {
        console.log("Error in protectRoute middleware");
        res.status(500).json("Internal Server Error");
        
    }
    
}