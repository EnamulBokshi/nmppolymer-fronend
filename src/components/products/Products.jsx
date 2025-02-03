import React from "react";
import ProductCart from "./ProductCart";
import { Pagination, SectionHeader } from "..";
import { useGetProducts } from "../../hooks/useGetProducts";
function Products() {
  const {data:products,isPending,error } = useGetProducts()
  // const products = {
  //   name: "Electric Pipe",
  //   description: "product description",
  //   price: 200,
  //   image:
  //     "https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   category: ["Pipe", "Electric"],
  // };

  if(!products) return <div>No products</div>
  if(error) return <div>{error}</div>
  if (isPending) {
    return <h1 className="text-center">
      Loading...
    </h1>;
  }

  console.log(products[0].category)
  return (
    <section className="p-10">
      <SectionHeader />
      <div className="container  mx-auto px-4 py-8 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <ProductCart product={products} />
        {
          isPending && (<h1>Loading</h1>)
        }
        {
          products? products.map((product) => (
            <ProductCart key={product.id} product={product} />
          // <h1>{product.name}</h1>
          // console.log(product)
          )):<div>No products</div>
        }
      </div>
      <div className="">
        <Pagination />
      </div>
    </section>
  );
}

export default Products;
