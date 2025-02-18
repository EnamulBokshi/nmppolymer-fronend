import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { SectionHeader } from "..";
import { useGetProducts } from "../../hooks/useGetProducts";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useGetCategories } from "../../hooks/useGetCategories";
import { motion, AnimatePresence } from "framer-motion";

function Products() {
  const { data: products, isPending, error } = useGetProducts();
  const { data: categories } = useGetCategories();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const productsPerPage = 5;
  useEffect(() => {
    let timer;
    if (isAutoPlay && products?.length > productsPerPage) {
      timer = setInterval(() => {
        setCurrentPage(prevPage => {
          if (!products) return prevPage;
          const totalPages = Math.ceil(products.length / productsPerPage);
          return prevPage >= totalPages ? 1 : prevPage + 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [products, productsPerPage, isAutoPlay]);



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProducts = products?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prev => prev < totalPages ? prev + 1 : 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => prev > 1 ? prev - 1 : totalPages);
  };

  // Framer Motion Variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 }, 
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
  };

  return (
    <section className="md:p-10">
      <SectionHeader />
      <div 
        className="container mx-auto px-4 py-8 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {isPending && <h1 className="text-center text-gray-500">Loading products...</h1>}
        {error && <h1 className="text-center ">No product</h1>}

        <AnimatePresence mode="wait">
          {currentProducts?.map((product) => (
            <motion.div
              key={product.id}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductCart product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-10">
        <div className="space-x-4 flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevPage}
            className="rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700"
          >
            <FaArrowLeft />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleNextPage}
            className="rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700"
          >
            <FaArrowRight />
          </motion.button>
          <Link to="/products" className="text-red-700 ms-5 uppercase font-serif font-bold">
            See ALL
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-serif">
            <span className="text-red-600">{currentPage}</span> /
            <span className="text-gray-500">{totalPages || 0}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

export default Products;
