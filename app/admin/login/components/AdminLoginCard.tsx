"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import MetamaskConnect from "@/app/components/MetamaskConnect";

export default function AdminLoginCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-md mx-auto bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="p-0.5">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 rounded-t-xl"></div>
      </div>
      
      <div className="p-8">
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="p-4 rounded-full bg-blue-500/10">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500">
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm">
            Connect with Metamask to access admin dashboard
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <MetamaskConnect />
        </motion.div>
      </div>
    </motion.div>
  );
} 