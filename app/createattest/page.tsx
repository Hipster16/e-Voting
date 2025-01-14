import AttestationForm from '@/app/components/AttestationForm'
import React from 'react'

function StudentLogin() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[500px] h-min bg-white border-1 flex flex-col justify-between item-center gap-10 p-10 rounded-2xl">
                <h1 className="text-3xl text-center text-black font-semibold">
                    Create an Attestation
                </h1>
                <AttestationForm />
            </div>
        </div>
    )
}

export default StudentLogin