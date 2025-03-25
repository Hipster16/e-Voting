import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoginCard from "./components/LoginCard";
import BackToHome from "./components/BackToHome"
import FooterCopyright from "./components/FooterCopyright";

const AnimatedBackground = dynamic(
  () => import("@/app/components/background/AnimatedBackground"),
  { ssr: false }
);

export default function StudentLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-gray-950" />}>
        <AnimatedBackground />
      </Suspense>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <BackToHome />
        <LoginCard />
        <FooterCopyright />
      </div>
    </div>
  );
}
