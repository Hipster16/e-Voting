"use client";
import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, RotateCcw, Wifi, Database, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ErrorStateProps {
  error: string | null;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  // Determine error type to show appropriate icon and message
  const getErrorDetails = () => {
    if (!error) return { 
      icon: <AlertCircle size={40} className="text-red-500" />,
      title: "Unknown Error",
      description: "An unexpected error occurred."
    };

    if (error === "Wallet not connected") {
      return {
        icon: <ShieldAlert size={40} className="text-red-500" />,
        title: "Not Authenticated",
        description: "Your wallet is not connected. Please log in again."
      };
    }

    if (error.toLowerCase().includes("network") || error.toLowerCase().includes("connection")) {
      return {
        icon: <Wifi size={40} className="text-red-500" />,
        title: "Network Error",
        description: "Unable to connect to the blockchain network."
      };
    }

    if (error.toLowerCase().includes("data") || error.toLowerCase().includes("decode")) {
      return {
        icon: <Database size={40} className="text-red-500" />,
        title: "Data Error",
        description: "Could not retrieve election data from the blockchain."
      };
    }

    return {
      icon: <AlertCircle size={40} className="text-red-500" />,
      title: "Error Loading Elections",
      description: error
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <motion.div
      key="error"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-24"
    >
      <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-6 max-w-md text-center">
        <div className="flex justify-center mb-4">
          {errorDetails.icon}
        </div>
        <div className="text-red-400 text-lg mb-2">{errorDetails.title}</div>
        <p className="text-gray-400 mb-4">{errorDetails.description}</p>
        
        {error === "Wallet not connected" ? (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-3">Redirecting to login page...</p>
            <Link 
              href="/student/login"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto w-32"
            >
              <RotateCcw size={16} />
              <span>Go to Login</span>
            </Link>
          </div>
        ) : (
          <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-gray-800 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            <span>Retry</span>
          </button>
        )}
      </div>
    </motion.div>
  );
} 