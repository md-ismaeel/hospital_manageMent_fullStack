import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logo from "../../assets/Medical-log.png"
import { API_USER_BACKEND } from "../../Utils/utils"

export const Navbar = () => {

    const { isAuthenticated } = useSelector((state) => state.userSlice)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {

            const response = await axios.post(`${API_USER_BACKEND}/logout`)
            const data = response;
            if (data) {
                toast.success(data.message)
            }
        } catch (err) {
            toast.err(err.message)
        }
    }

    if (isAuthenticated) {
        navigate("/")
    }


    return (
        <>
            <div className='w-full h-[60px] fixed flex justify-between items-center px-20 bg-slate-50 z-50 font-medium border-b'>

                <span onClick={() => navigate("/")} className='cursor-pointer'>
                    <img src={logo} alt='logo' className='w-[50px] h-[50px] rounded-full' />
                </span>

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
