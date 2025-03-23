"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Shield, Lock, Vote, CheckCircle, ArrowUpRight  } from "lucide-react"

export function Hero() {
  const circleRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const backgroundControls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let lastTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < 30) return
      lastTime = now

      if (!circleRef.current) return

      const { clientX, clientY } = e
      const rect = circleRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center (enhanced movement)
      const moveX = (clientX - centerX) / 30
      const moveY = (clientY - centerY) / 30

      // Apply smoother animation with spring physics
      circleRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
      
      // Update mouse position for the particles effect
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Enhanced background animation
  useEffect(() => {
    controls.start({
      scale: [1.1, 1.25, 1.1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    })
    
    backgroundControls.start({
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "linear",
      },
    })
  }, [controls, backgroundControls])

  // Generate random particles for background
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900/10 to-gray-900"
        animate={backgroundControls}
      />
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-emerald-500/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="fixed w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
            >
              BLOCKCHAIN POWERED E-VOTING FOR COLLEGES
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                Secure. Transparent.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  backgroundPosition: ["0% center", "100% center", "0% center"]
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2,
                  backgroundPosition: {
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }
                }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500"
              >
                Decentralized Voting.
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Transform student government elections, club voting, and campus referendums with our secure
              blockchain platform. Boost participation, eliminate fraud, and get instant verifiable results.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-base shadow-lg shadow-emerald-500/20 w-full sm:w-auto text-center relative overflow-hidden"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0"
                  animate={{ x: ["0%", "100%"] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                />
                <span className="relative z-10">Get Started</span>
              </motion.a>
              <motion.a
                href="https://github.com/Hipster16/e-Voting"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gray-800/80 text-white font-medium text-base border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 w-full sm:w-auto text-center"
              >
                GitHub
                <ArrowUpRight  className="w-5 h-5" />
              </motion.a>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, text: "Privacy Protected" },
                { icon: Lock, text: "No Blockchain Fees" },
                { icon: Vote, text: "Easy to Implement" },
                { icon: CheckCircle, text: "Mobile Friendly" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + 0.1 * index }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2"
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: "rgba(16, 185, 129, 0.2)",
                      boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </motion.div>
                  </motion.div>
                  <span className="text-sm text-gray-400">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 rounded-full blur-3xl transform scale-110"
              animate={controls}
            />

            <div ref={circleRef} className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-emerald-500/30 flex items-center justify-center relative">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-emerald-500/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                
                <motion.div
                  className="absolute inset-4 rounded-full border border-emerald-500/5"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ 
                        rotateY: [0, 360],
                      }}
                      transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Vote className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                    </motion.div>
                    <div className="text-lg font-bold text-white">e-Vote</div>
                    <div className="text-xs text-emerald-400 mt-1">Blockchain Voting</div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5"
                whileHover={{ 
                  scale: 1.3, 
                  y: -8,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <Shield className="w-4 h-4 text-emerald-400" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5"
                whileHover={{ 
                  scale: 1.3, 
                  x: 8,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <Lock className="w-4 h-4 text-emerald-400" />
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5"
                whileHover={{ 
                  scale: 1.3, 
                  y: 8,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5"
                whileHover={{ 
                  scale: 1.3, 
                  x: -8,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <Vote className="w-4 h-4 text-emerald-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}