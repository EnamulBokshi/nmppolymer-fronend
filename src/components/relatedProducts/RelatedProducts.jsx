import React from 'react';

const RelatedProducts = ({ products,title='' }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{title || 'Related Product'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;