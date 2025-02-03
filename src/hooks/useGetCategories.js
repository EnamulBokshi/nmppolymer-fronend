import { getCategory } from "../actions/getCategory";

import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>{
    return useQuery(
        {
            queryKey: ['categories'],
            queryFn: getCategory
        }
    )
}