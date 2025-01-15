import React, { useEffect } from 'react'
import { Boilerplate, Main } from '..'
import { useParams } from 'react-router-dom'
import { Footer, NavPrimary, RelatedProducts } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { findProduct, relatedProducts } from '../../components/store/products'

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products)
  const product = {
    id:2,
    name: "White black pipe"   ,
    description: "The pipe is good for water supply ",
    image: "https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=600",
    image2:"https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&cs=tinysrgb&w=600",
    image3:"https://images.pexels.com/photos/4017967/pexels-photo-4017967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    image4:"https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    price: 100,
    category: ['white', 'black'],

}
const [disaplayImage, setDisplayImage] = React.useState(product.image);

  const related = products.filter(product => product.category.includes(product.category[0]))
  // console.log(product)

  return (
    <Boilerplate height={'0px'}>
      <section className='container mx-auto px-10 flex justify-center items-center'>
        <div className='flex flex-col md:flex-row justify-start gap-5 items-start w-full'> 
            <div className='p-4 shadow gap-y-5 bg-neutral-100 rounded-lg flex-col flex justify-center items-center '>
                <div className='p-2 max-h-96 rounded-lg bg-gray-50 shadow '>
                    <img src={disaplayImage} alt={product.name} className=' w-full max-h-60 object-cover rounded-lg' />
                </div>
                <div className='p-4 shadow bg-gray-200 flex justify-evenly items-center w-full rounded-lg border gap-x-2'>
                    <img src={product.image} alt={product.name} onClick={()=>setDisplayImage(product.image)} className={`w-16 hover:ring hover:scale-105 duration-200 ease-in h-16 object-cover rounded-lg ${disaplayImage == product.image? 'ring -translate-y-2': ''}`} />
                    <img src={product.image2} alt={product.name} onClick={()=>setDisplayImage(product.image2)} className= {`w-16 hover:ring hover:scale-105 duration-200 ease-in h-16 object-cover rounded-lg ${disaplayImage == product.image2? 'ring -translate-y-2': ''}`}/>
                    <img src={product.image3} alt={product.name} onClick={()=>setDisplayImage(product.image3)} className={`w-16 hover:ring hover:scale-105 duration-200 ease-in h-16 object-cover rounded-lg ${disaplayImage == product.image3? 'ring -translate-y-2': ''}`} />
                    <img src={product.image4} alt={product.name} onClick={()=>setDisplayImage(product.image4)} className={`w-16 hover:ring hover:scale-105 duration-200 ease-in h-16 object-cover rounded-lg ${disaplayImage == product.image4? 'ring -translate-y-2': ''}`}/>
                </div>
            </div>
            <div className='p-4 shadow space-y-3  rounded-lg  '>
                <h1 className='text-3xl font-serif'>{product.name}</h1>
                <p className='text-lg text-neutral-500'>{'Summery'}</p>
                <p className='text-lg '>{product.description}</p>
                <p className='text-lg '><span className='font-bold'>Price: $</span>{product.price}</p>
                <p className='text-lg '><span className='font-bold'>Category: </span>{product.category.join(' ')}</p>
                <div className='flex gap-5'>
                    <button className='bg-red-500 text-neutral-50 px-4 py-2 rounded-lg'>Add to Cart</button>
                    <button className='bg-red-500 text-neutral-50 px-4 py-2 rounded-lg'>Buy Now</button>    
                </div>

            </div>
        </div>
      </section>
      <RelatedProducts products={related} />
    </Boilerplate>
  )
}

export default ProductDetails