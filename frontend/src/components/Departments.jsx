import React, { useEffect, useState } from 'react'

const Departments = () => {
  const [departments , setdepartments] = useState([])
  const [activeTab , setactiveTab] = useState(null)

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3500'}/api/department/Alldepartments`)
    .then((res)=>res.json())
    .then((data)=>{setdepartments(data)
    if(data.length > 0){ setactiveTab(data[0]._id)
    }
    })
    .catch((err)=> console.error("Failed To Fetch departments ",err))
    },[])
    const handleTapclick = (id)=>{
        setactiveTab(id)
    }
  return (
    <section className='bg-white max-w-6xl py-12 px-4 mx-auto'>
    <div className='text-center mb-8 '>
        <h2 className="text-3xl font-bold mb-2">Departments</h2>
        <p className='text-gray-600 max-w-xl mx-auto'>
           Explore our specialized medical departments staffed with expert doctors.
        </p>
    </div>

    <div className="flex flex-col md:flex-row gap-6">
        <ul className='flex md:flex-col space-x-4 md:space-x-0 
        border-b md:border-b-0 md:border-r border-gray-300'>
            {departments.map((dep)=>(
                <li key={dep._id}>
                    <button onClick={()=> handleTapclick(dep._id)} className={`w-40 mr-4 block py-2 px-4 rounded-t 
                    md:rounded-t-none md:rounded-l ${activeTab === dep._id ? "bg-[#008e9b] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"    
                    }`}> 
                    {dep?.name }
                    </button>
                </li>
            ))}

        </ul>

        <div className="flex-1 bg-gray-50 p-6 rounded shadow">
          {departments.map((dep)=>(
            dep?._id === activeTab ? (
              <div key={dep._id} className="flex flex-col md:flex-row items-center gap-6">
                <div className="">
                  <h3 className='text-[#008e9b] text-2xl font-bold mb-2'>{dep?.name}</h3>
                  <p>{dep?.description}</p>
                </div>
              </div>
            ) : null
          ))}
        </div>
    </div>
    </section>
  )
}

export default Departments