
import { useMutation, useQuery } from 'react-query'
import { getCategory, updateCategory } from '../actions/getCategory'
export const useCategory = () => {
    return useQuery(
        {
            queryKey: ['categories'],
            queryFn: getCategory
        }
    )
}

export const useUpdateCategory = () => {
    return useMutation(updateCategory)
}