import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Components/Footer/Footer'

export const Layout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

