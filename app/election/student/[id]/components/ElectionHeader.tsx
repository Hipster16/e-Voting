"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface ElectionHeaderProps {
  electionId: string;
  name: string;
  isLoading: boolean;
}

export default function ElectionHeader({ electionId, name, isLoading }: ElectionHeaderProps) {
  return (
    <div className="text-center pb-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-6"
      >
        <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium">
          Election ID: {electionId.slice(0, 7).concat("...")}
        </div>
        <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium">
          Election Name: {name.length <= 7 ? name : name.slice(0, 7).concat("...")}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-3 mb-4"
      >
        <div className="p-2 rounded-full bg-emerald-500/10">
          <Shield className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
          {isLoading ? "Loading election details..." : "Election Voting Portal"}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-sm max-w-2xl mx-auto"
      >
        Select a candidate below to cast your vote. Your vote is secure and confidential through blockchain technology.
      </motion.p>
    </div>
  );
} 