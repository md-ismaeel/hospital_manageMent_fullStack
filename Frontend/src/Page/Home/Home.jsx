import React from 'react'
import { Hero } from '../../Components/Hero/Hero'
import { Biography } from '../../Components/Biography/Biography'
import { Departments } from '../../Components/Departments/Departments'
import { Message } from '../../Components/Message/Message'

export const Home = () => {
    return (
        <>
            <Hero />
            <Biography />
            <Departments />
            <Message />
        </>
    )
}
