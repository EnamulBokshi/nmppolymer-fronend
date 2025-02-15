import React, { useEffect, useState } from 'react';
import { Boilerplate } from '..';
import { useParams } from 'react-router-dom';
import { useGetProductDetails, useGetProducts } from '../../hooks/useGetProducts';
import { RelatedProducts } from '../../components';
import { motion, AnimatePresence } from 'framer-motion';

function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductDetails(id);
  const { data: products } = useGetProducts();
  const [displayImage, setDisplayImage] = useState("");

  useEffect(() => {
    if (product?.image) setDisplayImage(product.image);
    else if (product?.image2) setDisplayImage(product.image2);
    else if (product?.image3) setDisplayImage(product.image3);
    else if (product?.image4) setDisplayImage(product.image4);
  }, [product]);

  const related = products?.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ) || [];

  // Animation variants
  const imageVariants = {
    enter: { opacity: 0, scale: 0.9 },
    center: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const thumbnailVariants = {
    hover: { 
      scale: 1.1,
      y: -5,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <Boilerplate height="0px">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isLoading ? (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-center text-lg font-semibold animate-pulse">
                  Loading product details...
                </p>
              </div>
            ) : error || !product ? (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-center text-red-500 font-bold">
                  {error ? error.message : "Product not found"}
                </p>
              </div>
            ) : (
              <>
                {/* Product Images Section */}
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={displayImage}
                      className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-lg overflow-hidden"
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <motion.img
                        src={displayImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                        layoutId="mainImage"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Thumbnail Gallery */}
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    {[product.image, product.image2, product.image3, product.image4]
                      .filter(Boolean)
                      .map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setDisplayImage(img)}
                          className={`relative p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            displayImage === img 
                              ? 'ring-2 ring-red-500'
                              : 'hover:ring-2 hover:ring-red-300'
                          }`}
                          variants={thumbnailVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <motion.img
                            src={img}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                            layoutId={`thumbnail-${index}`}
                          />
                        </motion.button>
                      ))}
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="space-y-6 p-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                      {product.name}
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                      Category: {product?.categoryName || 'Uncategorized'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xl font-bold text-red-600">
                      ${product.price.toLocaleString()}
                    </p>
                    
                    <div className="prose prose-sm sm:prose">
                      <h3 className="text-lg font-medium text-gray-900">Description</h3>
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 
                      transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none 
                      focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md">
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 
                      transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none 
                      focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md">
                      Buy Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Related Products Section */}
          <div className="mt-16 bg-white p-4 rounded-lg shadow-lg">
            {/* <h2 className="text-2xl font-serif font-bold mb-8 ">Related Products</h2> */}
            {related.length > 0 ? (
              <RelatedProducts products={related} />
            ) : (
              <p className="text-gray-500 text-center">No related products found</p>
            )}
          </div>
        </div>
      </section>
    </Boilerplate>
  );
}

export default ProductDetails;