import React from 'react'
import Home from './pages/Home'
import { Routes , Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Appointment from './pages/Appointment'
import AddDoctors from './components/AddDoctors'
import AllDoctors from './pages/AllDoctors'
import DoctorDetails from './pages/DoctorDetails'
import MyAppointment from './pages/MyAppointment'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Department from './pages/Deparment'
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
     <Route index path="/" element={<Home />} />
     <Route path='/login' element={<Login />}/>
     <Route path='/register' element={<Register />}/>
     <Route path='/AddApointment' element={<Appointment />}/>
     <Route path='/AddDoctor' element={<AddDoctors />} />
     <Route path='/AllDoctors' element={<AllDoctors />} />
     <Route path='/doctor/:id' element={<DoctorDetails />} />
     <Route path='/myAppointment' element={<MyAppointment />} />
     <Route path='/department' element={<Department />}/>
     </Routes>
     <ToastContainer position='top-right' autoClose={3000} />
    </>
  )
}

export default App