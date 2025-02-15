import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProducts } from "../actions/postProducts";

export const usePostProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProducts,

    onMutate: async (newProduct) => {
      await queryClient.cancelQueries(["products"]);
      const previousProducts = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old) =>
        old ? [newProduct, ...old] : [newProduct]
      );

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(["products"], context.previousProducts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};
