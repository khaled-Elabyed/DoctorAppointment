import express from "express";
import { register, login } from "../controllers/users.controller.js";
const usersrouter = express.Router()

usersrouter.post('/register' , register) 
usersrouter.post('/login' , login)

export default usersrouter