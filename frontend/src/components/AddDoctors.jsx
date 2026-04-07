import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import defaultImage from "../assets/image/download.webp"

const AddDoctors = () => {
const {user} = useContext(AuthContext)
const [preview , setPreview] = useState(null)
const [error , setError] = useState(null)
const [form , setForm] = useState({
    name: "",
    specialty: "",
    description: "",
    ExperienceYear: "",
    image: null
})
const handlechange = (e) =>{
    const {name , value , files} = e.target 
    if(files){
        const file = files[0]
        setForm({...form , image : file})
        setPreview(URL.createObjectURL(file))
    }else{
        setForm({...form ,[name] : value })
    } 
}
const handlesubmit = async(e)=> {
    e.preventDefault()
    setError(null)
    try {
        const token = localStorage.getItem('token')
        const formData =new FormData()
        formData.append("name",form.name)
        formData.append("specialty",form.specialty)
        formData.append("ExperienceYear",form.ExperienceYear)
        formData.append("description" , form.description)
        if(form.image) formData.append("image" , form.image)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/AddDoctor`,
        {
            method: "Post",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        })
        const data = await res.json()
        console.log("response data: ", data , "response res: ",res)
        if(!res.ok){
            throw new Error(data.message || "Failed Added Doctor")
        }
        alert('Added Doctor Successfully')
        setForm({name:"",specialty:'',description:'',ExperienceYear:'',image:null})
    } catch (error) {
        console.log("Error submitting Form", error);
        setError(error.message)
    }
}
    if(!user || user.role !== "admin"){
        return <div className="flex items-center h-screen">Only Admin Can Add Doctor</div>
    }

    return (
    <div className='bg-gray-100 flex justify-center items-center h-screen'>
        <form onSubmit={handlesubmit}  className='bg-white flex gap-8 w-full
        max-w-2xl shadow-lg rounded-lg p-8' encType = "multipart/form-data">
            <div className="flex flex-col items-center w-1/3 ">
            <div className="w-36  rounded-full  overflow-hidden object-cover">
            {preview ? (<img src={preview} className='w-full h-full object-cover' />):
            (<img src={defaultImage} alt="" />)
            }
            </div>
            <button type='button'  onClick={()=> document.getElementById('fileinput').click()} className='mt-4'>Choose Image</button>
            <input type="file" onChange={handlechange} accept='image/*' className='hidden' id='fileinput'/>
            </div>

            <div className="w-2/3">
            <h2 className='text-2xl font-bold text-[#008e9b] text-center mb-4'>Add Doctor</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <label className='block mb-1 font-semibold'>Name</label>
            <input type="text" onChange={handlechange} value={form.name} name="name" className='w-full border rounded mb-2 p-1'/>
            
            <label className='block mb-1 font-semibold'>specialty</label>
            <input type="text" onChange={handlechange} value={form.specialty} name="specialty" className='w-full border rounded mb-2 p-1'/>
            
            <label className='block mb-1 font-semibold'>ExperienceYear</label>
            <input type="Number" onChange={handlechange} value={form.ExperienceYear} name="ExperienceYear" className='w-full border rounded mb-2 p-1'/>
            
            <label className='block mb-1 font-semibold'>description</label>
            <input type="text" onChange={handlechange} value={form.description} name="description" className='w-full border rounded mb-2 p-1'/>
            <button>Add Doctor</button>
            </div>
        </form>

    </div>
  )
}

export default AddDoctors