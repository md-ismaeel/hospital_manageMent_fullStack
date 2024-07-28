import React from 'react'
import axios from "axios"
import { setAdmin } from '../Redux/Slice/userSlice'
import { useSelector, useDispatch } from "react-redux"
import { API_USER_BACKEND, requestOptions } from '../Utils/utils'

export const Profile = async () => {
    const { isAuthenticated } = useSelector((state) => state.UserSlice);
    const dispatch = useDispatch()

    try {
        const response = await axios.post(`${API_USER_BACKEND}/profile`, requestOptions);
        console.log(response.data);
        // dispatch(setAdmin(response.data.user))
    } catch (err) {
        toast.error(err.response?.data?.message || "Error profile not found!!");
    }
}

