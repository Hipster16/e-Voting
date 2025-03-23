"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { toastNotify } from "@/app/utils/toast";

import LoadingScreen from "./LoadingScreen";
import AnimatedBackground from "./AnimatedBackground";
import BackToHome from "./BackToHome";
import SigninCard from "./SigninCard";

export default function SigninContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const handleConnectionCheck = async () => {
        try {
          const response = await fetch('/api/health', { 
            method: 'HEAD',
            cache: 'no-cache'
          }).catch(() => ({ ok: false }));
          
          if (!response.ok) {
            toastNotify.warning("Network connectivity issues detected. Some features may be limited.");
          }
        } catch (error) {
          console.error("Health check error:", error);
        }
      };
      
      handleConnectionCheck();
    } catch (error) {
      console.error("Initialization error:", error);
      if (!isLoading) {
        toastNotify.error(error, "There was a problem loading the application");
      }
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
          <AnimatedBackground />

          <div className="container mx-auto px-4 py-8 relative z-10">
            <BackToHome />
            <SigninCard />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
} 