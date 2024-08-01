import React from "react";
import { Hero } from "../../Components/Hero/Hero";
import { Biography } from "../../Components/Biography/Biography";
import { Departments } from "../../Components/Departments/Departments";
import { Message } from "../../Components/Message/Message";
import { useSelector, useDispatch } from "react-redux"
import imageOfHero from "../../assets/hero.png";
import imageOfVector from "../../assets/Vector.png";
import imageOfBiography from "../../assets/about.png"
import { setUser } from "../../Redux/Slice/userSlice";
import { useEffect } from "react";
import { API_USER_BACKEND, requestOptions } from "../../Utils/utils";
import axios from "axios";

export const Home = () => {
    const { user, isAuthenticated } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch()

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${API_USER_BACKEND}/profile`, requestOptions);
            // console.log("profile", response);
            if (response.data.success) {
                dispatch(setUser(response.data.userData))
            }
        } catch (err) {
            console.error(err.response?.data?.message || "Error profile not found!!");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile();
        } else {
            dispatch(setUser({}))
        }

        // return () => dispatch(setUser({}));
    }, [isAuthenticated, dispatch]);


    return (
        <>
            <Hero
                title={"Welcome to HealthCare Center | Your Trusted Healthcare Provider"}
                imageUrl={imageOfHero}
                imageUrlVector={imageOfVector}
            />
            <Biography imageUrl={imageOfBiography} />
            <Departments />
            <Message />
        </>
    );
};
