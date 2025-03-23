"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ContentHeader() {
  return (
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
        Campus Elections
      </h1>
      <p className="text-gray-400 max-w-md mx-auto">
        Vote in current elections and make your voice heard
      </p>
    </motion.div>
  );
} 