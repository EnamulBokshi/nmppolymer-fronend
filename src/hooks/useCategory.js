
import {  useQuery } from '@tanstack/react-query'
import { getCategory } from '../actions/getCategory'

export const useCategory = () => {
    return useQuery(
        {
            queryKey: ['categories'],
            queryFn: getCategory,
            staleTime: 1000 * 60 * 60 * 24,
          cacheTime: 1000 * 60 * 60 * 24,
        }
    )
}
