"use client";
import React from "react";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useMetaMask } from "@/app/hooks/useMetamask";
import { toastNotify } from "@/app/utils/toast";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const { wallet, disconnectMetaMask } = useMetaMask();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await disconnectMetaMask();
      toastNotify.success("Logged out successfully");
      router.push("/student/login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toastNotify.error(errorMessage);
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <Link href="/home" className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors">
        <Home size={20} />
        <span className="font-medium">Home</span>
      </Link>
      
      {wallet && wallet.accounts.length > 0 && (
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center rounded-full bg-gray-800/80 px-4 py-1.5 border border-gray-700/50">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-300 font-medium" title={wallet.accounts[0]}>
              {wallet.accounts[0].slice(0, 6)}...{wallet.accounts[0].slice(-4)}
            </span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Logout"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
} 