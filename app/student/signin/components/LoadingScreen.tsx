"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function LoadingScreen() {
  return (
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
  );
} 