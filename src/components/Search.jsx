import React,{useState} from 'react'
import { FiAlignLeft } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoTime } from 'react-icons/io5';
import { TiTimesOutline } from "react-icons/ti";
function SearchBox({ value, onChange,callback,data=[] }) {
  const [showCategory,setShowCategory] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const handleCategoryModal = () => {
    console.log('Category Modal');
    setShowCategory(!showCategory);
  }


  return (
    <div className='relative'>
      <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      className='px-10 py-3 text-gray-500 rounded-lg w-full relative ' placeholder='Search...' />
      {
        !showCategory && <FiAlignLeft className="absolute left-3 top-[15px] text-xl opacity-50" onClick={handleCategoryModal}/>
      }
      {
        showCategory && <TiTimesOutline className="absolute left-3 top-[15px] text-xl opacity-50" onClick={handleCategoryModal}/>
      }
      <FaSearch className="absolute right-3 top-[15px]  text-xl opacity-50" />

      <div className={`absolute top-12 left-0 p-5 w-52 flex flex-wrap gap-2  bg-white/40 backdrop-blur-sm shadow-lg text-gray-800 rounded-lg z-10 ${showCategory ? 'block' : 'hidden'}`}>  
        <div className={`${!selectedCategory? 'bg-gray-100 ':''} p-3 hover:bg-gray-100 rounded cursor-pointer`} onClick={()=>{
            callback(null,null)
            setSelectedCategory(null)
          }}>
          <h1 className="text-lg font-semibold">All</h1>
        </div>
      {
        data?.map((category,index) => (
          <div key={index} className={`${selectedCategory==category.id ? 'bg-gray-100 ':''} p-3 hover:bg-gray-100 rounded cursor-pointer`} onClick={()=>{
            callback(category.id,category.name)
            setSelectedCategory(category.id)
          }}>{category.name}</div>
        ))
      }
      </div>
    </div>
  )
}
export default SearchBox