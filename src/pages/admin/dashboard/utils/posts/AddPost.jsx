import React, { useState, useRef } from 'react';
import { NoImage } from '../../../../../components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ACCESS_TOKEN } from '../../../../../constant';
import api from '../../../../../api';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addNotification} from '../../../../../components/store/notificationSlicer';
import { useCategory } from '../..';
import { usePostProducts } from '../../../../../hooks/usePostProducts';
import { FaSpinner } from 'react-icons/fa';
const fetchCategory = async () => {
    const response = await api.get('/api/categories/');
    return response.data;
};

function AddPost({ close,proudct=null }) {
    const client = useQueryClient()

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
    const closeBtnRef = useRef(null)
    const user_id = useSelector(state => state.auth.user?.id);
    const imageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const {data:categories} = useCategory()
    // const post = useMutation({
    //     mutationKey: ['addProduct'], 
    //     mutationFn: async (data) => {
    //         try {
    //             const response = await axios.post(`${baseURL}/api/products-create/`, data, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    //                 },
    //             });
    //             return response.data; // ✅ Ensure we return the actual response data
    //         } catch (error) {
    //             throw error.response?.data?.message || "Something went wrong."; // ✅ Throw proper error
    //         }
    //     },
    //     onError: (error) => {
    //         setError(error || "Something went wrong."); 
    //         setLoading(false);
    //     },
    //     onSuccess: (data) => {
    //         setLoading(false);
    //         if (data?.id) {
    //             dispatch(addNotification({ id: data.id, message: 'Product added successfully', type: 'success', read: false }));
    //         } else {
    //             dispatch(addNotification({ id: Date.now(), message: 'Product added successfully', type: 'success', read: false }));
    //         }

    //         client.invalidateQueries('products');
    //         close();


    //     },
    // });
    

    const {mutate:postProduct,isLoading,isError} = usePostProducts();


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
        if (!name || !price || !category || !description) {
            setError('Please fill all fields and upload 4 images');
            return;
        }

        setLoading(true);
        setError('');

       try {
         const postData = new FormData();
         postData.append('name', name);
         postData.append('price', price);
         postData.append('description', description);

        if(images[0]){
            postData.append('image', images[0]);

        }
        if(images[1]){
            postData.append('image2', images[1]);

        }
        if(images[2]){
            postData.append('image3', images[2]);
        }
        if(images[3]){
            postData.append('image4', images[3]);
        }
         postData.append('category', category);
         if (user_id) postData.append('user', user_id);
 
         postProduct(postData,{
                onSuccess: (data) => {
                   
                    resetForm();
                    dispatch(addNotification({ id:data.id, message: 'Product added successfully', type: 'success', read: false }));
                    
                },
                onError: (error) => {
                    setError(error || "Something went wrong."); 
                    setLoading(false);
                },
         });
         alert('Product added sucessfully')
         closeBtnRef.current.click();
       } catch (error) {
        setError('something went wrong!!')
        setLoading(false)
       }
       finally{
        setLoading(false)
       }
    };
    const resetForm = ()=>{
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImages([null, null, null, null]);
        setImagePreviews([null, null, null, null]);
    }
    return (
        <section className="fixed inset-0 bg-black/60 flex justify-center items-center backdrop-blur-sm  overflow-auto">
            <div className="bg-white p-5 rounded-lg w-[500px] shadow-lg ">
                <h1 className="text-2xl font-semibold text-gray-700">Add Product</h1>
                <form className="flex flex-col gap-5 mt-4" onSubmit={handlePost}>
                    {error && <p className="text-red-600">{error}</p>}
                    
                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 w-full rounded-lg border" required />
                    
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} min={0} className="p-2 w-full rounded-lg border" required />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded-lg border">
                        <option value="" disabled>Select a Category</option>
                        {categories?.map((cat) => (
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
                        {loading ? <FaSpinner className='inline text-white animate-spin' size={20} />: 'Save'}
                    </button>
                </form>
                <button ref={closeBtnRef} className="w-full mt-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800" onClick={close}>Close</button>
            </div>
        </section>
    );
}

export default AddPost;
