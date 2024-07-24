import React from 'react';
import { useSelector } from "react-redux"
import { Sidebar } from '../Sidebar/Sidebar';

export const Home = () => {
    const { admin } = useSelector((state) => state.UserSlice);
    console.log(admin);
    return (
        <section className="w-full min-h-screen bg-blue-500">
            <Sidebar />
        </section>
    )
}
