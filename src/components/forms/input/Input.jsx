import React from 'react'

function Input({pholder, css='',title,type = 'text',isReq = false,option = [],error='',value='',onChange,name}) {
  const defaultCss = 'text-gray-500 hover:text-gray-700';
  return (
  <div className='relative'>
    <label className={css != ''? css:defaultCss + ` py-0 my-0 font-bold`}>
        {title} 
        {isReq && <span className='text-red-700  absolute top-[-10px]'>*</span>}
    </label>
    {
      error&&<label className='text-red-600 absolute bg-white/30 px-2 py-2 duration-300 translate-x-1 left-[-20px] bottom-[-30px] rounded-lg ms-2 ' >{error}</label>
    }
    {   
        type == 'select' ? 
        <select value={value} name={name} onChange={onChange} className='w-full bg-white py-3 px-2 rounded-lg  text-gray-500'  required = {isReq}>
        {option.map((opt,index) => <option  value={opt.toLowerCase()} key={index}>{opt.toUpperCase()}</option>)}
        </select>
        : 
        type == 'textarea'? <textarea name={name} onChange={onChange} value={value} placeholder={pholder} className={error? `w-full bg-white py-3 px-2 rounded-lg  text-gray-500 ring-1 ring-red-600`:`w-full bg-white py-3 px-2 rounded-lg  text-gray-500 ring-1 `} required= {isReq}> </textarea>:

        <input name={name} onChange={onChange} value={value} placeholder={pholder} type={type} className={error? `w-full bg-white py-3 px-2 rounded-lg  text-gray-500 ring-1 ring-red-600`:`w-full bg-white py-3 px-2 rounded-lg  text-gray-500 ring-1 `}  required = {isReq} />
     
}
  </div>
  )
}

export default Input