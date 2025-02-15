import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { searchProduct } from "../actions/searchProduct";

export const useSearchProduct = (searchArgs) => {
    return useQuery({
        queryKey: ['searchProduct',searchArgs],
        queryFn: () => searchProduct(searchArgs)
    })
}