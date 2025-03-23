"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FooterCopyright() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="max-w-md mx-auto mt-8 text-center text-gray-500 text-xs"
    >
      <p>© {new Date().getFullYear()} e-Voting. All rights reserved.</p>
    </motion.div>
  );
} 