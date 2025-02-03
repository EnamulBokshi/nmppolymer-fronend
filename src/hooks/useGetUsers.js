import { getUsers } from "../actions/getUsers";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })
}
