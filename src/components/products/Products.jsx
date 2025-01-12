import React from "react";
import ProductCart from "./ProductCart";
import { Pagination, SectionHeader } from "..";
function Products() {
  const products = {
    name: "Electric Pipe",
    description: "product description",
    price: 200,
    image:
      "https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: ["Pipe", "Electric"],
  };
  return (
    <section className="p-10">
      {/* <div className="flex justify-between items-center  py-8">
        <div>
        
        </div>
      </div> */}
      <SectionHeader />
      <div className="container  mx-auto px-4 py-8 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <ProductCart product={products} />
        <ProductCart product={products} />
        <ProductCart product={products} />
        <ProductCart product={products} />
        <ProductCart product={products} />
        <ProductCart product={products} />
        <ProductCart product={products} />
      </div>
      <div className="">
        <Pagination />
      </div>
    </section>
  );
}

export default Products;
