import React from "react";
import AddCategory from "./AddCategory";
import { useCategory } from "../../../../../hooks/useCategory";
import { useUpdateCategory, useDeleteCategory } from "../../../../../hooks/useCategoryMutation";
import { ImSpinner4 } from "react-icons/im";
import { useQueryClient } from "@tanstack/react-query";

function CategoryComponent() {
  const queryClient = useQueryClient()
  const {
    data: categories,
    error: categoryError,
    isLoading: categoryLoading,
  } = useCategory();

  const { mutate: deleteCategory, isPending: deleteCategoryPending } = useDeleteCategory();
  const { mutate: updateCategory, isPending: updatePending, isError: updateError, error: updateCategoryError } = useUpdateCategory();

  const [sortField, setSortField] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [showUpdateCategory, setShowUpdateCategory] = React.useState(false);
  const [updatedCategoryValue, setUpdatedCategoryValue] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(null);
  const [showDeleteCategory, setShowDeleteCategory] = React.useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = React.useState(null);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleCategoryEdit = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (!categoryToEdit) return;
    setSelectedId(id);
    setUpdatedCategoryValue(categoryToEdit.name);
    setShowUpdateCategory(true);
  };

  const handleConfirmUpdate = () => {
    if (!updatedCategoryValue.trim()) return;

    updateCategory(
      { id: selectedId, name: updatedCategoryValue },
      {
        onSuccess: () => setShowUpdateCategory(false),
        onSettled: () => {
          setSelectedId(null);
          setUpdatedCategoryValue("");
        },
        onError: () => {
          queryClient.invalidateQueries("categories");
        },
      }
    );
  };

  const handleCategoryDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteCategory(true);
  };

  const handleConfirmDelete = () => {
    deleteCategory(selectedDeleteId,{
      onSuccess: () => setShowDeleteCategory(false),
      onSettled: () => setSelectedDeleteId(null),
      onError: () => {
        queryClient.invalidateQueries("categories");
      },
    });
    setShowDeleteCategory(false);
  }

  return (
    <div className="bg-neutral-100 p-5 rounded-lg shadow ">
      <h1 className="text-center pb-5 text-xl font-bold">Category</h1>
      <AddCategory />

      {categoryError && <p className="text-red-500 text-center">Error: {categoryError.message}</p>}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("category")}>
                Category {sortField === "category" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categoryLoading ? (
              <tr>
                <td colSpan="2" className="text-center py-3">
                  <ImSpinner4 className="animate-spin inline-block" /> Loading...
                </td>
              </tr>
            ) : categories?.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="py-3 px-4">
                    {showUpdateCategory && selectedId === category.id ? (
                      <input
                        type="text"
                        className=" p-2 border rounded"
                        value={updatedCategoryValue}
                        onChange={(e) => setUpdatedCategoryValue(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    {showUpdateCategory && selectedId === category.id ? (
                      <>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={handleConfirmUpdate}>
                          {updatePending ? <ImSpinner4 className="animate-spin" /> : "Confirm"}
                        </button>
                        <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => setShowUpdateCategory(false)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleCategoryEdit(category.id)}>
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleCategoryDelete(category.id)}>
                          {deleteCategoryPending && selectedDeleteId == category.id? <ImSpinner4 className="animate-spin" /> : "Delete"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-3">No Categories Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h1 className="text-xl font-bold pb-5">Are you sure?</h1>
            <div className="flex justify-center gap-5">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowDeleteCategory(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryComponent;
