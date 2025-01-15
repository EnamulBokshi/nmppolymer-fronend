import {Boilerplate} from '..'
import React, { useRef } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { SearchBox,ProductCart, Pagination, RelatedProducts } from '../../components'
import { use } from 'react'

function ProductDetails() {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.category)
    const [productsState, setProductsState] = React.useState(products)
    const categoryRef = useRef(null)
    const handleCategoryChange = (category) => {
        if(category === ''){
            setProductsState(products)
        } else {
            const filteredProducts = products.filter(product => product.category === category)
            setProductsState(filteredProducts)
        }
    }  
    const handleSearch = (search) => {
        if(search === ''){
            setProductsState(products)
        } else {
            const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            setProductsState(filteredProducts)
        }
    } 
    return (
        <Boilerplate>
        <section className='space-y-4 p-10'>
            <div className='flex justify-between items-center '>
                <div className='flex  bg-red-700 text-white p-2 rounded-md  '>
                <button className='hover:text-gray-300' onClick={()=>handleCategoryChange('')}>All Products</button>
                <select name="category" ref={categoryRef} onChange={(e)=>handleCategoryChange(e.target.value)}  className='rounded-md px-3 hover:text-red-500 text-red-600 ms-3' id="">
                    <option value="">Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                </div>
               <SearchBox  onChange={(e)=>handleSearch(e.target.value)}/>
            </div>
            <div className='container  mx-auto px-4 py-8 bg-gray-100  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 '>
                {
                    productsState.length === 0 && <h1>No products found</h1>
                }
                {
                    
                    productsState?.map((product, index) => (
                        <ProductCart key={index} product={product} />
                    ))
                }
            </div>
            <Pagination products={productsState} seeAll={false}/>
            <div>
                <RelatedProducts products={productsState} />
            </div>
        </section>
        </Boilerplate>
    )
    }

export default ProductDetails;