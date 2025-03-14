import ElectionGrid from "@/app/components/ElectionGrid";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Home, Search, FileBarChart } from "lucide-react";
import { useMetaMask } from "@/app/hooks/useMetamask";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-20 min-h-full flex flex-col items-center bg-blue-950/20 border-2 border-blue-900 p-4">
      <div className="mt-20">
        {" "}
        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 ease-in-out cursor-pointer">
          <Link href={"/"}>
            <Home
              size={24}
              className="transition-all duration-300 ease-in-out"
            />
          </Link>
        </div>
      </div>

      <div className="group p-3 mt-4 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white hover:scale-110 hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300 ease-in-out cursor-pointer relative">
        <Search size={24} className="transition-all duration-300 ease-in-out" />
        <div className="absolute left-24 -top-1 w-0 group-hover:w-64 rounded-full transition-all duration-300 ease-in-out overflow-hidden bg-gray-800">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full px-6 py-3 bg-transparent text-gray-300 focus:outline-none rounded-full placeholder-gray-300"
          />
        </div>
      </div>

      <div className="p-3 mt-4 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 text-white hover:scale-110 hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 ease-in-out">
        <FileBarChart
          size={24}
          className="transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}

function StudentDashboard() {
  return (
    <main className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <Sidebar />

      <div className="flex-1 max-w-screen p-6">
        <div className="w-full min-h-full rounded-3xl p-6 flex flex-col bg-blue-950/20 border-2 border-blue-900">
          <Navbar />
          <div className="text-center mt-8">
            <h1 className="text-5xl font-semibold mb-6 text-white">
              Active Elections
            </h1>
          </div>

          <ElectionGrid />
        </div>
      </div>
    </main>
  );
}

export default StudentDashboard;
