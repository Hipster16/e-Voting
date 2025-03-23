"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
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
  );
} 