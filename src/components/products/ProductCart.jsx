import React from "react";
import {BtnPrimary} from "..";
import { Link } from "react-router";
function ProductCart({product}) {
  const navigateToProductDetails = () => {
    console.log('Navigate to product details');
  }
  // console.log(product)
  return (
    <div className="p-4 rounded bg-gray-50 flex flex-col  relative flex-wrap hover:scale-105 group transition-transform duration-300 ease-in-out">
      <div className="flex items-center justify-center">
        <img src={product?.image || product?.image2 || product?.image3} alt="" className=" rounded-lg shadow-sm max-h-36 " />
      </div>
      <div className="pt-3">
        <h1 className="text-gray-700 text-sm">{product?.category}</h1>
        <p className="font-bold font-serif">
            {product?.name}
        </p>
        {/* <BtnPrimary className="hidden group-hover:block">Details</BtnPrimary> */}
        <div className="absolute  rounded-lg w-full h-full cursor-pointer inset-0 bg-gray-700 bg-opacity-50 hidden  group-hover:flex justify-center items-center">
            <Link to={`/product-details/${product?.id}`} className="px-4 py-2 text-white rounded bg-blue-700">Details</Link>
            {/* <BtnPrimary  className="" onClick={()=> navigateToProductDetails(index)}>Details</BtnPrimary> */}
        </div>
        
      </div>
    </div>
  );
}

export default ProductCart;
