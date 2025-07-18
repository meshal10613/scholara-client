// import { Player } from "@lottiefiles/react-lottie-player";
// import animationData from "../assets/how-it-works.json"; // replace with your Lottie file path
import howIt from '../assets/how-itworks.png'

const steps = [
    {
        id: 1,
        title: "Search Scholarships",
        description: "Find scholarships tailored to your country, degree, and needs.",
    },
    {
        id: 2,
        title: "Apply Easily",
        description: "Fill out your application form directly from our website.",
    },
    {
        id: 3,
        title: "Pay Securely",
        description: "Pay from all over the world with your cards",
    },
    {
        id: 4,
        title: "Track Progress",
        description: "Get real-time updates on your application status.",
    },
];

const HowItWorks = () => {
    return (
        <section className="px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-center text-gray-500 mb-8">
                A simple 4-step process to get you closer to your dream scholarship
            </p>

            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
                {/* Text Steps */}
                <div className="flex-1 grid gap-6">
                {steps.map((step) => (
                    <div
                    key={step.id}
                    className="card bg-white shadow-md px-6 py-4 hover:shadow-xl transition duration-300"
                    >
                    <h3 className="font-semibold text-xl text-primary mb-1">
                        {step.id}. {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
                </div>

                {/* Lottie Animation */}
                <div className="flex-1 w-full flex items-center justify-center">
                {/* <Player
                    autoplay
                    loop
                    src={animationData}
                    className="w-full h-auto"
                /> */}
                    <img src={howIt} alt="" className='w-fit h-98' />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
