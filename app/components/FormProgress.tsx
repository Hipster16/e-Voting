import React from 'react'

type prop = {
    page: number
}
 
export default function FormProgress({ page }: prop) {
  return (
    <div className='w-full mt-9 mb-20 flex gap-2 rounded'>
        <div className='w-full flex flex-col gap-3 items-center'>
            <div className={`w-full h-[10px] ${page >= 1 ? 'bg-green-500' : "bg-slate-200"} rounded-full`}></div>
            <p className='text-md font-medium'>Basic information</p>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
            <div className={`w-full h-[10px] ${page >= 2 ? 'bg-green-500' : "bg-slate-200"} rounded-full`}></div>
            <p className='text-md font-medium'>Candidates</p>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
            <div className={`w-full h-[10px] ${page >= 3 ? 'bg-green-500' : "bg-slate-200"} rounded-full`}></div>
            <p className='text-md font-medium'>Participants</p>
        </div>
        <div className='w-full flex flex-col gap-3 items-center'>
            <div className={`w-full h-[10px] ${page >= 4 ? 'bg-green-500' : "bg-slate-200"} rounded-full`}></div>
            <p className='text-md font-medium'>Acknoledgement</p>
        </div>
    </div>
  )
}
