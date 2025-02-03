import { getProducts,getProduct} from "../actions/getProducts";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
}
export const useGetProductDetails = (id) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: ()=> getProduct(id)
    })
}