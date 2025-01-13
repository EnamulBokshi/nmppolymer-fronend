import React, { useState } from 'react';
import {Boilerplate } from '../../components';
import { CiHome, CiPhone } from 'react-icons/ci';
import { FiMail } from 'react-icons/fi';
const ContactUs = () => {
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
        <Boilerplate bgImage={'bg-contact-texture'}>
          <section className='container mx-auto py-20 bg-slate-50 rounded'>
            <div className='flex gap-5 p-5 flex-col md:flex-row md:justify-evenly gap-y-5 md:items-start'>
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
                    <div>
                        <h1 className='text-3xl font-bold '>Contact Information</h1>
                        <p className='text-gray-400'>Feel free to call, mail or visit us any time</p>
            
                        <p className='text-gray-400'>24/7, We are here to help you</p>
                        <div className='mt-5'>
                            <p className='text-lg font-bold'> <CiHome size={30}/> Address</p>
                            <p>Kamrangirchar, Lalbag, Dhaka-1211, Bangladesh</p>

                            <p className='text-lg font-bold mt-5'> <CiPhone size={30}/> Phone</p>
                            <p>+880 171 201 3132</p>

                            <p className='text-lg font-bold mt-5'> <FiMail size={25} /> Email</p>
                            <p>example@ex.com</p>

                        </div>
                    </div>
                </div>
            </div>
          </section>
        </Boilerplate>
    );
};

export default ContactUs;