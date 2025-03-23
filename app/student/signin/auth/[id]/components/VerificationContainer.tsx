"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "@firebase/firestore";
import db from "@/firebase/firestore";
import { toastNotify } from "@/app/utils/toast";

import AnimatedBackground from "./AnimatedBackground";
import BackButton from "./BackButton";
import VerificationForm from "./VerificationForm";
import FooterCopyright from "./FooterCopyright";

interface VerificationContainerProps {
  userId: string;
}

export default function VerificationContainer({ userId }: VerificationContainerProps) {
  const [isDocumentValid, setIsDocumentValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkDocumentExists = async () => {
      try {
        const docRef = doc(db, "Voters", userId);
        const userDocument = await getDoc(docRef);
        
        if (!userDocument.exists()) {
          toastNotify.error("Invalid verification link. Please register again.");
          setIsDocumentValid(false);
          setTimeout(() => router.push("/student/signin"), 2000);
          return;
        }
        
        if (userDocument.data()?.verified) {
          toastNotify.info("Your account is already verified. Please login.");
          setIsDocumentValid(false);
          setTimeout(() => router.push("/student/login"), 2000);
          return;
        }
        
        setIsDocumentValid(true);
      } catch (error) {
        console.error("Error checking verification status:", error);
        toastNotify.error("Error checking verification status");
        setIsDocumentValid(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkDocumentExists();
  }, [userId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <BackButton />
        
        {isDocumentValid && (
          <>
            <VerificationForm userId={userId} />
            <FooterCopyright />
          </>
        )}
      </div>
    </div>
  );
} 