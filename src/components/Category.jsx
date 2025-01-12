import React, { useState } from 'react';

const CategoryAccordion = ({ categories }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='sm:w-96 p-5 bg-black/60 text-white rounded  duration-300 ease-in transition-all  drop-shadow-lg'>
            {
                categories?.map((item,index) => (
                   <div className={`${activeIndex === index ? '  bg-white/30 rounded': null} `}>
                    <div className={`px-2 flex font-bold items-center hover:font-semibold ${activeIndex === index ? 'bg-violet-700':null} hover:text-gray-800 rounded ease-in-out transition-transform duration-300  cursor-pointer `} onClick={()=>handleToggle(index)}>
                        <span className='text-2xl '>{
                                activeIndex === index ? '-': '+'
                            }</span>
                        <li className='px-3 py-1 list-none'>items</li>
                    </div>
                    {
                        activeIndex === index && (
                            <div className='p-2 '>
                        content
                    </div>
                        )
                    }
                   </div>
                ))
            }

            
        </div>
    );
};

export default CategoryAccordion;