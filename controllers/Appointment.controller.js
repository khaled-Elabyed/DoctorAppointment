import mongoose from "mongoose";
import appointment from "../Models/appointment.model.js";

export const bookAppointment = async (req,res)=> {
    try {
    const {doctor , date , reason} = req.body
    if( !doctor || !date || !reason){
        return res.status(400).json({message: "Missing Fileds"})
    }
    const book = await appointment.create({
        user: req.user.id , doctor , date , reason        
    })
    return res.status(200).json({message: "The Appointment has been booked" , message: book})
    } catch (error) {
        return res.status(500).json({message: "Failed Booked"})    
    }
}
export const getAppointment = async (req,res) => {
    try {
    const getAll = await appointment.find({user: req.user.id}).populate("doctor")
    return res.json({ appointments: getAll })
    } catch (error) {
    return res.status(500).json({message: "Don’t have Access"})    
    }
}
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting appointment with ID:', id); 
        
        const deleted = await appointment.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
