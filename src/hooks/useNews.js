import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import {getNews,createNews,deleteNews,updateNews,getNewsDetails} from '../actions/newsAction'

export const useGetNews = ()=>{
    return useQuery(
        {
            queryKey:['news'],
            queryFn: getNews,
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    )
}
export const useGetNewsDetails = (id)=>{
    return useQuery(
        {
            queryKey:['news',id],
            queryFn: ()=>getNewsDetails(id),
            staleTime: 1000 * 60 * 60 * 24,
            cacheTime: 1000 * 60 * 60 * 24,
        }
    )
}

export const useCreateNews = ()=>{
    const queryClient = useQueryClient();
    return  useMutation({
        mutationFn: createNews,
        onMutate: async (data)=>{
            await queryClient.cancelQueries('news');
            const previousValue = queryClient.getQueryData('news');
            queryClient.setQueryData('news',(old)=>old ? [...old,data] : [data]);
            return {previousValue};
        },
        onError: (err,_,context)=>{
            queryClient.setQueryData('news',context.previousValue);
        },
        onSettled: ()=>{
            queryClient.invalidateQueries('news');
        }
    })
}

export const useDeleteNews = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNews,
        onMutate: async (id)=>{
            await queryClient.cancelQueries('news');
            const previousValue = queryClient.getQueryData('news');
            queryClient.setQueryData('news',(old)=>old.filter((item)=>item.id !== id));
            return {previousValue};
        },
        onError: (err,_,context)=>{
            queryClient.setQueryData('news',context.previousValue);
        },
        onSettled: ()=>{
            queryClient.invalidateQueries('news');
        }
    })
}

export const useUpdateNews = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateNews,
        onMutate: async (data)=>{
            await queryClient.cancelQueries('news');
            const previousValue = queryClient.getQueryData('news');
            queryClient.setQueryData('news',(old)=>old?.map((item)=>item.id === data.id ? data : item));
            return {previousValue};
        },
        onError: (err,_,context)=>{
            queryClient.setQueryData('news',context.previousValue);
        },
        onSettled: ()=>{
            queryClient.invalidateQueries('news');
        }
    })
}

export const useNews = ()=>{
    return {useGetNews,useCreateNews,useDeleteNews,useUpdateNews}
}
