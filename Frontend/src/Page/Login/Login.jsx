import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputForm } from '../../Components/InputForm';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.userSlice);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault();

        try {

        } catch (err) {

        }
    }

    return (
        <>
            <section className='w-full flex justify-center items-center'>
                <form onSubmit={handleForm} className='w-[500px] h-[400px] flex flex-col justify-center items-center gap-4 shadow-2xl mt-20'>
                    <InputForm type={'email'} value={email} placeHolder={"Enter Your Email"} onChange={(e) => setEmail(e.target.value)} />
                    <InputForm type={'password'} value={password} placeHolder={"Enter Your password"} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit' className='w-[400px] h-[50px] bg-blue-500 rounded-md'>Login</button>
                    <p>New User VIsing First Time
                        <span onClick={() => navigate("/register")} className='ml-2 cursor-pointer hover:text-blue-400 hover:underline'>Register</span>
                    </p>
                </form>
            </section>
        </>
    )
}
