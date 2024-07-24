import React from "react";
import { Hero } from "../../Components/Hero/Hero";
import { Biography } from "../../Components/Biography/Biography";
import { Departments } from "../../Components/Departments/Departments";
import { Message } from "../../Components/Message/Message";
import imageOfHero from "../../assets/hero.png";
import imageOfVector from "../../assets/Vector.png";
import imageOfBiography from "../../assets/about.png"

export const Home = () => {
    return (
        <>
            <Hero
                title={"Welcome to Healthcare Medical | Your Trusted Healthcare Provider"}
                imageUrl={imageOfHero}
                imageUrlVector={imageOfVector}
            />
            <Biography imageUrl={imageOfBiography} />
            <Departments />
            <Message />
        </>
    );
};
