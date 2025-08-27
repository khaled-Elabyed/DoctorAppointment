import department from "../Models/department.model.js";

export const AddDepartment = async(req,res)=> {
    try{
    if(req.user.role !== 'admin'){
        return res.status(401).json({message: "Not Authorized"})
    }
    const {name , description} = req.body
    const image = req.file ? req.file.filename : null
    if(!name)
        return res.status(404).json({message: "name is required"})
    const createDepartment = await department.create({
        name , description , image:req.file?.filename
    })
    return res.status(200).json({message : createDepartment})
    }catch(error){
        return res.status(500).json({message: "Internal Error"})
}
}

export const count_departments = async (req,res)=>{
  try {
    const count = await department.countDocuments()
    res.json({count}) 
  } catch (error) {
    return res.status(500).json({message: "Error Fetching doctors count"})
  }
}
export const Alldepartments = async (req,res)=> {
    try {
        const getAll = await department.find()
        res.json(getAll)
    } catch (error) {
        return res.status(500).json({message: "Failed to Fetch departments"})
    }
}