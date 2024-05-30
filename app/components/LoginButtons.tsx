'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginButtons() {
    const [visible, setVisible] = useState(false);
    const router = useRouter();
     
    const handleClick = () => {
        setVisible(true);
    }
    
    const handleAdminLogin = () => {
        router.push('/login/admin');
    }

    const handleStudentLogin = () => {
        router.push('/login/student');
    }
  return (
    <div className='w-[30%]'>
        {!visible ?
            <button className='bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleClick}>Login</button>
            :
            <div className='w-full flex justify-between'>
                <button className='bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleAdminLogin}>Admin</button>
                <button className='bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600' onClick={handleStudentLogin}>student</button>
            </div>
        }
    </div>
  )
}
