import express from "express";
import authRouter from "../src/routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRouter from '../src/routes/message.route.js'; 
import cors from "cors";

dotenv.config();

const app=express();

const PORT=process.env.PORT;  
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter,);
app.use('/api/message',messageRouter);
app.use(cors({
    origin:"http://localhost:5713",
    Credential:true,
}));

app.listen(PORT,()=>{
    console.log("the server is running on the port " + PORT)
    connectDb();
})
