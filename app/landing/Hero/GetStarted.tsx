'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"

export function GetStarted() {
    const router = useRouter()

    const handleButton = () => {
        router.push("/home")
    }

  return (
    <section className="relative py-32 bg-[#1a1f2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2537] to-[#1a1f2e]" />
        
        <div className="relative container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-6 text-white tracking-tight">
                Ready to get started?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of organizations using our eVoting solution
            </p>
            <button
                onClick={handleButton}
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold 
                    inline-flex items-center text-white transition-all duration-300 
                    hover:shadow-xl hover:shadow-blue-600/20 transform hover:-translate-y-0.5"
                aria-label="Get started with eVoting"
            >
                Get started 
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
        </div>
    </section>
  )
}