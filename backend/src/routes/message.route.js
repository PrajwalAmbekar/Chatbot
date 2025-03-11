import express from "express";
import { getMessage, getUserForSideBar } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const routes=express.Router();

routes.get("/users", protectRoute ,getUserForSideBar);
routes.get("/:id",protectRoute,getMessage);

export default routes;