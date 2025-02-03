import React, { useEffect, useState } from 'react';
import { Boilerplate } from '..';
import { useParams } from 'react-router-dom';
import { useGetProductDetails, useGetProducts } from '../../hooks/useGetProducts';
import { RelatedProducts } from '../../components';

function ProductDetails() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductDetails(id);
  const { data: products } = useGetProducts();

  // Handle display image
  const [displayImage, setDisplayImage] = useState(null);

  useEffect(() => {
    if (product) {
      setDisplayImage(product.image);
    }
  }, [product]);

  const related = products?.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ) || [];

  return (
    <Boilerplate height="0px">
      <section className="container mx-auto px-10 flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-start gap-5 items-start w-full">
          
   
          <div className="p-4 shadow space-y-3 rounded-lg w-full">
            {isLoading ? (
              <p className="text-center text-lg font-semibold">Loading product details...</p>
            ) : error || !product ? (
              <p className="text-center text-red-500 font-bold">
                {error ? error.message : "Product not found"}
              </p>
            ) : (
              <>
                {/* Product Images Section */}
                <div className="p-4 shadow gap-y-5 bg-neutral-100 rounded-lg flex-col flex justify-center items-center">
                  <div className="p-2 max-h-96 rounded-lg bg-gray-50 shadow">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full max-h-60 object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-4 shadow bg-gray-200 flex justify-center gap-x-5 items-center w-full rounded-lg border ">
                    {[product.image, product.image2, product.image3, product.image4].map((img, index) =>
                      img ? (
                        <img
                          key={index}
                          src={img}
                          alt={product.name}
                          onClick={() => setDisplayImage(img)}
                          className={`w-16 h-16 object-cover rounded-lg cursor-pointer hover:ring hover:scale-105 transition duration-200 ease-in ${
                            displayImage === img ? 'ring -translate-y-2' : ''
                          }`}
                        />
                      ) : null
                    )}
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
                  <span className="font-bold">Category: </span>{product?.category}
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
