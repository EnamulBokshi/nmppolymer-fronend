import React, { useState, useRef } from 'react';
import { NoImage } from '../../../../../components';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '../../../../../constant';
import api from '../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNotification} from '../../../../../components/store/notificationSlicer';
const fetchCategory = async () => {
    const response = await api.get('/api/categories/');
    return response.data;
};

function AddPost({ close }) {
    const dispatch = useDispatch();    

    const baseURL = import.meta.env.VITE_API_URL;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

    const user_id = useSelector(state => state.auth.user?.id);
    const imageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategory,
        onError: (error) => setError(error.message),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });

    const post = useMutation({
        mutationKey: ['addProduct'], 
        mutationFn: async (data) => {
            try {
                const response = await axios.post(`${baseURL}/api/products-create/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    },
                });
                return response.data; // ✅ Ensure we return the actual response data
            } catch (error) {
                throw error.response?.data?.message || "Something went wrong."; // ✅ Throw proper error
            }
        },
        onError: (error) => {
            setError(error || "Something went wrong."); 
            setLoading(false);
        },
        onSuccess: (data) => {
            setLoading(false);
            if (data?.id) {
                dispatch(addNotification({ id: data.id, message: 'Product added successfully', type: 'success', read: false }));
            } else {
                dispatch(addNotification({ id: Date.now(), message: 'Product added successfully', type: 'success', read: false }));
            }
            close();
        },
    });
    

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImages(prev => {
                const newImages = [...prev];
                newImages[index] = file;
                return newImages;
            });

            setImagePreviews(prev => {
                const newPreviews = [...prev];
                newPreviews[index] = URL.createObjectURL(file);
                return newPreviews;
            });
        } else {
            setError('Please select a valid image');
        }
    };

    const handlePost = (e) => {
        e.preventDefault();
        if (!name || !price || !category || !description || images.includes(null)) {
            setError('Please fill all fields and upload 4 images');
            return;
        }

        setLoading(true);
        setError('');

        const postData = new FormData();
        postData.append('name', name);
        postData.append('price', price);
        postData.append('description', description);
        images.forEach((img, i) => postData.append(`image${i + 1}`, img));
        postData.append('category', category);
        if (user_id) postData.append('user', user_id);

        post.mutate(postData);
    };

    return (
        <section className="fixed inset-0 bg-black/60 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-5 rounded-lg w-[500px] shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-700">Add Product</h1>
                <form className="flex flex-col gap-5 mt-4" onSubmit={handlePost}>
                    {error && <p className="text-red-600">{error}</p>}
                    
                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 w-full rounded-lg border" required />
                    
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} min={0} className="p-2 w-full rounded-lg border" required />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded-lg border">
                        <option value="" disabled>Select a Category</option>
                        {categories.data?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                        ))}
                    </select>

                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 rounded-lg border" required />

                    <div className="grid grid-cols-4 gap-4 p-3 rounded-lg border bg-gray-100 border-dashed">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="rounded-lg p-3 border border-gray-400 bg-gray-300 hover:opacity-80 cursor-pointer flex justify-center items-center"
                                onClick={() => imageRefs[index].current.click()}
                            >
                                <img src={imagePreviews[index] || NoImage} alt="product" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        ))}
                        {images.map((_, index) => (
                            <input key={index} type="file" className="hidden" ref={imageRefs[index]} onChange={(e) => handleImageChange(e, index)} />
                        ))}
                    </div>

                    <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
                        {loading ? 'Adding...' : 'Save'}
                    </button>
                </form>
                <button className="w-full mt-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800" onClick={close}>Close</button>
            </div>
        </section>
    );
}

export default AddPost;
