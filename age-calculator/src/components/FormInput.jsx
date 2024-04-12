import React from 'react'

const FormInput = (props ) => {
 const { label, handleChange, placeholder, name, date, errorMessage, error } = props

  return (
    <div className='flex flex-col md:w-[20%]'>
      <label
        className={`tracking-[0.2rem] text-[.8rem] font-semibold 
        uppercase text-gray-600 ${error[name] ? 'text-red-600' : ''}`}
        htmlFor={name}
        >{label}</label>
      <input
      onChange={handleChange}
      value={date.name}
      name={name}
      placeholder={placeholder} 
      className={`w-full p-2 border h-9 font-bold text-[1.3rem] rounded-md
      ${error[name] ? 'border-red-600' : ''} md:h-14 md:text-[1.5rem]`}
      type='text' />
      <span
      className={`text-[.8rem] ${error[name] ? 'text-red-600 block' : 'hidden'}`}
      >{errorMessage}</span>
    </div>
  )
}

export default FormInput