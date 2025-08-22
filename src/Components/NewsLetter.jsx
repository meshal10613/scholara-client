import React from 'react'
import news from '../assets/news.json'
import Lottie from 'lottie-react'
import Swal from 'sweetalert2';

export default function NewsLetter() {
    const handleSubcribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if(email){
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: `Your email ${email} has subscribed successfully`,
            });
        }
    };

    return (
        <div className='bg-white rounded-3xl flex flex-col md:flex-row items-center justify-around px-5 py-10 mx-2 md:mx-0'>
            <div>
                <Lottie animationData={news} loop={true} className='w-98'/>
            </div>
            <div className='space-y-3'>
                <h2 className='text-4xl font-bold'>Subscribe to our Newsletter</h2>
                <p className=''>Want to get special offers before they run out? Subscribe to our email <br /> to get exclusive discounts and offers.</p>
                <form onSubmit={handleSubcribe} className='join w-full'>
                    <input type="email" name="email" id="" placeholder='Your Email Address' className='input join-item' required />
                    <button type='submit' className='btn border-none bg-secondary text-base-100 join-item'>Subscribe</button>
                </form>
            </div>
        </div>
    )
}
