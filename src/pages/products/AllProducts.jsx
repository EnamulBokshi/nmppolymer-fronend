import { Boilerplate } from '..'
import React, { useState, useEffect, useRef } from 'react'
import { SearchBox, ProductCart, RelatedProducts } from '../../components'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useGetCategories } from '../../hooks/useGetCategories'
import { FaArrowLeft, FaArrowRight, FaSpinner } from 'react-icons/fa6'
import { useSearchParams } from 'react-router-dom'

function AllProducts() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category_id') || ''; // Ensure it's a string
    const { data: products, isPending, error } = useGetProducts();
    const { data: categories } = useGetCategories();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const categoryRef = useRef(null);

    // Initialize filtered products when products or category changes
    useEffect(() => {
        if (products) {

            const modifiedProducts = products?.map(product => {
                const category = categories?.find(cat => String(cat.id) === String(product.category));
                return ({ ...product, categoryName: category?.name || 'Unknown' });
            })

            let filtered = modifiedProducts;

            if (category) {
                filtered = modifiedProducts.filter(product => String(product.category) === category);
                if (categoryRef.current) categoryRef.current.value = category;
            }
            

            setFilteredProducts(filtered);
        }
    }, [products, category]);

    // Category filter handler
    const handleCategoryChange = () => {
        const selectedCategory = categoryRef.current.value;
        setCurrentPage(1);

        if (selectedCategory === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products?.filter(product => String(product.category) === selectedCategory));
        }
    };

    // Search handler
    const handleSearch = (searchTerm) => {
        setCurrentPage(1);

        if (!searchTerm.trim()) {
            setFilteredProducts(products); // Reset products when search is empty
            return;
        }

        setFilteredProducts(products?.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil((filteredProducts?.length || 0) / productsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : 1));
    };

    const handlePrevPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : totalPages));
    };



    return (
        <Boilerplate>
            <section className='space-y-4 md:p-10'>
                {/* Search and Filter Controls */}
                <div className='flex flex-col gap-y-3 md:flex-row md:gap-y-0 justify-between items-center'>
                    <div className='flex bg-red-700 text-white p-2 rounded-md'>
                        <button 
                            className='hover:text-gray-300' 
                            onClick={() => {
                                categoryRef.current.value = '';
                                handleCategoryChange();
                            }}
                        >
                            All Products
                        </button>
                        <select 
                            ref={categoryRef} 
                            onChange={handleCategoryChange} 
                            className='rounded-md px-3 hover:text-red-500 text-red-600 ms-3'
                        >
                            <option value="">Category</option>
                            {categories?.map((cat) => (
                                <option key={cat.id} value={String(cat.id)}>
                                    {cat.name}
                                </option>
                            ))}
                            {
                                category.length == 0 && (
                                    <option value="" selected>No Category</option>
                                )
                            }
                        </select>
                    </div>
                    <SearchBox onChange={(e) => handleSearch(e.target.value)} />
                </div>

                            {
                                isPending && (
                                    <div className="flex items-center justify-center h-screen">
                                        <p className="text-lg text-gray-500"><FaSpinner className='animate-spin'/></p>
                                    </div>
                                )
                            }

                            {
                                error && (
                                    <div className="flex items-center justify-center h-screen">
                                        <p className="text-lg text-red-500">Error: {error.message}</p>
                                    </div>
                                )
                            }
                {/* Products Grid */}
                <div className='container mx-auto px-4 py-8 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                    {currentProducts?.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            No products found
                        </div>
                    ) : (
                        currentProducts?.map((product) => (
                            <ProductCart key={product.id} product={product} />
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {filteredProducts?.length > 0 && totalPages > 1 && (
                    <div className="flex justify-between items-center mt-10">
                        <div className="space-x-4 flex items-center">
                            <button 
                                onClick={handlePrevPage}
                                className="rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700"
                            >
                                <FaArrowLeft />
                            </button>
                            <button 
                                onClick={handleNextPage}
                                className="rounded-full hover:bg-red-700 duration-200 hover:text-white p-2 bg-gray-200 text-red-700 ring ring-red-700"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif">
                                <span className="text-red-600">{currentPage}</span>
                                /
                                <span className="text-gray-500">{totalPages}</span>
                            </h2>
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {filteredProducts?.length > 0 && (
                    <div>
                        <RelatedProducts products={filteredProducts} title='Recommended' />
                    </div>
                )}
            </section>
        </Boilerplate>
    );
}

export default AllProducts;
