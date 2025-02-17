import React, { useEffect, useState } from 'react';
import { Boilerplate } from '..';
import { useParams,Link } from 'react-router-dom';
import { useGetProductDetails, useGetProducts } from '../../hooks/useGetProducts';
import { RelatedProducts } from '../../components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductDetails(id);
  const { data: products } = useGetProducts();

  // Display Image State
  const [displayImage, setDisplayImage] = useState("");

  // Update displayImage when product loads
  useEffect(() => {
    if (product?.image) {
      setDisplayImage(product.image);
    }
    else if(product?.image2){
      setDisplayImage(product.image2);
    }
    else if(product?.image3){
      setDisplayImage(product.image3);
    }
    else if(product?.image4){
      setDisplayImage(product.image4);
    }
  }, [product]);

  // Filter related products
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
        <div className="flex flex-col md:flex-row justify-start gap-5 items-start w-full">
          <div className={`p-4 shadow space-y-3 rounded-lg w-full ${isLoading? 'items-center justify-center':''} `}>
            {isLoading ? (
              <p className="text-center text-lg font-semibold flex items-center justify-center"><FaSpinner className='animate-spin'/></p>
            ) : error || !product ? (
              <p className="text-center text-red-500 font-bold">
                {error ? error.message : "Product not found"}
              </p>
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

                {/* Product Info */}
                <h1 className="text-3xl font-serif">{product.name}</h1>
                <p className="text-lg text-neutral-500">{"Summary"}</p>
                <p className="text-lg">{product.description}</p>
                <p className="text-lg">
                  <span className="font-bold">Price: $</span>{product.price}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Category: </span>
                  <Link to={`/products/?category_id=${product?.category}`} className="text-red-500 hover:underline">
                  {product?.category_name}
                  </Link>
                </p>
                <div className="flex gap-5">
                  <button className="bg-red-500 text-neutral-50 px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Add to Cart
                  </button>
                  <button className="bg-red-500 text-neutral-50 px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </Boilerplate>
  );
}

export default ProductDetails;