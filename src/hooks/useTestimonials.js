import { useQuery,useQueryClient,useMutation} from '@tanstack/react-query';
import {getTestimonials,updateTestimonial,createTestimonial,deleteTestimonial} from '../actions/testimonialAction'

export const useGetTestimonials = ()=>{
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: getTestimonials,
        staleTime: 1000 * 60 * 5 
    })
}

export const useCreateTestimonial =()=>{
    const queryClient =useQueryClient();

    return useMutation({
        mutationFn: createTestimonial,
        onSuccess: ()=>{
            queryClient.invalidateQueries('testimonials')
        },
    })
}

export const useUpdateTestimonial = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTestimonial,
        onMutate: async(updatedData)=>{
            await queryClient.cancelQueries('testimonials');

            const previousTestimonials = queryClient.getQueryData('testimonials');

            queryClient.setQueryData('testimonials',(old)=>{
                old?.map((p)=>(p.id == updatedData.id ? {...p,...updatedData.testimonial}:p))
            })

            return {previousTestimonials}   
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('testimonials')
        }
    })
}

export const useDeleteTestimonial =()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTestimonial,
        onMutate: async(id)=>{
            await queryClient.cancelQueries('testimonials');

            const previousTestimonials = queryClient.getQueryData('testimonials');

            queryClient.setQueryData('testimonials',(old)=>{
                old?.filter((p)=>p.id !== id)
            })

            return {previousTestimonials}
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries('testimonials')

        }
    })
}