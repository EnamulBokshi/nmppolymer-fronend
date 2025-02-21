import api from "../api";
export const getCategory = async () => {
    const response = await api.get('/api/categories/')
    return response.data
}
