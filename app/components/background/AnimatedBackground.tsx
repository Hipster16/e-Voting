"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [backgroundOrbs, setBackgroundOrbs] = useState<Array<{
    key: number;
    x: string;
    y: string;
    width: number;
    height: number;
    opacity: number;
    duration: number;
  }>>([]);
  
  const [backgroundLines, setBackgroundLines] = useState<Array<{
    key: number;
    height: string;
    left: string;
    top: string;
    opacity: number;
    duration: number;
  }>>([]);
  
  useEffect(() => {
    const orbs = Array.from({ length: 4 }).map((_, i) => ({
      key: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      width: Math.random() * 400 + 200,
      height: Math.random() * 400 + 200,
      opacity: 0.1 + Math.random() * 0.2,
      duration: 15 + Math.random() * 20
    }));
    setBackgroundOrbs(orbs);
    
    const lines = Array.from({ length: 8 }).map((_, i) => ({
      key: i,
      height: `${Math.random() * 30 + 15}%`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: 0.1 + Math.random() * 0.3,
      duration: 4 + Math.random() * 6
    }));
    setBackgroundLines(lines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {backgroundOrbs.map((orb) => (
          <motion.div
            key={orb.key}
            className="absolute bg-emerald-500/5 rounded-full"
            initial={{ 
              x: orb.x, 
              y: orb.y,
              opacity: orb.opacity
            }}
            animate={{ 
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [orb.opacity, orb.opacity + 0.1]
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              width: `${orb.width}px`,
              height: `${orb.height}px`,
              filter: "blur(80px)",
            }}
          />
        ))}
      </div>
      <div className="absolute w-full h-full">
        {backgroundLines.map((line) => (
          <motion.div
            key={line.key}
            className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
            initial={{ opacity: line.opacity }}
            animate={{ opacity: [line.opacity, line.opacity + 0.1] }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              height: line.height,
              left: line.left,
              top: line.top,
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(144,_238,_144,_0.03)_1px,_transparent_1px),_linear-gradient(to_right,_rgba(144,_238,_144,_0.03)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
} 