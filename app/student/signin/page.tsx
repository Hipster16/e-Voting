import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SigninContent = dynamic(
  () => import("./components/SigninContent"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    )
  }
);

export default function StudentSignin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    }>
      <SigninContent />
    </Suspense>
  );
}
