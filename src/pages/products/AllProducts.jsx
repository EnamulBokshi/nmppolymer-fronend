import {Boilerplate} from '..'
import React, { useEffect, useRef } from 'react'
import { SearchBox,ProductCart, Pagination, RelatedProducts } from '../../components'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useGetCategories } from '../../hooks/useGetCategories'

function AllProducts() {
    const {data:products,isPending,error} = useGetProducts()
    const {data:categories,isPending:categoryPending,error:categoryError} = useGetCategories()
    const [productsState, setProductsState] = React.useState([])

    const categoryRef = useRef(null)
    const handleCategoryChange = () => {

       const category = categoryRef.current.value;
       console.log("Products: ",products)
       console.log(category)
        if(category === ''){
            setProductsState(products)
        } else {

            const filteredProducts = products.filter(product =>{
                console.log("Product category: ",parseInt(product.category)===parseInt(category))
                return parseInt(product.category)===parseInt(category)
            })
            console.log(filteredProducts)
            setProductsState(filteredProducts)
        }
    }  
    const handleSearch = (search) => {
        if(search === ''){
            setProductsState(products)
        } else {
            const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            setProductsState(filteredProducts)
        }
    } 
    console.log(categories)
    useEffect(() => {
        if(products) {
            setProductsState(products)
        }
    },[products])
    if(!products) return <div>No products</div>
    if(error) return <div>{error}</div>
    if (isPending) {
        return <h1 className="text-center">
          Loading...
        </h1>;
      }

    return (
        <Boilerplate>
        <section className='space-y-4 p-10'>
            <div className='flex justify-between items-center '>
                <div className='flex  bg-red-700 text-white p-2 rounded-md  '>
                <button className='hover:text-gray-300' onClick={()=>handleCategoryChange('')}>All Products</button>
                <select name="category" ref={categoryRef} onChange={handleCategoryChange}  className='rounded-md px-3 hover:text-red-500 text-red-600 ms-3' id="">
                    <option value="">Category</option>
                    {categories?.map((category, index) => (
                        <option key={index} value={category.id}>{category.name}</option>
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
                <RelatedProducts products={productsState} title='Recommended'/>
            </div>
        </section>
        </Boilerplate>
    )
    }

export default AllProducts;