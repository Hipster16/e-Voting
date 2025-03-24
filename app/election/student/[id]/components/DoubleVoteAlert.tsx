"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface DoubleVoteAlertProps {
  onClose: () => void;
}

export default function DoubleVoteAlert({ onClose }: DoubleVoteAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full"
      >
        <div className="p-0.5">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 rounded-t-xl"></div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-1">Double Voting Detected</h2>
          <p className="text-gray-400 text-center mb-6">Our zero-knowledge proof system has detected that you&apos;ve already cast a vote in this election.</p>
          
          <div className="bg-red-900/20 rounded-lg p-6 border border-red-800/30">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-red-300">Why am I seeing this?</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Each student is allowed to vote only once in an election. The Zero-Knowledge Proof system verifies your identity while maintaining anonymity.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-red-300">What should I do?</h3>
                <p className="text-xs text-gray-400 mt-1">
                  If you believe this is an error, please contact the election administrator with your student ID.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 