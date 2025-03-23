"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const orbs = [
    {
      size: "w-96 h-96",
      position: "top-20 left-[5%]",
      color: "bg-emerald-500/4",
      delay: 0,
      duration: 12,
    },
    {
      size: "w-[30rem] h-[30rem]",
      position: "bottom-10 right-[10%]",
      color: "bg-emerald-600/3",
      delay: 2,
      duration: 15,
    },
    {
      size: "w-72 h-72",
      position: "top-1/3 right-1/4",
      color: "bg-teal-500/3",
      delay: 1,
      duration: 14,
    },
    {
      size: "w-64 h-64",
      position: "bottom-1/3 left-1/4",
      color: "bg-emerald-400/3",
      delay: 3,
      duration: 16,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-900"></div>
      {orbs.map((orb, index) => (
        <motion.div 
          key={index}
          className={`absolute ${orb.position} ${orb.size} ${orb.color} rounded-full blur-3xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ 
            duration: orb.duration, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: orb.delay,
            repeatType: "mirror"
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
    </div>
  );
} 