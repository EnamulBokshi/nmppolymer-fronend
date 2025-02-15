import React from 'react';
import { motion } from 'framer-motion';

const products = [
    { id: 1, name: 'Product 1', description: 'Description for product 1', price: '$10' },
    { id: 2, name: 'Product 2', description: 'Description for product 2', price: '$20' },
    { id: 3, name: 'Product 3', description: 'Description for product 3', price: '$30' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function Catalogue() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto p-6 bg-gray-100 rounded-xl"
        >
            <motion.h1 
                variants={itemVariants}
                className="text-3xl font-bold mb-8 text-sky-700 uppercase text-center"
            >
                Product Catalogue
            </motion.h1>
            
            <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={itemVariants}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        className="bg-white border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-gray-800">
                            {product.name}
                        </h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-green-600 font-bold text-lg">
                            {product.price}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
