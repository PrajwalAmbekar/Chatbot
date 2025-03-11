import mongoose, { mongo } from "mongoose"

const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:text,
    },
    image:{
        type:text,
    }

},{timestamp:true}
);


const message=mongoose.model("message",messageSchema);
export default message;