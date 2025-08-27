import express from "express"
import { bookAppointment, deleteAppointment, getAppointment } from "../controllers/Appointment.controller.js";
import authMiddleware from "../Middlewares/middleware.appointment.js";
const appointmentRouter = express.Router();

appointmentRouter.post("/book" , authMiddleware() , bookAppointment)
appointmentRouter.get("/get" , authMiddleware() , getAppointment)

appointmentRouter.delete("/deleteAppointment/:id" , authMiddleware() , deleteAppointment)

export default appointmentRouter
