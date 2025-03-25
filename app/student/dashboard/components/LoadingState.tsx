"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LoadingState({ message = "Loading elections..." }) {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-24"
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent animate-pulse"></div>
        </div>
        <p className="mt-4 text-gray-400">{message}</p>
      </div>
    </motion.div>
  );
} 