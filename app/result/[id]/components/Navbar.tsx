"use client";

import Link from "next/link";
import { ChevronLeft, Home, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="font-medium text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
            e-Vote
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center">
              <Home className="h-4 w-4 mr-1.5" />
              Home
            </Link>
            <Link href="/student/dashboard" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-1.5" />
              Dashboard
            </Link>
          </nav>
          
          <Link 
            href="/student/dashboard" 
            className="flex items-center text-sm px-4 py-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Elections
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-emerald-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800/50 mt-4 py-4 px-4 bg-gray-900/80 backdrop-blur-md">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-emerald-400 transition-colors py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link 
              href="/student/dashboard" 
              className="text-gray-400 hover:text-emerald-400 transition-colors py-2 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link 
              href="/student/dashboard" 
              className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Elections
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 