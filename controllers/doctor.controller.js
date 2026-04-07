import doctor from "../Models/doctor.model.js";

export const AddDoctor = async (req,res)=> {
    try {
    const {name , specialty  , description , ExperienceYear } = req.body
    const image = req.file ? req.file.path : null
    if(!name || !specialty || !image || !description || !ExperienceYear){
        return res.status(400).json({message: "All Fileds are required"})
    }
    
    const newDoctor = await new doctor({name , specialty , description , ExperienceYear , image: req.file?.path})
    const savedDoctor = await newDoctor.save()
    return res.status(201).json({message: "Doctor Added Successfully", data: savedDoctor})
    } catch (error) {
        console.log(error);
     res.status(500).json({message:error})   
    }
}
export const AllDoctors = async (req, res) => {
  try {
    const doctors = await doctor.find();
    res.json(doctors);   
    console.log("Doctors sent:", doctors); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const count_doctors = async(req,res)=>{
  try {
    const count = await doctor.countDocuments()
    res.json({count}) 
  } catch (error) {
    return res.status(500).json({message: "Error Fetching doctors count"})
  }
}

export const getspecialty = async(req,res)=> {
  try {
    const {specialty} = req.params
    console.log("searching for specialty ", specialty);
/*    console.log("Specialty param:", req.params.specialty);*/
    const doctors = await doctor.find({
      specialty: {$regex: new RegExp(specialty, 'i')}
    })
    console.log('found doctor: ', doctors.length);
    res.status(200).json(doctors);
  } catch (error) {
    console.error("error: " ,error)
    res.status(500).json({message: error.message})
  }
}

export const getOne = async (req,res)=> {
  try {
    const getDoctor = await doctor.findById(req.params.id)
    if(!getDoctor){
      return res.status(404).json({message: "Not Found"})
    }
    return res.status(200).json({message: "search successfully",Data: getDoctor})
  } catch (error) {
      return res.status(500).json({message: error})
  }
}
