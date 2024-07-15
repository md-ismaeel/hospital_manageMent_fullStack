import React from 'react'
import logo from "../../assets/Medical-log.png"
import { DnaLoader } from '../../Components/Loader/Loader'

export const Appointment = () => {
  return (
    <>
      <section className='w-full h-auto'>
        <div>
          <img src={logo} alt='mm' className='w-[300px] h-[300px]' />
        </div>
        <DnaLoader />
      </section>
    </>
  )
}