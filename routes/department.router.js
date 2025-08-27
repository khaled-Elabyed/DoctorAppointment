import express from "express"
import { AddDepartment, Alldepartments, count_departments } from "../controllers/department.controller.js"
import adminverify from "../Middlewares/middleware.department.js"
import { upload } from "../controllers/multer.js"
export const departmentRouter = express.Router()

departmentRouter.post("/addDepartment" , adminverify('admin') ,upload.single('image') , AddDepartment)
departmentRouter.get('/count' , count_departments)
departmentRouter.get('/Alldepartments', Alldepartments)