import api from "../../../api";


const useUser = () => {
    
    const data = async () => {
        const res = await api.get("/api/users/");
        return res.data;
    };
}

export default useUser;