import React from "react";
import { Hero } from "../../Components/Hero/Hero";
import about from "../../assets/about.png";
import imageOfVector from "../../assets/Vector.png";
import imageOfBiography from "../../assets/whoweare.png";
import { Biography } from "../../Components/Biography/Biography";

export const AboutUs = () => {
    return (
        <>
            <Hero
                title={"Learn More About Us | Healthcare Medical"}
                imageUrl={about}
                imageUrlVector={imageOfVector}
            />
            <Biography imageUrl={imageOfBiography} />
            <p className="mb-10"></p>
        </>
    );
};
