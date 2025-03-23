"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { scrollToElement } from "../utils/smoothScroll"
import { LandingPageNavBar } from "./NavBar"
import { Hero } from "./Hero"
import { Features } from "./Features"
import { HowItWorks } from "./HowItWorks"
import { Benefits } from "./Benefits"
import { Testimonials } from "./Testimonials"
import { Footer } from "./Footer"
import { LoadingAnimation } from "./LoadingAnimation"
import { BackgroundEffects } from "./BackgroundEffects"

export default function LandingContent() {
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
        <LoadingAnimation />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 overflow-hidden"
          id="landing"
        >
          <BackgroundEffects />

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