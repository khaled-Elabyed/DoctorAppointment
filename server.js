import dotenv from "dotenv";
dotenv.config({ path: "./.env", debug: true });
console.log("MONGO_URI =>", process.env.MONGO_URI);

import express from "express"
import cors from "cors"
import helmet from "helmet"
import connectToDB from "./config/db.js"
import usersrouter from "./routes/users.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
import appointmentRouter from "./routes/appointment.routes.js";
import { departmentRouter } from "./routes/department.router.js"
import fs from "fs";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3500

console.log("Env file exists? ", fs.existsSync(".env"));
console.log("process.env keys =>", Object.keys(process.env).filter(k => k.includes("MONGO")));
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("SECRET_KEY:", process.env.SECRET_KEY);
console.log("PORT:", process.env.PORT);

connectToDB()
app.use(helmet());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://doctor-appointment-r8dm.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// Keep-alive endpoint for free hosting cold starts
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
});
app.use("/api/users" , usersrouter)
app.use("/api/doctors" , doctorRouter)
app.use("/uploads" , express.static("uploads"))
app.use("/api/appointments" , appointmentRouter)
app.use("/api/department" , departmentRouter)
app.listen(PORT , (req,res) =>{
    console.log(`server is running in: ${PORT}`);
    
})