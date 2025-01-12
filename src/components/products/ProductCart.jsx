import React from "react";
import {BtnPrimary} from "..";
function ProductCart({product}) {
  return (
    <div className="p-4 rounded bg-gray-50 flex flex-col  relative flex-wrap hover:scale-105 group transition-transform duration-300 ease-in-out">
      <div className="">
        <img src={product.image} alt="" className=" rounded-lg shadow-sm " />
      </div>
      <div className="pt-3">
        <h1 className="text-gray-700 text-sm">{product.category?.map((category,index)=> <span className="me-2" key={index}>{category}</span>)}</h1>
        <p className="font-bold font-serif">
            {product.name}
        </p>
        {/* <BtnPrimary className="hidden group-hover:block">Details</BtnPrimary> */}
        <div className="absolute  rounded-lg w-full h-full cursor-pointer inset-0 bg-gray-700 bg-opacity-50 hidden  group-hover:flex justify-center items-center">
            {/* <button className="px-4 py-2 text-white rounded bg-blue-700">Details</button> */}
            <BtnPrimary className="">Details</BtnPrimary>
        </div>
        
      </div>
    </div>
  );
}

export default ProductCart;
