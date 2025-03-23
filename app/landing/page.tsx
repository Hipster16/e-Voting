"use client"

import { useEffect, useState } from "react"
import { LandingPageNavBar } from "./components/NavBar"
import { Hero } from "./components/Hero"
import { Features } from "./components/Features"
import { HowItWorks } from "./components/HowItWorks"
import { Benefits } from "./components/Benefits"
import { Testimonials } from "./components/Testimonials"
import { Footer } from "./components/Footer"
import { motion, AnimatePresence } from "framer-motion"
import { scrollToElement } from "./utils/smoothScroll"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const hash = window.location.hash
      if (hash) {
        const id = hash.substring(1)
        setTimeout(() => {
          scrollToElement(id)
        }, 100)
      }
    }
  }, [isLoading])

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
          className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 overflow-hidden"
          id="landing"
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

          <LandingPageNavBar />
          <main className="relative z-10">
            <Hero />
            <Features />
            <HowItWorks />
            <Benefits />
            <Testimonials />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

