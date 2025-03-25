import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import ResultCard from "./components/ResultCard";

const AnimatedBackground = dynamic(() => import("./components/AnimatedBackground"), { ssr: false });

export default function Result({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AnimatedBackground />
      
      <div className="sticky top-0 z-20 w-full bg-gray-950/80 backdrop-blur-md">
        <div className="w-full border-b border-gray-800/40">
          <div className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400"></div>
          <Navbar />
        </div>
      </div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center">
          <ResultCard id={params.id} />
          
          <div className="h-24"></div>
        </div>
      </main>
    </div>
  );
}