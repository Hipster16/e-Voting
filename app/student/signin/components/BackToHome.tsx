"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function BackToHome() {
  return (
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
  );
} 