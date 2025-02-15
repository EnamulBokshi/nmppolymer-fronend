import React, { useState, useEffect } from 'react'
import { useSearchProduct } from '../../hooks/useSearchProduct'
import { useNavigate,Link} from 'react-router'

function SearchModal({callBack}) {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    // Use the custom hook directly
    const { data: products, error: searchError, loading: searchLoading } = useSearchProduct(search)

    // Handle loading and error states
    useEffect(() => {
        if (searchError) {
            setError(searchError)
        }
        setLoading(searchLoading)
    }, [searchError, searchLoading])
    
    const handleProductClick = (id) => {
        navigate(`/product-details/${id}`)

    }
    return (
        <div className='bg-black/95 rounded-lg p-5 -mt-32 '>
            <div className='relative w-full flex flex-col gap-2 max-h-96 '>
                <h1 className='text-2xl text-white font-bold'>Search Products</h1>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder='Search' 
                    className='w-full bg-transparent border-b-2 border-white/50 p-2 text-white' 
                />
                <h1 className='text-gray-400'>Results</h1>
                
                {loading && <div className="text-white">Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                
                <div className='flex flex-col gap-2 overflow-auto  transition-transform transform duration-200 delay-75'>
                    { products?.map((product) => (
                        <div 
                            key={product.id}
                            className='flex gap-2 items-center bg-gray-900 p-1 px-3 rounded cursor-pointer hover:bg-gray-950'
                            onClick={callBack ? ()=>callBack(product.id) : ()=>handleProductClick(product.id)}
                        >
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className='w-16 h-16 object-cover rounded-lg' 
                            />       
                            <div className='flex flex-col gap-1'>
                                <h1 className='text-white font-bold'>{
                                    product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name
                                    }</h1>
                                <p className='text-white text-sm '>
                                    {
                                        product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description
                                    }
                                </p>
                                <p className='text-white'>
                                    Price: <span className='font-bold'>{product.price}tk</span>
                                </p>
                            </div>     
                        </div>
                    ))}
                    
                    {products?.length === 0 && search && (
                        <div className="text-white">No products found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchModal