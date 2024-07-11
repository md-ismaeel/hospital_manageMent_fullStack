import React, { useState } from 'react'

export const Navbar = () => {

    const [isLogin, setIsLogin] = useState(false);

    return (
        <>
            <div className='w-full h-[60px] fixed flex justify-between items-center px-20 bg-slate-400'>
                <img src='' alt='logo' />
                <ul className='flex justify-center items-center gap-3'>
                    <li>home</li>
                    <li>Appointment</li>
                    <li>Patient</li>
                </ul>
                <button className='bg-blue-500 px-6 py-1 rounded-md'>{isLogin ? "Login" : "Register"}</button>
            </div>
        </>
    )

}
