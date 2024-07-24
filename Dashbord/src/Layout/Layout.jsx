import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    const { isAuthenticated } = useSelector((state) => state.UserSlice);
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {isAuthenticated && <Outlet />}
        </>
    )
}

