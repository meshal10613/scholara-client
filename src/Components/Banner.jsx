
import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import default styles

const Banner = () => {
    const slides = [
        {
        id: 1,
        image: "https://source.unsplash.com/1600x600/?university,students",
        heading: "Unlock Your Future",
        subtext: "Apply now for scholarships and pursue your dreams.",
        buttonText: "Explore Scholarships",
        },
        {
        id: 2,
        image: "https://source.unsplash.com/1600x600/?university,students",
        heading: "Empowering Education",
        subtext: "Scholarships for every level — from school to university.",
        buttonText: "Learn More",
        },
        {
        id: 3,
        image: "https://source.unsplash.com/1600x600/?books,learning",
        heading: "Your Journey Starts Here",
        subtext: "Join a community of scholars and achievers.",
        buttonText: "Join Now",
        },
    ];
    return (
    <div className="w-full mx-auto my-10 overflow-hidden shadow-lg">
        <Carousel
            autoPlay={true}
            infiniteLoop={0}
            showThumbs={false}
            showStatus={false}
            interval={3000}
            showArrows={true}
            dynamicHeight={false}
        >
            {slides.map((slide) => (
            <div key={slide.id} className="relative">
                <img src={slide.image} alt={slide.heading} className="object-cover h-[60vh] w-full" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-10 text-white">
                <h2 className="text-3xl md:text-5xl font-bold">{slide.heading}</h2>
                <p className="mt-4 text-lg md:text-xl">{slide.subtext}</p>
                <button className="btn btn-secondary text-base-100 mt-6">{slide.buttonText}</button>
                </div>
            </div>
            ))}
        </Carousel>
    </div>
    );
};

export default Banner;
