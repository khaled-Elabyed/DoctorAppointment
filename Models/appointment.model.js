import mongoose from "mongoose";

const appointmentModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,ref: "user"
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,ref: "doctor"
    },
    date: Date,
    reason: String 
})

const appointment = mongoose.model('appointment' , appointmentModel)
export default appointment