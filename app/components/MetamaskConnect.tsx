"use client";

import React, { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetamask";
import Image from "next/image";
import { Download, RefreshCw, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MetamaskConnect() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const router = useRouter();
  const [isNonAdminWallet, setIsNonAdminWallet] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  useEffect(() => {
    if (hasProvider && wallet.accounts.length > 0) {
      const adminWalletId = process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase();
      if (wallet.accounts[0] === adminWalletId) {
        setIsNonAdminWallet(false);
        router.push("/admin/dashboard");
      } else {
        setIsNonAdminWallet(true);
        setRedirectCountdown(3);
        
        const countdownInterval = setInterval(() => {
          setRedirectCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        const redirectTimer = setTimeout(() => {
          router.push("/home");
        }, 3000);
        
        return () => {
          clearTimeout(redirectTimer);
          clearInterval(countdownInterval);
        };
      }
    }
  }, [hasProvider, wallet.accounts, router]);

  return (
    <>
      {!hasProvider && (
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 group"
        >
          <Download className="w-5 h-5 mr-2 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          <span className="font-medium">Install MetaMask</span>
        </a>
      )}
      
      {hasProvider && wallet.accounts.length === 0 && (
        <button
          disabled={isConnecting}
          onClick={connectMetaMask}
          className="flex items-center justify-center w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <RefreshCw className="w-5 h-5 mr-2 text-emerald-400 animate-spin" />
          ) : (
            <Image
              src="/metamask.png"
              alt="MetaMask"
              width={20}
              height={20}
              className="mr-2"
            />
          )}
          <span className="font-medium">
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </span>
        </button>
      )}
      
      {hasProvider && wallet.accounts.length > 0 && (
        <div className="flex flex-col items-center w-full">
          <div className={`flex items-center justify-center w-full py-3 px-4 ${isNonAdminWallet ? 'bg-gray-800' : 'bg-gray-800'} text-white rounded-lg border ${isNonAdminWallet ? 'border-amber-500/30' : 'border-emerald-600/30'}`}>
            <div className="flex items-center">
              <div className={`w-2 h-2 ${isNonAdminWallet ? 'bg-amber-400' : 'bg-emerald-400'} rounded-full mr-2 animate-pulse`}></div>
              <span className={`text-sm font-medium ${isNonAdminWallet ? 'text-amber-300' : 'text-emerald-300'}`}>
                {`Connected: ${wallet.accounts[0].slice(0, 6)}...${wallet.accounts[0].slice(-4)}`}
              </span>
            </div>
          </div>
          
          {isNonAdminWallet && (
            <div className="mt-3 w-full">
              <div className="animate-pulse bg-amber-600/20 text-amber-100 px-4 py-3 rounded-lg border border-amber-500/30 text-center">
                <div className="flex items-center justify-center mb-1">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-400" />
                  <span className="font-semibold">Access Restricted</span>
                </div>
                <p className="text-sm">This wallet does not have admin privileges.</p>
                <p className="text-sm mt-1">
                  Redirecting to home in <span className="font-bold">{redirectCountdown}</span> seconds...
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}