import React from 'react'
import { useSelector } from 'react-redux'

export const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.userSlice)
    return (
        <>
            <div className='w-full h-screen'>

            </div>
        </>
    )
}
