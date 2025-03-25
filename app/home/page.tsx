"use client"
import { useEffect, useState } from "react"
import LoginButtons from "@/app/components/LoginButtons"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Vote, ChevronLeft, Shield, Eye, UserCheck } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative w-32 h-32"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500 border-r-emerald-500 opacity-75"></div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 overflow-hidden flex flex-col"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-emerald-500/5 rounded-full"
                  style={{
                    width: `${Math.random() * 400 + 100}px`,
                    height: `${Math.random() * 400 + 100}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: "blur(60px)",
                    opacity: Math.random() * 0.3,
                  }}
                />
              ))}
            </div>
            <div className="absolute w-full h-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
                  style={{
                    height: `${Math.random() * 30 + 10}%`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i + "h"}
                  className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
                  style={{
                    width: `${Math.random() * 30 + 10}%`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          <header className="relative z-10 py-4 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="relative w-9 h-9 md:w-10 md:h-10">
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
                        animate={{ rotate: 360 }}
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

                <div className="flex items-center space-x-4">
                  <Link 
                    href="/landing" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm md:text-base"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Landing</span>
                    <span className="sm:hidden">Back</span>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                <div className="text-center md:text-left md:flex-1">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl p-4 font-bold bg-gradient-to-r from-white via-emerald-300 to-emerald-500 text-transparent bg-clip-text leading-tight"
                  >
                    Vote Without Rigging
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base text-gray-300 my-4 md:pr-6"
                  >
                    Experience secure and transparent online voting with e-Vote,
                    ensuring your vote is counted without any risk of tampering.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="hidden md:flex space-x-6 mt-4"
                  >
                    {[
                      { icon: Shield, text: "Secure" },
                      { icon: Eye, text: "Transparent" },
                      { icon: UserCheck, text: "Verified" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center text-gray-400">
                        <item.icon className="w-4 h-4 mr-2 text-emerald-400" />
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6 md:mt-0 md:flex-1 md:max-w-xs mx-auto"
                >
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 md:p-6">
                    <h3 className="text-center text-lg font-medium text-white mb-4">Login to Continue</h3>
                    {!isLoading && (
                      <div className="space-y-2">
                        <LoginButtons />
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 py-2 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} e-Vote. All rights reserved.
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}