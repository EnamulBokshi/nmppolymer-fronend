import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function RelatedProducts({ products,title='' }) {
  // Take only first 8 products
  const limitedProducts = products.slice(0, 8);

  return (
    <div className="md:p-4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="md:text-2xl font-sarif font-bold mb-4">{title || 'Related Product'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {limitedProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <Link to={`/product-details/${product.id}`}>
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.image || product.image2 || product.image3 || product.image4}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">
                  {product.name.length > 20 
                    ? `${product.name.substring(0, 20)}...` 
                    : product.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {product.description.length > 20 
                    ? `${product.description.substring(0, 20)}...` 
                    : product.description}
                </p>
                <p className="text-red-600 font-bold mt-2">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;