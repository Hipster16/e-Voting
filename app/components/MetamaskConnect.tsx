"use client";
import React from "react";
import { useMetaMask } from "../hooks/useMetamask";
import Image from "next/image";
import { Download, RefreshCw } from "lucide-react";

export default function MetamaskConnect() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

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
        <div className="flex items-center justify-center w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-emerald-600/30">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-300">{`Connected: ${wallet.accounts[0].slice(0, 6)}...${wallet.accounts[0].slice(-4)}`}</span>
          </div>
        </div>
      )}
    </>
  );
}
