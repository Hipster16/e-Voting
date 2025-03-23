"use client";
import LoginForm from "@/app/components/LoginForm";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, LogIn } from "lucide-react";

function StudentLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-emerald-500/5 rounded-full"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2
              }}
              animate={{ 
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3]
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                filter: "blur(80px)",
              }}
            />
          ))}
        </div>
        <div className="absolute w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
              initial={{ opacity: 0.1 + Math.random() * 0.3 }}
              animate={{ opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.4] }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                height: `${Math.random() * 30 + 15}%`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(144,_238,_144,_0.03)_1px,_transparent_1px),_linear-gradient(to_right,_rgba(144,_238,_144,_0.03)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
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
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-md mx-auto mt-8 text-center text-gray-500 text-xs"
        >
          <p>© {new Date().getFullYear()} e-Voting. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentLogin;
