import { useMutation,useQueryClient } from "@tanstack/react-query";
import {  updateProduct} from "../actions/products";



export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct, 
        onMutate: async (updatedData) => {
            await queryClient.cancelQueries({ queryKey: ['products'] });

            const previousProducts = queryClient.getQueryData(['products']);

            queryClient.setQueryData(['products'], (old) =>
                old ? old.map((p) => (p.id === updatedData.id ? { ...p, ...updatedData.product } : p)) : []
            );

            return { previousProducts };
        },
        onError: (err, updatedData, context) => {
            if (context?.previousProducts) {
                queryClient.setQueryData(['products'], context.previousProducts);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

