"use client"

import React from "react"

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-emerald-500/5 rounded-full"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(60px)",
              opacity: Math.random() * 0.3,
            }}
          />
        ))}
      </div>
      <div className="absolute w-full h-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
            style={{
              height: `${Math.random() * 30 + 10}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i + "h"}
            className="absolute h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
            style={{
              width: `${Math.random() * 30 + 10}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
} 