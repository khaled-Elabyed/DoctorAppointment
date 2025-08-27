import React, { useEffect, useState } from 'react'

const States = () => {
    const [doctorsCount , setdoctorsCount] = useState(0);
    const [departmentsCount , setdepartmentsCount] = useState(0);
    useEffect(()=>{
        const fetchState = async() =>{
            try {
                const docrorsStates = await fetch("http://localhost:3500/api/doctors/count")
                const departmentsState = await fetch("http://localhost:3500/api/department/count")
                const doctorsData = await docrorsStates.json()
                const departmentsData = await departmentsState.json()
                setdoctorsCount(doctorsData.count || 0)
                setdepartmentsCount(departmentsData.count || 0)

                console.log("doctors count from api", doctorsData.count);
                console.log("departments count from api", departmentsData.count);

            } catch (error) {
                console.error("Error Fetching State: " , error);          
            }
        }

        fetchState()
    },[])
    
    const states = [
        {
            icon: "fas fa-user-md" ,
            count: doctorsCount ,
            label: "doctor"
        },
        {
            icon: "far fa-hospital" ,
            count: departmentsCount ,
            label: "department"
        },
                {
            icon: "fas fa-flask" ,
            count: 8 ,
            label: "Research Labs"
        },
        {
            icon: "fas fa-award" ,
            count: 150 ,
            label: "Awards"
        }
    ]
  return (
    <section className='py-16 bg-gray-50'>
    <div className='max-w-6xl mx-auto px-4'>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {states.map((item,index)=>(
                <div key={index} className="group cursor-pointer flex items-center justify-start
                space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg
                 transition-colors duration-500 hover:bg-[#008e9b] ">
                    <i className={`${item.icon} text-[#46daea] text-4xl`}></i>
                    <span className='block text-3xl font-bold'>{item.count}</span>
                    <p className='text-gray-600 group-hover:text-white'>{item.label}</p>
                </div>
            ))}
        </div>
    </div>
    </section>
  )
}

export default States