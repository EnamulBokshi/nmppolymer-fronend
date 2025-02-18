import React from 'react';
import { useGetCategories } from '../../hooks/useGetCategories';
import { useNavigate } from 'react-router';
import { FaSpinner } from 'react-icons/fa';

const Category = () => {
    const navigation = useNavigate();
    const handleNavigation = (category) => {
        console.log('Category:')
        navigation(`/products/?category_id=${category}`);
    }
    const {data,isPending,error } = useGetCategories();
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid bg-gray-100 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isPending && <h1 className="flex justify-center items-start text-gray-500">
                <FaSpinner className="animate-spin text-red-500" />
                </h1>}
            {error && <h1 className="text-center text-red-500">Error: {error.message}</h1>}

                {data?.map((category) => (
                    <div key={category.id} className="p-5 border cursor-pointer hover:bg-red-800 bg-red-700  text-white text-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-xl font-semibold" onClick={()=> handleNavigation(category.id)}>{category.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;

