import React from "react";
import api from "../../../../../api";
import { FaRing } from "react-icons/fa";
import { ImSpinner4 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN } from "../../../../../constant";
function AddCategory({ className = "" }) {
  const [categoryName, setCategoryName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState("");
  const addCategory = useMutation({
    mutationKey: "addCategory",
    mutationFn: async (name) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await api.post("api/create-category/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onError: (error) => {
      setError(error);
    },
    onSuccess: (data) => {
      setSuccess(data);
    },

  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (categoryName) {
      addCategory.mutate(categoryName);
      window.location.reload();
      setLoading(false);
    }
    else {
      setLoading(false);
      setError("Category name is required");
    } 
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <label htmlFor="category" className="sr-only">
          Category Name
        </label>
        <input
          type="text"
          className="border border-sky-400 bg-gray-300 focus:outline-none rounded shadow p-2"
          name="category"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 rounded-lg hover:bg-red-600  text-white py-2 px-4"
        >
          {loading ? <ImSpinner4 className="animate-spin" /> : "Add"}
        </button>
      </form>
      {
        error && <p className="text-red-500">{error}</p>
      }
     {
        success && <p className="text-green-500">{'New category added successfully!!'}</p>
     }
    </div>
  );
}

export default AddCategory;
