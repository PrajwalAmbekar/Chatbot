import express from "express";
import { login, logout, signUp, updateProfile } from "../controllers/auth.controller.js";

const route=express.Router();

route.post("/signUp",signUp);
route.post("/login",login);
route.post("/logout",logout);
route.put('/updateProfile',protectRoute,updateProfile);
export default route;