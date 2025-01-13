import React, { useState } from 'react';

const CategoryAccordion = ({ categories, setActiveSection}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleToggle = (index) => {
        setActiveIndex(index);
        setActiveSection(categories[index])
    };

    return (
        <div className='p-5 bg-black/60 text-white rounded  duration-300 ease-in transition-all  drop-shadow-lg'>
            {
                categories?.map((item,index) => (
                   <div key={index} className={`${activeIndex === index ? '  bg-violet-800 rounded': null} `}>
                    <div  className={`px-2 flex font-bold items-center hover:font-semibold   cursor-pointer `} onClick={()=>handleToggle(index)}>
                        <span className='text-2xl '>{
                                activeIndex === index ? '-': '+'
                            }</span>
                        <li className='px-3 py-1 list-none'>{item}</li>
                    </div>
                    {
                    //     activeIndex === index && (
                    // //         <div className='text-sm text-center'>
                    // //     ....
                    // // </div>
                    //     )
                    }
                   </div>
                ))
            }

            
        </div>
    );
};

export default CategoryAccordion;