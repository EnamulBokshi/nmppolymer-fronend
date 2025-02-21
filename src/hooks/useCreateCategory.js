import { useMutation,useQueryClient,useQuery } from "@tanstack/react-query";
import { postCategory } from "../actions/postCategory";

export const useCreateCategory = (category)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postCategory,
        onMutate: async (category) => {
            await queryClient.cancelQueries('categories')
            const previousValue = queryClient.getQueryData('categories')
            queryClient.setQueryData('categories', (old) => old? [...old, category]: [category])
            return previousValue
        },
        onError: (err, variables, previousValue) => queryClient.setQueryData('categories', previousValue),
        onSettled: () => queryClient.invalidateQueries('categories')
    })
}