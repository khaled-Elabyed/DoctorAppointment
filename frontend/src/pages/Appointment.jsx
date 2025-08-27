import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const {user} = useContext(AuthContext)
  const [form, setForm] = useState({
    doctor: "",
    date: "",
    reason: "",
  });
  useEffect( ()=>{
    const fetchDoctor = async () =>{
      const res = await fetch("http://localhost:3500/api/doctors/AllDoctors")
      const data = await res.json()
      setDoctors(data)
    }
    fetchDoctor()
  },[])
  const handlechange = (e)=> setForm({...form , [e.target.name] : e.target.value})
  const handlesubmit = async (e)=>{
    e.preventDefault()
    const token = localStorage.getItem("token")
    const res = await fetch('http://localhost:3500/api/appointments/book',{
        method: "Post",
        headers: {"Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({...form , user: user._id}),
    })
    console.log(form)
    const data = await res.json()
    console.log(data)
    if(res.ok){
      alert("Appointment Added Successfully!")
      setForm({doctor: "", date: "", reason: ""})
    }else{
      alert("Failed To Add Appontment")
    }
  }

  if(!user){
    <div className="flex items-center justify-center h-screen text-xl">You Need to Login To An Appointment.</div>
  }
  return(
  <div className="bg-gray-100 flex justify-center items-center h-screen">   
  <form action="" onSubmit={handlesubmit} className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
    <h2 className="text-2xl text-center mb-8 font-bold">Add Appointment</h2>
    <label htmlFor="" className="block mb-2 text-sm font-semibold">Doctors</label>
    <select name="doctor" 
    value={form.doctor}
    onChange={handlechange}
    required
    id=""
    className="w-full border mb-4 p-2 rounded"
    >
      <option value="">Select doctor</option>
      {doctors?.map((doc)=>(
        <option value={doc._id} key={doc._id}>{doc?.name} {doc?.specialty} </option>
      ))}
    </select>

    <label htmlFor="" className="block text-sm font-semibold mb-2">Date</label>
    <input type="date"
    name="date"
    value={form.date}
    onChange={handlechange}
    required
    className="w-full mb-4 p-2 border rounded"
    />

    <label htmlFor="" className="block text-sm font-semibold mb-2">ٌReason</label>
    <textarea type="text"
    name="reason"
    value={form.reason}
    onChange={handlechange}
    required
    className="w-full mb-4 p-2 border rounded"
    > </textarea>
    <button type="submit" className="w-full p-2 rounded">submit</button>
  </form>
  </div>
)
};

export default Appointment;
