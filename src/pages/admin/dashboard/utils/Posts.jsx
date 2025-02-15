import React, { useState, useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AddPost, useCategory } from "..";
import { useGetProducts } from "../../../../hooks/useGetProducts";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../../api";
import { ACCESS_TOKEN } from "../../../../constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import { SearchBox } from "../../../../components";
import { useNavigate } from "react-router";
import UpdatePost from "./posts/UpdatePost";
import { useDeleteProduct } from "../../../../hooks/useDeleteProduct";

const Posts = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { data: products } = useGetProducts();
  const [productList, setProductList] = useState(products || []);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {data:categories,error:categoryErrors,isFetching} = useCategory();
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  // Sync local state with products from API
  useEffect(() => {
    if (products) setProductList(products);
  }, [products]);

  const handleRemoveProduct = (id) => {
    setSelectedProduct(id);
    setShowConfirmModal(true);
  };
  // const {mutate,isLoading} = useDeleteProduct();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      try {
        await api.delete(`/api/products/delete/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });
        return id;
      } catch (error) {
        throw error.response?.data?.message || "Something went wrong.";
      }
    },
    onError: (error) => {
      setError(error || "Something went wrong.");
      setLoading(false);
    },
    onSuccess: (deletedProductId) => {
      setLoading(false);
      setShowConfirmModal(false);

      // ✅ Remove deleted product from state immediately
      setProductList((prev) => prev.filter((p) => p.id !== deletedProductId));

      // ✅ Trigger React Query to refetch products (for consistency)
      queryClient.invalidateQueries(["products"]);
    },
  });

  const confirmDelete = () => {
    setLoading(true);
    mutate(selectedProduct);
  };
  if(error){
    setTimeout(() => {
      setError('');
    }, 2000);
  }
  const handleSearch = (e)=>{
    const search = e.target.value;
    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    setProductList(filteredProducts);
  }
  const handleCategorySelect = (id,name) => {
    if(!id){
      setProductList(products);
      return;
    }
    const filteredProducts = products.filter(product => {
      return product.category === name || product.category == id;
    });
    console.log("Filtered Products",filteredProducts);
    setProductList(filteredProducts);
  }
  const editPost = (product) => {
    setShowUpdateProduct(true);
    navigate(`/admin/update-product/${product.id}`);
  }
  
  return (
    <div className="p-5 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Products Control</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-900"
          onClick={() => setShowAddPost(!showAddPost)}
        >
          <IoIosAddCircleOutline className="inline me-2" />
          Add New Products
        </button>
      </div>
      <div className="flex flex-col gap-5">
        <div className="bg-gray-200 p-5 rounded-lg">
          <h1>Products</h1>
          <div className="py-3">
         <SearchBox onChange={handleSearch} callback={handleCategorySelect} data={categories}/>
          </div>
          <ul>
            {
              isFetching && <p>Loading...</p>

            }
            {
              !productList.length && <p>No Products Found</p>
            }
            {productList?.map((product, index) => (
              <motion.li
                key={product.id}
                className="mb-2 backdrop-blur-md py-3 cursor-pointer hover:bg-gray-700 bg-gray-600 rounded px-3 text-white flex justify-between items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              
              >
                <div className="flex items-center gap-2" 
                  onClick={(()=>navigate(`/product-details/${product.id}`))}
                >
                  <img
                    src={product.image || product.image2 || product.image3 || product.image4}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg hover:scale-125 duration-200 ease-in"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="flex-1">{product.name}</span>
                    <span className="text-2xl text-gray-300 -mt-3">.</span>
                    <span>{product.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="bg-red-500 hover:scale-105 hover:bg-red-700 hover:text-gray-300 text-white p-2 rounded"
                  >
                    <IoTrashBin />
                  </button>
                  <button
                    onClick={() =>editPost(product)}  
                    className="bg-yellow-500 hover:scale-105 hover:bg-yellow-700 hover:text-gray-300 text-white p-2 rounded"
                  >
                    <FaEdit />
                  </button>
                </div>
                {/* {showUpdateProduct && <UpdatePost close={() => setShowUpdateProduct(false)} product={product}/>} */}
              </motion.li>
            ))}
          </ul>
        </div>
        {showAddPost && <AddPost close={() => setShowAddPost(false)} />}
        
      </div>

      {/* 🔥 Animated Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this product?</p>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Posts;
