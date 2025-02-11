import Signin from '@/app/components/StudentSignin'
import React from 'react'

function StudentSignin() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[500px] h-min bg-white border-1 flex flex-col justify-between item-center gap-10 p-10 rounded-2xl">
                <h1 className="text-3xl text-center text-black font-semibold">
                    Sign in
                </h1>
                <Signin />
            </div>
        </div>
    )
}

export default StudentSignin