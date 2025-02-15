import React, { useEffect, useState, useRef } from 'react';
import { useCategory } from '../..';
import { NoImage } from '../../../../../components';
import { motion } from 'framer-motion';
import { useGetProductDetails } from '../../../../../hooks/useGetProducts';
import { useParams } from 'react-router';
import { useUpdateProduct } from '../../../../../hooks/useUpdateProduct';

function UpdatePost() {
    // State management
    const id = useParams().id;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [imagePreviews, setImagePreviews] = useState([NoImage, NoImage, NoImage, NoImage]);
    
    const {mutate:updateProduct,isLoading:productLoading,error:productUpdateError} = useUpdateProduct();

    const imageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const { data: categories, isLoading: categoryLoading } = useCategory();

    const { data:product, error:productError,isLoading} = useGetProductDetails(id);
    // Load product details into state when component mounts
    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price || '');
            setCategory(product.category || '');
            const newImages = [
                product.image || NoImage,
                product.image2 || NoImage,
                product.image3 || NoImage,
                product.image4 || NoImage
            ];
            setImages(newImages);
            setImagePreviews(newImages);
        }
    }, [product]);

    // Handle image selection
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const newImages = [...images];
            newImages[index] = file; // Store file, not URL
            setImages(newImages);
    
            const newPreviews = [...imagePreviews];
            newPreviews[index] = URL.createObjectURL(file); // Store preview URL
            setImagePreviews(newPreviews);
        }
    };
    


    // Handle product update submission
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
    
            // Append images only if they are File objects
            images.forEach((image, index) => {
                if (image instanceof File) {
                    formData.append(`image${index + 1}`, image);
                }
            });
    
            console.log('Form Data:', [...formData]); // Debugging purpose
    
            updateProduct({ id, product: formData }, {
                onSuccess: (data) => {
                    console.log("Product Updated Successfully:", data);
                    alert('Product updated successfully!');
                },
                onError: (error) => {
                    setError('Something went wrong! Please try again.');
                    console.error("Error Updating Product:", error.response?.data);
                }
            });
    
        } catch (err) {
            setError('Something went wrong! Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    if (loading || categoryLoading) return <p className="text-center">Loading...</p>;

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/60 flex justify-center items-center backdrop-blur-sm"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className="bg-white p-6 rounded-lg w-[500px] shadow-lg"
            >
                {
                    // Form to update product details
                    
                }
                <h1 className="text-2xl font-semibold text-gray-700">Update Product</h1>
                <form className="flex text-gray-700 flex-col gap-5 mt-4" onSubmit={handleUpdateProduct}>
                    {error && <p className="text-red-600">{error}</p>}
                    <div className="space-y-2 flex-col">
                    <label htmlFor="" className='text-gray-600'>Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 w-full rounded-lg border focus:ring focus:ring-gray-300"
                        required
                    />
                    </div>
                    <div className="space-y-2 flex-col">

                    <label htmlFor="" className='text-gray-600'>Price</label>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min={0}
                        className="p-2 w-full rounded-lg border focus:ring focus:ring-gray-300"
                        required
                    />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 rounded-lg border focus:ring focus:ring-gray-300"
                    >
                        <option value="" disabled>Select a Category</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                        ))}
                    </select>
                    
                    <div className='flex flex-col space-y-1'>
                    <label htmlFor="" className='text-gray-600'>Descriptions</label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 rounded-lg border focus:ring focus:ring-gray-300"
                        required
                    />
                    </div>

                    <div className="grid grid-cols-4 gap-4 p-3 rounded-lg border bg-gray-100 border-dashed">
                        {imagePreviews.map((img, index) => (
                            <div
                                key={index}
                                className="rounded-lg p-3 border border-gray-400 bg-gray-300 hover:opacity-80 cursor-pointer flex justify-center items-center"
                                onClick={() => imageRefs[index].current.click()}
                            >
                                <img
                                    src={img}
                                    alt="product"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ))}
                        {images.map((_, index) => (
                            <input
                                key={index}
                                type="file"
                                className="hidden"
                                ref={imageRefs[index]}
                                onChange={(e) => handleImageChange(e, index)}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </form>
                <button
                    onClick={()=>history.back()}
                    className="w-full mt-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                    Close
                </button>
            </motion.div>
        </motion.section>
    );
}

export default UpdatePost;
