"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, ChevronRight, Vote } from "lucide-react"
import { useScrollToHash } from "../utils/smoothScroll"

export function LandingPageNavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const handleHashClick = useScrollToHash()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleHashClick(e)
    if (isOpen) {
      setIsOpen(false)
    }
  }

  // Custom function to generate href for navigation items
  const getNavHref = (item: string) => {
    if (item === "Use Cases") {
      return "#use-cases";
    }
    return `#${item.toLowerCase().replace(/\s+/g, "-")}`;
  };

  // Navigation items for both desktop and mobile
  const navItems = ["Features", "How it Works", "Benefits", "Use Cases"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-9 h-9 md:w-11 md:h-11">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-emerald-500/30 blur-sm"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="absolute inset-0.5 bg-gray-900/80 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: scrolled ? 0 : 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-emerald-500/30 opacity-70"
                  />
                  <Vote className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 relative z-10" />
                </motion.div>
              </div>
              
              <div className="flex flex-col">
                <motion.span 
                  className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500"
                  animate={{ 
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  e-Vote
                </motion.span>
                <span className="hidden md:inline-block text-xs text-emerald-400/80 font-light tracking-wide">
                  Blockchain Voting
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={getNavHref(item)}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
                onClick={handleNavItemClick}
              >
                {item}
              </a>
            ))}
            <Link
              href="/home"
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              <span>Launch App</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={getNavHref(item)}
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 rounded-md"
              onClick={handleNavItemClick}
            >
              {item}
            </a>
          ))}
          <Link
            href="/home"
            className="flex items-center justify-center space-x-1 mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-sm"
            onClick={() => setIsOpen(false)}
          >
            <span>Launch App</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}