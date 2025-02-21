import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCategory } from '../..';
import { NoImage } from '../../../../../components';
import { useUpdateProduct } from '../../../../../hooks/useUpdateProduct';

function UpdatePost({ callBack, product }) {
    if (!product) return null; // Ensure product exists
    
    const id = product?.id;
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price || '');
    const [category, setCategory] = useState(product?.category || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [imagePreviews, setImagePreviews] = useState([
        product?.image || NoImage,
        product?.image2 || NoImage,
        product?.image3 || NoImage,
        product?.image4 || NoImage,
    ]);
    
    const { mutate: updateProduct, isLoading: productLoading } = useUpdateProduct();
    const { data: categories, isLoading: categoryLoading } = useCategory();
    const imageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
    
        // Append images only if they are different from the initial product images
        if (images[0] instanceof File) {
            formData.append('image', images[0]);
        }
        if (images[1] instanceof File) {
            formData.append('image2', images[1]);
        }
        if (images[2] instanceof File) {
            formData.append('image3', images[2]);
        }
        if (images[3] instanceof File) {
            formData.append('image4', images[3]);
        }
    
        // Log the keys in formData to check if the images are being appended
        for (let key of formData.keys()) {
            console.log(key);
        }
    
        updateProduct({ id, product: formData }, {
            onSuccess: () => {
                alert('Product updated successfully!');
                callBack(false);
            },
            onError: (err) => {
                setError('Something went wrong! Please try again.');
                console.error(err); // Log the error for debugging
            },
            onSettled: () => setLoading(false)
        });
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
                <h1 className="text-2xl font-semibold text-gray-700">Update Product</h1>
                {error && <p className="text-red-600">{error}</p>}
                <form className="flex flex-col gap-5 mt-4" onSubmit={handleUpdateProduct} encType='multipart/form-data'>
                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 w-full rounded-lg border focus:ring focus:ring-gray-300" required />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} min={0} className="p-2 w-full rounded-lg border focus:ring focus:ring-gray-300" required />
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 rounded-lg border focus:ring focus:ring-gray-300">
                        <option value="" disabled>Select a Category</option>
                        {categories?.map((cat) => <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>)}
                    </select>
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 rounded-lg border focus:ring focus:ring-gray-300" required />
                    <div className="grid grid-cols-4 gap-4 p-3 rounded-lg border bg-gray-100 border-dashed">
                        {imagePreviews.map((img, index) => (
                            <div key={index} className="rounded-lg p-3 border border-gray-400 bg-gray-300 hover:opacity-80 cursor-pointer flex justify-center items-center" onClick={() => imageRefs[index].current.click()}>
                                <img src={img} alt="product" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        ))}
                        {images.map((_, index) => (
                            <input key={index} type="file" className="hidden" ref={imageRefs[index]} onChange={(e) => handleImageChange(e, index)} />
                        ))}
                    </div>
                    <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                </form>
                <button onClick={() => callBack(false)} className="w-full mt-3 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800">Close</button>
            </motion.div>
        </motion.section>
    );
}

export default UpdatePost;
