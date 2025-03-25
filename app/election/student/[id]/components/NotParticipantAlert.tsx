"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface NotParticipantAlertProps {
  onClose: () => void;
}

export default function NotParticipantAlert({ onClose }: NotParticipantAlertProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 border border-red-800 rounded-lg p-6 max-w-md w-full mx-auto shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Not a Participant</h2>
          
          <p className="text-gray-300 mb-6">
            You are not registered as a participant in this election. Voting requires valid credentials that match the registered participant list.
          </p>
          
          <div className="space-y-3 w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              Return to Dashboard
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="w-full py-3 border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-lg font-medium transition-colors"
            >
              Try Again
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 