import React from 'react'

export const InputForm = ({ value, placeHolder, type, onChange }) => {
  return (
    <>
      <div className='w-[400px] h-[50px]'>
        <input type={type} placeholder={placeHolder} value={value} onChange={onChange}
          className='w-[100%] h-[100%] px-6 border rounded-md focus:outline-none focus:ring focus:ring-blue-300' />
      </div>
    </>
  )
}
