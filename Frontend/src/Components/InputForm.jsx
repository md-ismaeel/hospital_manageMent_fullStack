import React from 'react'

export const InputForm = ({ value, placeHolder, type, onChange }) => {
  return (
    <>
      <div className='w-[400px] h-[40px]'>
        <input type={type} placeholder={placeHolder} value={value} onChange={onChange} className='w-[100%] h-[100%]' />
      </div>
    </>
  )
}
