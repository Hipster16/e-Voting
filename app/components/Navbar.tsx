import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full h-[100px] bg-slate-100/15 text-white flex justify-between items-center p-10 rounded-full border-1'>
        <h1 className='font-extrabold text-xl'><span className='text-blue-600'>e</span>Voting</h1>
        <button className='bg-blue-600 font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600'>Login</button>
    </div>
  )
}
