import React from 'react'
import "../Hero/Hero.css"

export const Hero = ({ title, imageUrl, imageUrlVector }) => {
    return (
        <>
            <section className="hero-container w-full h-auto mb-10">
                <div className="container w-full min-h-[500px] flex justify-between items-center border-blue-500">
                    <div className="banner w-1/2 px-10">
                        <h1 className='title text-2xl font-bold'>{title}</h1>
                        <p className='mt-8'>
                            HealthCare Center is a state-of-the-art facility dedicated
                            to providing comprehensive healthcare services with compassion and
                            expertise. Our team of skilled professionals is committed to
                            delivering personalized care tailored to each patient's needs. At
                            Healthcare, we prioritize your well-being, ensuring a harmonious
                            journey towards optimal health and wellness.
                        </p>
                    </div>
                    <div className="banner relative w-1/2 px-10 flex justify-center items-center mt-10">
                        <img src={imageUrl} alt="hero" className="animated-image w-[350px] h-[350px] z-10" />
                        <span className='victor absolute right-[-84px] top-[-200px]'>
                            <img src={imageUrlVector} alt="vector" className='w-[500px] h-[500px]' />
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

