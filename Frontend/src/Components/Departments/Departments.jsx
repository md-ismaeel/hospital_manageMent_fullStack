import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import cardio from "../../assets/Departments/cardio.jpg"
import derma from "../../assets/Departments/derma.jpg"
import ent from "../../assets/Departments/ent.jpg"
import neuro from "../../assets/Departments/neuro.jpg"
import onco from "../../assets/Departments/onco.jpg"
import ortho from "../../assets/Departments/ortho.jpg"
import pedia from "../../assets/Departments/pedia.jpg"
import radio from "../../assets/Departments/radio.jpg"
import therapy from "../../assets/Departments/therapy.jpg"


const arrayOfImageUrl = [
    {
        name: "Pediatrics",
        imageUrl: pedia,
    },
    {
        name: "Orthopedics",
        imageUrl: ortho,
    },
    {
        name: "Cardiology",
        imageUrl: cardio,
    },
    {
        name: "Neurology",
        imageUrl: neuro,
    },
    {
        name: "Oncology",
        imageUrl: onco,
    },
    {
        name: "Radiology",
        imageUrl: radio,
    },
    {
        name: "Physical Therapy",
        imageUrl: therapy,
    },
    {
        name: "Dermatology",
        imageUrl: derma,
    },
    {
        name: "ENT",
        imageUrl: ent,
    },
];

export const Departments = () => {

    const responsive = {
        extraLarge: {
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        large: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
        },
        medium: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <>
            <section className='w-full h-auto flex flex-col justify-center items-start mt-20 mb-10'>
                <h2 className='text-xl font-bold text-slate-400 px-6'>Departments</h2>
                <div className='w-full mt-2 ml-5'>
                    <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>
                        {arrayOfImageUrl.map((item, index) => {
                            return (
                                <div key={index} className="card relative w-[380px]">
                                    <div className="depart-name absolute bg-white top-1/2 right-1/3 px-4 py-1 rounded-full font-medium">{item.name}</div>
                                    <img src={item.imageUrl} alt="Department" className='w-full h-[230px] rounded-md' />
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </section>
        </>
    )
}
