"use client"
import Signin from "@/app/components/StudentSignin"
import React, { useState, useEffect } from "react"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toastNotify } from "@/app/utils/toast"

function StudentSignin() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    try {
      const handleConnectionCheck = async () => {
        try {
          const response = await fetch('/api/health', { 
            method: 'HEAD',
            cache: 'no-cache'
          }).catch(() => ({ ok: false }));
          
          if (!response.ok) {
            toastNotify.warning("Network connectivity issues detected. Some features may be limited.");
          }
        } catch (error) {
          console.error("Health check error:", error);
        }
      };
      
      handleConnectionCheck();
    } catch (error) {
      console.error("Initialization error:", error);
      if (!isLoading) {
        toastNotify.error(error, "There was a problem loading the application");
      }
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 flex items-center justify-center bg-gray-950 z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="relative w-24 h-24 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-emerald-500 absolute"
            >
              <ShieldCheck size={32} />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-emerald-500/5 rounded-full"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: `${Math.random() * 100}%`,
                    opacity: 0.1 + Math.random() * 0.2
                  }}
                  animate={{ 
                    x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                    opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3]
                  }}
                  transition={{
                    duration: 15 + Math.random() * 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  style={{
                    width: `${Math.random() * 400 + 200}px`,
                    height: `${Math.random() * 400 + 200}px`,
                    filter: "blur(80px)",
                  }}
                />
              ))}
            </div>
            
            <div className="absolute w-full h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
                  initial={{ opacity: 0.1 + Math.random() * 0.3 }}
                  animate={{ opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.4] }}
                  transition={{
                    duration: 4 + Math.random() * 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  style={{
                    height: `${Math.random() * 30 + 15}%`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            
            <div className="absolute inset-0 bg-[linear-gradient(rgba(144,_238,_144,_0.03)_1px,_transparent_1px),_linear-gradient(to_right,_rgba(144,_238,_144,_0.03)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="container mx-auto px-4 py-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <Link 
                href="/home" 
                className="group inline-flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-md mx-auto bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-0.5">
                <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-t-xl"></div>
              </div>
              
              <div className="p-8">
                <motion.div 
                  className="mb-8 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
                    Create Your Student Account
                  </h1>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Signin />
                </motion.div>
                
                <motion.div 
                  className=" text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                </motion.div>
              </div>
            </motion.div>
            
            
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default StudentSignin
