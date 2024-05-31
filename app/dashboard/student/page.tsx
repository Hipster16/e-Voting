import ElectionGrid from '@/app/components/ElectionGrid'
import Navbar from '@/app/components/Navbar'
import React from 'react'

function StudentDashboard() {
  return (
    <main className="max-w-screen min-h-full h-screen p-10">
      <div className="w-full min-h-full rounded-3xl border-1 border-gray-200 p-10 flex flex-col items-center">
        <Navbar/>
        <h1 className='text-5xl font-semibold my-10'>Active Elections</h1>
        <ElectionGrid/>
      </div>
      <div className="p-[30px]"/>
    </main>
  )
}

export default StudentDashboard