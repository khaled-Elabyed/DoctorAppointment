import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const {user , logout} = useContext(AuthContext)
  return (
    <nav className="bg-white text-[#008e9b] shadow-md flex justify-between">
      <div>
        <img className="w-32" src="src\assets\image\image-1754131493134-851803676.png" alt="" />
      </div>
      <ul className="flex items-center space-x-6 px-4">
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/"}>Services</Link> </li>
        <li><Link to={"/"}>About </Link> </li>
        {user?.role === "admin" &&( 
        <>
        <li><Link to={"/AddDoctor"}>Add Doctor</Link></li>
        <li><Link to={"/department"}>Add Department</Link> </li>
        </>
        )}

        {user?.role === "user" &&(
            <>
            <li><Link to={"/AddApointment"}>Add Appointment</Link></li>
            <li><Link to={"/myAppointment"}>My Appointments</Link></li>
            </>
        )}
        {!user &&(
            <>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/register"}>Register</Link></li>
            </>
        )}
        {user && <li><button onClick={logout}>Log Out</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
