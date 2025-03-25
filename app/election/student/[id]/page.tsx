import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ElectionContent from "./components/ElectionContent";

const AnimatedBackground = dynamic(
  () => import("@/app/components/background/AnimatedBackground"),
  { ssr: false }
);

export default function ElectionInfo({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-950" />}>
          <AnimatedBackground />
        </Suspense>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <ElectionContent electionId={params.id} />
        </div>
      </main>
    </ErrorBoundary>
  );
}