import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./config/db.js"
import usersrouter from "./routes/users.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
import appointmentRouter from "./routes/appointment.routes.js";
import { departmentRouter } from "./routes/department.router.js"

dotenv.config()
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3500
connectToDB()
app.use(cors());
app.use("/api/users" , usersrouter)
app.use("/api/doctors" , doctorRouter)
app.use("/uploads" , express.static("uploads"))
app.use("/api/appointments" , appointmentRouter)
app.use("/api/department" , departmentRouter)
app.listen(PORT , (req,res) =>{
    console.log(`server is running in: ${PORT}`);
    
})