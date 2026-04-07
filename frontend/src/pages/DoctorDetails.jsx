import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const DoctorDetails = () => {
  const [doctor , setDoctor] = useState(null)
  const {id} = useParams()
  const [relatedspecialty , setRelatedspecialty] = useState([])
  useEffect(()=>{
    const fetchDoctor = async()=>{
        try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`)
        const data = await res.json()
        if(!res.ok)
            throw new Error(data.message ||"Failed Fetch to Doctor Details")
        setDoctor(data.Data)
        /*fetchRelatedSpecialty(data?.specialty.toLowerCase(),data?._id)*/
        fetchRelatedSpecialty(data.Data?.specialty, data.Data?._id)
    } catch (error) {
        console.error(error);
        }
    }
    const fetchRelatedSpecialty = async(specialty,currentId)=>{
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/byspecialty/${specialty}`)
            const data = await res.json()
        if(!res.ok)
            throw new Error(data.message ||"Failed Fetch to specialty doctor")
        const normalized = data.filter((doc)=>doc?._id !== currentId && doc?.specialty?.trim().toLowerCase() === specialty?.trim().toLowerCase())
          setRelatedspecialty(normalized)
          console.log(normalized)
        } catch (error) {
            console.error("Error fetching to related specialty: " , error)
        }
    }

    fetchDoctor()
  },[id])
    return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl p-8 m-auto min-h-screen'>
        <div className="md:col-span-2 flex flex-col md:flex-row items-center ">
        <img src={doctor?.image?.startsWith("http") ? doctor.image : `${import.meta.env.VITE_API_URL}/uploads/${doctor?.image}`} 
        className='w-56 h-56 rounded-lg shadow-md object-cover mb-6 md:mb-0 md:mr-10' alt="" />
        <div className="space-y-4">
            <h3 className='text-4xl font-bold text-[#008e9b]'>{doctor?.name}</h3>
            <p className='text-gray-700 text-xl'>{doctor?.specialty}</p>
            <p className='text-gray-600'>{doctor?.ExperienceYear} Years of Experince</p>
            <p className='text-gray-600'>{doctor?.description}</p>
        </div>
        </div>
        <div className="">
            <h3 className='text-2xl text-[#008e9b] mb-3'>Other {doctor?.specialty} Doctors</h3>
        <div className="space-y-4">
            {relatedspecialty.length > 0 ?(
                relatedspecialty.map((doc)=>(
                    <Link key={doc?._id} to={`/doctor/${doc?._id}`} className='flex items-center bg-white rounded-lg shadow p-3'>
                         <img src={doc?.image?.startsWith("http") ? doc.image : `${import.meta.env.VITE_API_URL}/uploads/${doc?.image}`}
                         className='w-16 h-16 rounded-full object-cover mr-4 border'/>
                         <div className="">
                            <h3 className='text-4xl font-bold text-[#008e9b]'>{doc?.name}</h3>
                            <p className='text-gray-700 text-xl'>{doc?.specialty}</p>
                         </div>
                    </Link>
                ))
            ) : <p className='text-gray-500'>No related Doctors Found.</p>
        }
        </div>
        </div>
    </div>
  )
}

export default DoctorDetails