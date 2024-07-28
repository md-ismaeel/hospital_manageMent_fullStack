import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDoctor } from "../../Redux/Slice/userSlice"
import axios from 'axios'
import { API_USER_BACKEND } from '../../Utils/utils'

export const Doctors = () => {

    const { doctor } = useSelector((state) => state.UserSlice)
    console.log(doctor);
    const dispatch = useDispatch()


    const fetchDoctors = async () => {
        const response = await axios.post(`${API_USER_BACKEND}/`)
    }

    useEffect(() => {
        fetchDoctors();

        return () => dispatch(setDoctor([]))
    }, [])

    return (
        <>
            <section className='w-full h-screen'>

            </section>
        </>
    )
}

