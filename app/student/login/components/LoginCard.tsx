"use client";
import React from "react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/app/components/LoginForm";

export default function LoginCard() {
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
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="p-4 rounded-full bg-emerald-500/10">
            <LogIn className="h-8 w-8 text-emerald-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
            Student Login
          </h2>
          <p className="text-gray-400 text-sm">
            Access your account to participate in campus elections
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <LoginForm />
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="text-sm">
            <span className="text-gray-400">Don&apos;t have an account?</span>{" "}
            <Link href="/student/signin" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 