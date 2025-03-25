"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMetaMask } from "@/app/hooks/useMetamask";
import { toastNotify } from "@/app/utils/toast";

import DashboardHeader from "./DashboardHeader";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import ElectionContent from "./ElectionContent";
import WalletGuard from "./WalletGuard";

export default function DashboardContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useMetaMask();
  const router = useRouter();
  
  const handleWalletError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  // Check wallet connection
  useEffect(() => {
    if (!wallet || wallet.accounts.length === 0) {
      const errorMessage = "Wallet not connected";
      setError(errorMessage);
      toastNotify.error("Wallet not connected, redirecting to login page");
      
      // Add slight delay before redirecting for better UX
      const redirectTimer = setTimeout(() => {
        router.push("/student/login");
      }, 1500);
      
      return () => clearTimeout(redirectTimer);
    } else {
      // Wallet is connected, clear any previous connection errors
      if (error === "Wallet not connected") {
        setError(null);
      }
    }
  }, [wallet, router, error]);

  const handleRetry = () => {
    setError(null);
    // Force reload the page for a complete refresh
    window.location.reload();
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-8">
      <WalletGuard onError={handleWalletError}>
        <DashboardHeader />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={handleRetry} />
          ) : (
            <ElectionContent />
          )}
        </AnimatePresence>
      </WalletGuard>
    </div>
  );
} 