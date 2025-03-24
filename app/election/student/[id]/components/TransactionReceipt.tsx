"use client";
import { motion } from "framer-motion";
import { Check, CheckCircle, Copy } from "lucide-react";
import { useState } from "react";

interface TransactionReceiptProps {
  transactionHash: string;
  candidateEmail: string;
  candidateId: string;
  timestamp: string;
  electionId: string;
  electionName: string;
  onClose: () => void;
}

export default function TransactionReceipt({
  transactionHash,
  candidateEmail,
  candidateId,
  timestamp,
  electionId,
  electionName,
  onClose,
}: TransactionReceiptProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedHash = `${transactionHash.substring(0, 6)}...${transactionHash.substring(transactionHash.length - 4)}`;

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
        className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl max-w-md w-full"
      >
        <div className="p-0.5">
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-t-xl"></div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-emerald-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-white mb-1">Vote Successfully Cast!</h2>
          <p className="text-gray-400 text-center mb-6">Your vote has been securely recorded on the blockchain</p>
          
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Transaction Receipt</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Election</p>
                  <p className="text-sm text-white font-medium">{electionName}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Candidate</p>
                  <p className="text-sm text-white font-medium">{candidateEmail}</p>
                  <p className="text-xs text-gray-400">ID: {candidateId}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Transaction Hash</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-white font-mono">{formattedHash}</p>
                    <button 
                      onClick={() => copyToClipboard(transactionHash)}
                      className="p-1 hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-gray-400" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-sm text-white">{timestamp}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-800/30">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-500/20 p-1 rounded-full flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-emerald-300 font-medium">Your vote is secure and anonymous</p>
                  <p className="text-xs text-gray-400 mt-1">
                    The Zero-Knowledge Proof system ensures your vote remains confidential while verifying its authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-lg transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 