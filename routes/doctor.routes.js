import express from "express"
import { upload } from "../controllers/multer.js"
import { AddDoctor, AllDoctors, count_doctors, getOne, getspecialty } from "../controllers/doctor.controller.js"

const doctorRouter = express.Router()

doctorRouter.post('/AddDoctor', upload.single('image') , AddDoctor)
doctorRouter.get('/AllDoctors' , AllDoctors)
doctorRouter.get('/count', count_doctors)
doctorRouter.get('/byspecialty/:specialty', getspecialty)
doctorRouter.get('/:id', getOne)

export default doctorRouter