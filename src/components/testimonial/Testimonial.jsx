import React from 'react';

const testimonials = [
    {
        name: 'Masudur Rahman',
        role: 'CEO, NMP Ploymer LLC.',
        avatar: '',
        testimonial: 'This is an amazing product! It has greatly improved our workflow and efficiency.'
    },
    {
        name: 'Jane Smith',
        role: 'CTO, NMP Plolymer LLC.',
        avatar: '',
        testimonial: 'I highly recommend this to anyone looking to streamline their processes.'
    }
];

const Testimonial = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Testimonials</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex items-center">
                                <img className="w-16 h-16 rounded-full mr-4" src={item.avatar || 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_640.png'} alt={item.name} />
                                <div>
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <p className="text-gray-600">{item.role}</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">{item.testimonial}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center pt-5 px-5'>
                    <button className='hover:scale-105 duration-200  rounded-full p-2 bg-red-700 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            
                        </svg>
                    </button>
                    <button className='hover:scale-105 duration-200  rounded-full p-2 bg-red-700 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            
                        </svg>  
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;