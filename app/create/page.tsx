import React from 'react'
import ElectionForm from '@/app/components/ElectionForm'

function CreateElection() {
  return (
    <div className='w-full h-full'>
        <div className="w-[50%] h-full bg-white text-black mx-auto my-20 rounded-2xl p-10">
            <h1 className='w-full text-center font-semibold text-3xl mb-5'>
                New Election
            </h1>
            <ElectionForm/>
        </div>
    </div>
  )
}

export default CreateElection