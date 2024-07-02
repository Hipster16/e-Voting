import Navbar from '@/app/components/Navbar'
import ResultGraph from '@/app/components/ResultGraph'
import React from 'react'


function Result({ params } : { params: {id: string} }) {
  return (
    <div className="w-full h-full min-h-screen p-16">
    <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
      <Navbar />
      <section className='flex flex-col items-center gap-5 mt-7'>
        <h1 className='font-medium text-5xl mb-5'>Result</h1>
        <ResultGraph id={params.id} />
      </section>
    </div>
  </div>
  )
}

export default Result