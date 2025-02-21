import { useMutation,useQueryClient } from "@tanstack/react-query";

import {deleteProduct} from "../actions/products";

export const useDeleteProduct = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onMutate: async (id)=>{
            await queryClient.cancelQueries(["products"]);
            const previousProducts = queryClient.getQueryData(["products"]);
            queryClient.setQueryData(["products"],(old)=>old.filter((p)=>p.id !== id));
            return {previousProducts};
        }
        ,
        onError: (err, id, context) => {
            if (context?.previousProducts) {
              queryClient.setQueryData(["products"], context.previousProducts);
            }
          },
          onSettled: () => {
            queryClient.invalidateQueries(["products"]);
            }
    })
}