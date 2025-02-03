import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import {AddPost} from '..'
import { useGetProducts } from "../../../../hooks/useGetProducts";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const {data:products,loading,error} = useGetProducts();
  
  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [showAddPost, setShowAddPost] = useState(false);

  return (
    <div className="p-5 bg-white rounded shadow ">
      <h1 className="text-2xl font-bold mb-4">Products Control</h1>
      <div className="mb-4">
        <button
   
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-900 "
          onClick={() => setShowAddPost(!showAddPost)}
        >
          <span><IoIosAddCircleOutline  className="inline me-2"/></span>
          Add New Products
        </button>
      </div>
      <ul>
        {posts.map((post, index) => (
          <li key={index} className="mb-2 flex items-center">
            {editingPost === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border p-2 mr-2"
                />
                <button
                 
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{post}</span>
                <button
                  onClick={() => editPost(index)}
                  className="bg-yellow-500 text-white p-2 rounded mr-2"
                >
                  Edit
                </button>
              </>
            )}
            <button
           
              className="bg-red-500 text-white p-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-5">
        <div className="bg-gray-200 p-5 rounded-lg">
          <h1>Products</h1>
          <ul>
            {products?.map((product, index) => (
              <li
                key={index}
                className="mb-2  bg-black/60 rounded px-3 py-1 text-white flex items-center"
              >
                <span className="flex-1">{product.name}</span>
                <div className="flex gap-2">
                  <button
              
                    className="bg-red-500 hover:scale-105 hover:bg-red-700 hover:text-gray-300 text-white p-2 rounded"
                  >
                    <IoTrashBin />
                  </button>
                  <button
                   
                    className="bg-red-500 hover:scale-105 hover:bg-red-700 hover:text-gray-300 text-white p-2 rounded"
                  >
                    <FaEdit />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
       {
            showAddPost && <AddPost close={()=>setShowAddPost(false)}/>
       }
      </div>
    </div>
  );
};

export default Posts;
