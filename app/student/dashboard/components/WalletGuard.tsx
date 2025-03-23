"use client";
import React, { useEffect, ReactNode } from "react";
import { useMetaMask } from "@/app/hooks/useMetamask";
import { useRouter } from "next/navigation";
import { toastNotify } from "@/app/utils/toast";

interface WalletGuardProps {
  children: ReactNode;
  onError: (error: string) => void;
}

export default function WalletGuard({ children, onError }: WalletGuardProps) {
  const { wallet, isConnecting } = useMetaMask();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && (!wallet || wallet.accounts.length === 0)) {
      const errorMessage = "Wallet not connected, redirecting to login page";
      toastNotify.error(errorMessage);
      onError(errorMessage);
      
      const redirectTimer = setTimeout(() => {
        router.push("/student/login");
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
    
    if (wallet?.accounts?.length > 0) {
      const isAdmin = wallet.accounts[0] === process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase();
      if (isAdmin) {
        toastNotify.warning("Admin accounts should use the admin dashboard");
        
        const adminRedirectTimer = setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
        
        return () => clearTimeout(adminRedirectTimer);
      }
    }
  }, [wallet, isConnecting, router, onError]);

  if (isConnecting) return null;
  
  return <>{children}</>;
} 