"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle, ArrowRight, ChevronDown } from "lucide-react"
import { steps } from "../data/data"

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  

  const toggleStep = (index: number) => {
    if (expandedStep === index) {
      setExpandedStep(null)
    } else {
      setExpandedStep(index)
    }
  }

  return (
    <section id="how-it-works" className="py-20 md:py-32 relative bg-gray-900/50">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-emerald-900/5 to-gray-900/0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              SIMPLE PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How e-Vote Works</h2>
            <p className="text-gray-400 text-lg">
              Our blockchain voting platform is designed specifically for college elections, making the process 
              secure, transparent, and accessible to all students while eliminating common issues like fraud and low participation.
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="relative">
          <div className="flex flex-col md:flex-row md:space-x-4 lg:space-x-6">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row md:w-1/4 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-1 h-full w-full"
                >
                  <div className="bg-gray-800/90 rounded-xl border border-gray-700/50 h-full p-6 flex flex-col">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
                        <span className="text-emerald-400 text-xl font-bold">{index + 1}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-white text-center">{step.title}</h3>
                    <p className="text-gray-400 text-center mb-4">{step.description}</p>
                    
                    <motion.button
                      onClick={() => toggleStep(index)}
                      className="flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors mt-auto mx-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm">Learn more</span>
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${expandedStep === index ? "rotate-180" : ""}`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-700/50"
                        >
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <motion.li
                                key={detailIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: detailIndex * 0.1 }}
                                className="flex items-start"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{detail}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                    className="hidden md:flex absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    {/*<ArrowRight className="w-6 h-6 text-emerald-500" />*/}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="/home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-base shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200"
          >
            See It In Action
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}