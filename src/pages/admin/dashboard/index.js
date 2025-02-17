import StatsCard from "./utils/stats/StatsCard";
import DummyChart from "./utils/charts/Charts";
import AddPost from "./utils/posts/AddPost";
import AddCategory from "./utils/category/AddCategory";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api";

export { StatsCard, DummyChart, AddPost, AddCategory };


export const useCategory = () => {
  return useQuery(
    {
        queryKey:['categories'],
        queryFn: async () =>{
            const res = await api.get('/api/categories/')
            return res.data
        },
        staleTime: 1000 * 60 * 60 * 24,
        cacheTime: 1000 * 60 * 60 * 24,
        
    }

  )
};
