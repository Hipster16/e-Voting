import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AnimatedBackground = dynamic(
  () => import("@/app/components/background/AnimatedBackground"),
  { ssr: false }
);

const DashboardContent = dynamic(
  () => import("./components/DashboardContent"),
  { 
    ssr: false,
    loading: () => (
      <div className="relative z-10 container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    )
  }
);

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-gray-950" />}>
        <AnimatedBackground />
      </Suspense>
      <DashboardContent />
    </main>
  );
}
