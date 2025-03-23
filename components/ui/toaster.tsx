"use client";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-gray-800 border border-gray-700 text-white",
          success: "bg-emerald-800 border-emerald-700",
          error: "bg-red-800 border-red-700",
          warning: "bg-amber-800 border-amber-700",
          info: "bg-blue-800 border-blue-700",
        },
        duration: 4000,
      }}
    />
  );
} 