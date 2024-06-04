import Navbar from '@/app/components/Navbar'
import ResultGraph from '@/app/components/ResultGraph'
import React from 'react'


function Result() {
  return (
    <div className="w-full h-full p-16">
    <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
      <Navbar />
      <section className='flex flex-col items-center gap-5 mt-7'>
        <h1 className='font-medium text-5xl mb-5'>Result</h1>
        <h2 className='text-2xl font-bold'>Candidate 3 Wins 🎉🎉</h2>
        <ResultGraph/>
      </section>
    </div>
  </div>
  )
}

export default Result