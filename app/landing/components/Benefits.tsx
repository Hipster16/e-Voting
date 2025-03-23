"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import { benefits, useCases, stats } from "../data/data"

export function Benefits() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })
  const [activeTab, setActiveTab] = useState(0)

  

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  }

  return (
    <section id="benefits" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-emerald-900/5 to-gray-900/0"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-emerald-500/5 rounded-full blur-3xl"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Blockchain Voting</h2>
            <p className="text-gray-400 text-lg">
              Our platform offers numerous advantages over traditional voting systems, from enhanced security to
              increased accessibility.
            </p>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-emerald-500/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors duration-300">
                <benefit.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-emerald-300 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? "show" : "hidden"}
          variants={containerVariants}
          className="mt-24 mb-24 py-16 px-6 rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/30"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Proven Results</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our blockchain voting platform has demonstrated exceptional performance metrics across all key indicators.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={statVariants} className="text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                  }}
                  className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                VERSATILE APPLICATIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Cases</h2>
              <p className="text-gray-400 text-lg">
                e-Vote can be implemented across various campus sectors for secure and transparent voting.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {useCases.map((useCase, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === index ? "bg-emerald-500 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {useCase.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{useCases[activeTab].title}</h3>
              <p className="text-gray-400 mb-6">{useCases[activeTab].description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {useCases[activeTab].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500">
            <div className="bg-gray-900 rounded-xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Ready to transform your campus voting process?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the growing number of colleges using e-Vote to conduct secure, transparent, and efficient
                elections.
              </p>
              <a
                href="/home"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium text-base shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}