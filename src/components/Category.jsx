import React, { useState } from 'react';

const CategoryAccordion = ({ categories }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {categories.map((category, index) => (
                <div key={index} className="accordion-item">
                    <div className="accordion-header" onClick={() => handleToggle(index)}>
                        {category.name}
                    </div>
                    {activeIndex === index && (
                        <div className="accordion-content">
                            {category.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryAccordion;