import mongoose, { model, Schema } from "mongoose";

const departmentSchema = new Schema({
    name: { type: String , required: true},
    image: String,
    description: String,
})
const department = mongoose.model("department" , departmentSchema)
export default department