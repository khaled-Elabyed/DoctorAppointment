import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const AllDoctors = () => {
  const [doctors , setDoctors] = useState([])
  useEffect(()=>{
    const fetchDoctor = async()=>{
        try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/AllDoctors`)
        const data = await res.json()
        if(!res.ok)
             throw new Error(data.message || "Falied to Fetch Doctors")
            setDoctors(data)
        } catch (error) {
        console.log(error)    
        }
    }
    fetchDoctor()
  },[])
    return (
    <div className='bg-gray-100 p-8 min-h-screen'>
        <h2 className='text-3xl text-center font-bold mb-8 text-[#008e9b]'>Our Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {doctors?.map((doc)=>(
                <div key={doc._id} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <Link to={`/doctor/${doc?._id}`}>
                    <img src={doc?.image?.startsWith("http") ? doc.image : `${import.meta.env.VITE_API_URL}/uploads/${doc?.image}`}
                     className='w-32 h-32 rounded-full mx-auto border object-cover mb-4' alt="" />
                    <h3 className='text-xl font-semibold'>{doc?.name}</h3>
                    <p className='text-gray-600'>{doc?.specialty}</p>
                    <p className='text-gray-500 text-sm'>{doc?.ExperienceYear} Years of Experince</p>
                    </Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllDoctors