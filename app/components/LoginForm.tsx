"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMetaMask } from "../hooks/useMetamask";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toastNotify } from "../utils/toast";
import MetamaskConnect from "./MetamaskConnect";

export default function LoginForm() {
  const { wallet, disconnectMetaMask, isConnecting } = useMetaMask();
  const router = useRouter();

  useEffect(() => {
    if (wallet.accounts.length === 0) return;
    
    try {
      if (wallet.accounts[0] === process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
        toastNotify.success("Welcome, Admin!");
        router.push("/admin/dashboard");
      } else if (wallet.accounts[0]) {
        toastNotify.success("Successfully logged in!");
        router.push("/student/dashboard");
      }
    } catch (error) {
      toastNotify.error(error, "Login failed");
      disconnectMetaMask();
    }
  }, [wallet.accounts, router, disconnectMetaMask]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative rounded-lg border border-gray-700/50 bg-gray-800/30 p-4">
          <div className="text-sm text-gray-400 mb-2">Connect your wallet to access your account</div>
          
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-0.5 rounded-lg">
              <MetamaskConnect />
            </div>
          </motion.div>
        </div>
        
        <motion.button
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!wallet.accounts[0]}
          onClick={() => {
            if (wallet.accounts.length === 0) return;
            
            if (wallet.accounts[0] === process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
              router.push("/admin/dashboard");
            } else {
              router.push("/student/dashboard");
            }
          }}
          whileHover={{ scale: !wallet.accounts[0] ? 1 : 1.02 }}
          whileTap={{ scale: !wallet.accounts[0] ? 1 : 0.98 }}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Connecting...
            </>
          ) : wallet.accounts[0] ? (
            "Continue to Dashboard"
          ) : (
            "Connect Wallet to Login"
          )}
        </motion.button>
      </div>
    </div>
  );
}
