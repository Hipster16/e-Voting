import React from "react";
import { Award, BarChart4 } from "lucide-react";
import dynamic from "next/dynamic";

const ResultGraph = dynamic(() => import("@/app/components/ResultGraph"), {
  loading: () => <ResultLoader />,
  ssr: false
});

function ResultLoader() {
  return (
    <div className="w-full h-[480px] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Award className="h-6 w-6 text-emerald-500/40" />
        </div>
        <div className="mt-5 h-5 w-64 bg-gray-700/50 rounded"></div>
        <div className="mt-3 h-4 w-48 bg-gray-700/30 rounded"></div>
        <div className="mt-12 grid grid-cols-3 gap-4 w-full max-w-md">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-24 w-5 bg-gray-700/20 rounded"></div>
              <div className="h-3 w-12 bg-gray-700/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultCard({ id }: { id: string }) {
  return (
    <div className="w-full max-w-5xl rounded-xl border border-gray-800/50 bg-gray-900/60 backdrop-blur-md shadow-2xl overflow-hidden">
      <div className="border-b border-gray-800/50">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 rounded-full bg-emerald-500/10">
              <Award className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Election Results</h2>
              <p className="text-gray-400 text-sm mt-0.5">
                ID: <span className="text-emerald-400 font-medium">{id}</span>
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="p-1.5 rounded-md bg-emerald-500/5">
              <BarChart4 className="h-5 w-5 text-emerald-400/70" />
            </div>
            <span className="text-sm text-gray-400">Results Dashboard</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <div className="bg-gray-950/60 border border-gray-800/50 rounded-lg p-6 min-h-[550px]">
          <ResultGraph id={id} />
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-gray-400 text-center md:text-left">
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              Results are verified and secured using blockchain technology
            </p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 