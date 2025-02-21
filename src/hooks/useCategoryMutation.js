import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory, deleteCategory } from "../actions/updateDeleteCategory";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }) => updateCategory({ id, category: name }), // Corrected mutationFn
    onMutate: async ({ id, name }) => {
      await queryClient.cancelQueries("categories");
      const previousValue = queryClient.getQueryData("categories");
      queryClient.setQueryData(
        "categories",
        (old) => old?.map((cat) => (cat.id === id ? { ...cat, name } : cat)) // Ensure ID comparison is correct
      );
      return previousValue;
    },
    onError: (err, variables, previousValue) => queryClient.setQueryData("categories", previousValue),
    onSettled: () => queryClient.invalidateQueries("categories"),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id)=>deleteCategory(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries("categories");
      const previousValue = queryClient.getQueryData("categories");
      queryClient.setQueryData("categories", (old) => old?.filter((cat) => cat.id !== id)); // Ensure ID comparison is correct
      return previousValue;
    },
    onError: (err, variables, previousValue) => queryClient.setQueryData("categories", previousValue),
    onSettled: () => queryClient.invalidateQueries("categories"),
  });
};