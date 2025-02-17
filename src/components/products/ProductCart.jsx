import React from "react";
import { Link } from "react-router-dom";
import { titleMaxLength } from "../../constant";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

function ProductCart({ product }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full w-full"
        >
          <img 
            src={product?.image || product?.image2 || product?.image3} 
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-2">
        {/* Category Badge */}
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
          {product?.category_name}
        </span>

        {/* Product Name */}
        <h2 className="font-serif font-bold text-gray-800 line-clamp-1">
          {product?.name.length > titleMaxLength 
            ? `${product?.name.slice(0, titleMaxLength)}...` 
            : product?.name}
        </h2>

        {/* Price */}
        <p className="text-red-600 font-bold">
          ${product?.price?.toLocaleString()}
        </p>

        {/* Action Button */}
        <Link 
          to={`/product-details/${product?.id}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          View Details
          <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ProductCart;
