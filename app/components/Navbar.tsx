import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='w-full h-[100px] bg-slate-100/15 text-white flex justify-between items-center p-10 rounded-full border-1'>
        <h1 className='font-semibold text-xl'><span className='text-blue-600'>e</span>Voting</h1>
        <Popover>
          <PopoverTrigger>
            <div className='bg-blue-600 font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600 cursor-pointer'>Login</div>
          </PopoverTrigger>
          <PopoverContent className="w-60 h-full bg-white border-2 border-slate-100/45 text-white m-5 ">
              <div className='flex flex-col justify-between h-full gap-6'>
                <Link href={'/login/admin'} className='bg-blue-600 text-xl text-center font-semibold py-4 px-10 rounded-full hover:bg-black'>Admin</Link>
                <Link href={'/login/student'} className='bg-blue-600 text-xl text-center font-semibold py-4 px-10 rounded-full hover:bg-black'>student</Link>
              </div>
          </PopoverContent>
        </Popover>
    </div>
  )
}
