"use client";
import React from "react";
import { motion } from "framer-motion";
import Signin from "@/app/components/StudentSignin";

export default function SigninCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-md mx-auto bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="p-0.5">
        <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-t-xl"></div>
      </div>
      
      <div className="p-8">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
            Create Your Student Account
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Signin />
        </motion.div>
      </div>
    </motion.div>
  );
} 