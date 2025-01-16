import React,{useState} from 'react'

function SearchModal() {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const handleSearch = (e) => {
        e.preventDefault()
        console.log('searching...')

    }
  return (
    <>
        <div className=' bg-black/95 rounded-lg p-5   -mt-32'>
           <div className='relative w-full flex flex-col gap-2'>
              <h1 className='text-2xl text-white font-bold'>Search Products</h1>
           <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' className='w-full bg-transparent border-b-2 border-white/50 p-2 text-white' />
           <h1 className='text-gray-400'>Results</h1>
           <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center bg-gray-900 p-1 rounded cursor-pointer hover:bg-gray-950  '>
                     <img src="https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" className='w-16 h-16 object-cover rounded-lg' />       
                    <div>
                        <h1 className='text-white font-bold'>Product Name</h1>
                        <p className='text-white text-sm py-2'>
                            Product description
                        </p>
                        <p className='text-white'>Price: <span className='font-bold'>200tk</span></p>
                    </div>     
                </div>
                <div className='flex gap-2 items-center bg-gray-900 p-1 rounded cursor-pointer hover:bg-gray-950  '>
                     <img src="https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=600" alt="product" className='w-16 h-16 object-cover rounded-lg' />       
                    <div>
                        <h1 className='text-white font-bold'>Product Name</h1>
                        <p className='text-white text-sm py-2'>
                            Product description
                        </p>
                        <p className='text-white'>Price: <span className='font-bold'>200tk</span></p>

                    </div>     
                </div>
           </div>
           </div>

        </div>
    </>
  )
}

export default SearchModal