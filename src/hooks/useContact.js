import {useMutation,useQueryClient,useQuery} from '@tanstack/react-query';
import {postContact,updateContact,deleteContact,getContacts} from '../actions/contactAction'

export const usePostContact = (contact)=>{
   const client = useQueryClient();
   return useMutation(
    {
        mutationFn: postContact,
        onMutate: async (newContact) => {
            await client.cancelQueries('contacts');
            const previousContacts = client.getQueryData('contacts');
            client.setQueryData(['contacts'], (old) => old? [...old, newContact]:[newContact]);
            return { previousContacts };
        },
        onError: (err, newContact, context) => {
            client.setQueryData('contacts', context.previousContacts);
        },
        onSettled: () => {
            client.invalidateQueries('contacts');
        }
    }
   ) 
}

export const useGetContacts =  ()=>{
    return useQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
    })
}