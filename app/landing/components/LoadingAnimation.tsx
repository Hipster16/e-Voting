"use client"

import { motion } from "framer-motion"

export function LoadingAnimation() {
  return (
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
  )
} 