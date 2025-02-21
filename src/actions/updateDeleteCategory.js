// Date: 03/18/2021
// Description: Actions for updating and deleting categories
import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const updateCategory = async ({ id, category }) => {
  console.log("category: ", category);
  console.log("id: ", id);
  const response = await api.put(`/api/categories/update/${id}/`, { name: category }, { 
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/api/categories/delete/${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });
  return response.data;
};