import express from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

const route=express.Router();

route.post("/signUp",signUp);
route.post("/login",login);
route.post("/logout",logout);
export default route;