import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    email:{
        require:true,
        unique:true,
        type:String
    },
    fullName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        minLength:6,
    },
    profilePic:{
        default:"",
    },
},{
    timestamps:true,
}
);

const User=mongoose.model("User",userSchema);
export default User;