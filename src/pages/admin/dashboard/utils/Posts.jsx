import React, { useState, useEffect } from "react";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProducts } from "../../../../hooks/useGetProducts";
import { useDeleteProduct } from "../../../../hooks/useDeleteProduct";
import { SearchBox } from "../../../../components";
import { useGetCategories } from "../../../../hooks/useGetCategories";

const Posts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: products } = useGetProducts();
  const { mutate, isLoading } = useDeleteProduct();
  const { data: categories } = useGetCategories()

  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (products) setProductList(products);
  }, [products]);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProductList(filteredProducts);
    } else {
      setProductList(products);
    }
  }, [searchQuery, products]);

  // Handle delete confirmation
  const handleRemoveProduct = (id) => {
    setSelectedProduct(id);
    setShowConfirmModal(true);
  };

  const handleCategorySelect = (id,name) => {
    if(!id){
      setProductList(products);
      return;
    }
  
    const filteredProducts = products.filter(product => {
      return product.category === name || product.category == id;
    });
    setProductList(filteredProducts);
  }
  const confirmDelete = () => {
    mutate(selectedProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
        setShowConfirmModal(false);
      },
    });
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil((productList.length || 0) / productsPerPage);

  return (
    <div className="p-5 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 text-center">Product Management</h1>

      {/* Search & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchBox onChange={(e) => setSearchQuery(e.target.value)} data={categories} callback={handleCategorySelect}/>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          onClick={() => navigate("/admin/add-product")}
        >
          <IoIosAddCircleOutline size={20} /> Add Product
        </button>
      </div>

      {/* Products List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentProducts.map((product) => (
          <motion.li
            key={product.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 bg-lime-300 inline px-3 rounded-lg">{product.category_name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/update-product/${product.id}`)}
                className="bg-yellow-500 p-2 rounded text-white hover:bg-yellow-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="bg-red-500 p-2 rounded text-white hover:bg-red-700"
              >
                <IoTrashBin />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Prev
          </button>
          <span className="font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this product?</p>
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
                  {isLoading ? "Deleting..." : "Yes, Delete"}
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
