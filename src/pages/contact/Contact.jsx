import React, { useState } from 'react';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        category: 'suggestion',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            alert('Form submitted successfully!');
        }, 2000);
    };

    return (
        <section className='container mx-auto py-20'>
            <div className='flex gap-5 justify-center items-start'>
                <div className=''>
                    <h1 className='text-3xl font-bold '>Contact Us</h1>
                    <p className='text-gray-400'>We are here to help you</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-5'>
                        <div className='flex gap-5'>
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder='First Name'
                                className='border p-2 w-1/2'
                                required
                            />
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder='Last Name'
                                className='border p-2 w-1/2'
                                required
                            />
                        </div>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className='border p-2'
                            required
                        />
                        <select
                            name='category'
                            value={formData.category}
                            onChange={handleChange}
                            className='border p-2'
                        >
                            <option value='suggestion'>Suggestion</option>
                            <option value='complaint'>Complaint</option>
                            <option value='enquiry'>Enquiry</option>
                        </select>
                        <textarea
                            name='message'
                            value={formData.message}
                            onChange={handleChange}
                            placeholder='Message'
                            className='border p-2'
                            required
                        ></textarea>
                        <button
                            type='submit'
                            className='bg-red-900 text-white py-2 rounded'
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>       
                    </form>

                </div>
                <div className=''>
                    <img src='https://images.unsplash.com/photo-1626622198836-2c9e7b1f3f1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60' alt='contact' className='rounded-lg' />        
                </div>

            </div>
        </section>
    );
};

export default Contact;