import React from 'react';

const products = [
    { id: 1, name: 'Product 1', description: 'Description for product 1', price: '$10' },
    { id: 2, name: 'Product 2', description: 'Description for product 2', price: '$20' },
    { id: 3, name: 'Product 3', description: 'Description for product 3', price: '$30' },
];

export default function Catalogue () {
    return (
        <div className="container mx-auto p-6 bg-gray-300">
            <h1 className="text-3xl font-bold mb-4 text-sky-700 uppercase">Product Catalogue</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="text-green-500 font-bold">{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
