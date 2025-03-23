"use client";
import React from "react";
import { motion } from "framer-motion";
import ElectionGrid from "@/app/components/ElectionGrid";
import ContentHeader from "./ContentHeader";

export default function ElectionContent() {
  const year = new Date().getFullYear();
  
  return (
    <motion.div
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ContentHeader />
      
      <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/40 rounded-xl p-6 shadow-xl mb-6">
        <ElectionGrid />
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © {year} e-Voting. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
} 