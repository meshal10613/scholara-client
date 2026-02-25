import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import default styles
import { Link } from 'react-router';

const Banner = () => {
    const slides = [
        {
        id: 1,
        link: "/all-scholarship",
        image: "https://i.ibb.co/MDBBG9N6/2148950574.jpg",
        heading: "Unlock Your Future",
        subtext: "Apply now for scholarships and pursue your dreams.",
        buttonText: "Explore Scholarships",
        },
        {
        id: 2,
        link: "/all-scholarship",
        image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4",
        heading: "Empowering Education",
        subtext: "Scholarships for every level — from school to university.",
        buttonText: "Learn More",
        },
        {
        id: 3,
        link: "/dashboard/my-profile",
        image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
        heading: "Your Journey Starts Here",
        subtext: "Join a community of scholars and achievers.",
        buttonText: "Join Now",
        },
    ];

    return (
    <div className="w-full mx-auto my-10 overflow-hidden shadow-lg">
        <Carousel
            infiniteLoop={true}
            autoPlay={true}
            showThumbs={false}
            showStatus={false}
            interval={2000}
            showArrows={false}
            dynamicHeight={false}
            transitionTime={500}
        >
            {slides.map((slide) => (
            <div key={slide.id} className="relative">
                <img src={slide.image} alt={slide.heading} className="object-cover h-[40vh] md:h-[50vh] lg:h-[65vh] xl:h-[75vh] w-full" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-10 text-white">
                <h2 className="text-3xl md:text-5xl font-bold">{slide.heading}</h2>
                <p className="mt-4 text-lg md:text-xl">{slide.subtext}</p>
                <Link to={`${slide.link}`} className="btn btn-secondary text-base-100 mt-6">{slide.buttonText}</Link>
                </div>
            </div>
            ))}
        </Carousel>
    </div>
    );
};

export default Banner;
