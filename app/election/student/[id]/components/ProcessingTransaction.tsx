"use client";
import { Loader2 } from "lucide-react";

export default function ProcessingTransaction() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-lg p-6 max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">Processing Your Vote</h3>
        <p className="text-sm text-gray-400">
          Your vote is being processed securely on the blockchain. This may take a moment.
          Please don&apos;t close this page.
        </p>
      </div>
    </div>
  );
} 