'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginButtons() {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
     
    const handleClick = () => {
        setVisible(true)
    }
    
    const handleLogin = () => {
        
    }
  return (
    <div className='w-[30%]'>
        {!visible ?
            <button className='bg-blue-600 text-xl font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleClick}>Login</button>
            :
            <div className='w-full flex justify-between'>
                <button className='bg-blue-600 text-xl font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleClick} value={'admin'}>Admin</button>
                <button className='bg-blue-600 text-xl font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleClick} value={'student'}>student</button>
            </div>
        }
    </div>
  )
}
