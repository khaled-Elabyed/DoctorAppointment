import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    image: String,
    description: String,
    ExperienceYear: Number,
})

const doctor = mongoose.model("doctor" , doctorSchema)
export default doctor