import Navbar from "@/app/components/Navbar";
import ResultGraph from "@/app/components/ResultGraph";
import React from "react";

function Result({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full rounded-3xl border p-5 border-blue-800/50 bg-blue-950/20 backdrop-blur-sm shadow-2xl overflow-hidden">
          <Navbar />

          <div className="p-6 md:p-10">
            <header className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent inline-block">
                Election Results
              </h1>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                View the final tallies and winner of election #{params.id}
              </p>
            </header>

            <section className="flex flex-col items-center gap-8">
              <ResultGraph id={params.id} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
