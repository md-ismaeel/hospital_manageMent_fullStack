import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/logo/logo.svg"

export const Navbar = () => {

    const { isAuthenticated } = useSelector((state) => state.userSlice)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {

            const response = await axios.post()
            toast.success("louted")
        } catch (err) {
            // toast.err(err.message)
        }
    }

    if (isAuthenticated) {
        navigate("/")
    }


    return (
        <>
            <div className='w-full h-[60px] fixed flex justify-between items-center px-20 bg-slate-50'>
                <img src={logo} alt='logo' className='w-[60px] h-[60px] rounded-full' />
                <ul className='flex justify-center items-center gap-3'>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/appointment"}>Appointment</NavLink>
                    <NavLink to={"/about"}>About Us</NavLink>
                </ul>
                {
                    !isAuthenticated ?
                        <button className='bg-blue-500 px-6 py-1 rounded-md' onClick={() => navigate("/login")}>Login</button> :
                        <button className='bg-blue-500 px-6 py-1 rounded-md' onClick={handleLogout}>Logout</button>
                }
            </div>
        </>
    )

}
