import userModel from '../Models/users.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

export const register = async (req , res) => {
    try {
    const  {name , email , password , role = "user"} = req.body
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
       }
       const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(400).json({message: 'User Already Exist'})
        }
        const hash = await bcrypt.hash(password ,10)
        const newuser = await userModel.create({name,email,password: hash , role})
        console.log(newuser);
        let token = jwt.sign({id: newuser._id , email: newuser.email , role: newuser.role}, process.env.SECRET_KEY , {expiresIn: "1w"})
        return res.status(201).json({message: "user registered", token, 
            id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            role: newuser.role
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const login = async (req , res) => {
    try{
    const {email , password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Invalid Email and Password"})
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message: "Invalid Email and Password"})
    }
    const match = await bcrypt.compare(password , user.password)
    if(!match){
        return res.status(400).json({message: "Invalid Email and Password"})    
    }
    const token = jwt.sign({id: user._id , email: user.email , role: user.role}, process.env.SECRET_KEY , {expiresIn: "1w"})
    return res.status(201).json({message: "logged successfully", token ,
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}