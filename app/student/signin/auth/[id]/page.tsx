"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { authSchema } from "@/Models/schema/authenticationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import db from "@/firebase/firestore";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import { toastNotify } from "@/app/utils/toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, KeyRound } from "lucide-react";

function Auth_Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const checkDocumentExists = async () => {
      try {
        const docRef = doc(db, "Voters", params.id);
        const userDocument = await getDoc(docRef);
        
        if (!userDocument.exists()) {
          toastNotify.error("Invalid verification link. Please register again.");
          setTimeout(() => router.push("/student/signin"), 2000);
          return;
        }
        
        if (userDocument.data()?.verified) {
          toastNotify.info("Your account is already verified. Please login.");
          setTimeout(() => router.push("/student/login"), 2000);
          return;
        }
      } catch (error) {
        toastNotify.error(error, "Error checking verification status");
      }
    };
    
    checkDocumentExists();
  }, [params.id, router]);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    if (maxAttempts <= 0) {
      toastNotify.error("Too many failed attempts. Please register again.");
      setTimeout(() => router.push("/student/signin"), 2000);
      return;
    }
    
    setIsLoading(true);
    const pinToast = toastNotify.loading("Verifying your PIN...");
    
    try {
      const authpin = Number(data.pin);
      const docRef = doc(db, "Voters", params.id);
      const userDocument = await getDoc(docRef);
      
      if (!userDocument.exists()) {
        pinToast.error("Invalid verification ID");
        router.push("/student/signin");
        return;
      }
      
      if (userDocument.data()?.verified) {
        pinToast.success("Account already verified");
        router.push("/student/login");
        return;
      }
      
      if (userDocument.data()?.authpin === authpin) {
        await updateDoc(docRef, {
          verified: true,
        });
        
        pinToast.success("Account verified successfully!");
        setTimeout(() => router.push("/student/login"), 1500);
      } else {
        setMaxAttempts((prev) => prev - 1);
        const attemptsLeft = maxAttempts - 1;
        
        pinToast.error(`Incorrect PIN. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining.`);
        form.reset();
      }
    } catch (error) {
      console.error(`Authentication failed:`, error);
      pinToast.error("Authentication failed");
      
      if (error instanceof Error) {
        if (error.message.includes("permission")) {
          toastNotify.error("You don't have permission to verify this account");
        } else if (error.message.includes("network")) {
          toastNotify.error("Network error. Please check your connection");
        } else {
          toastNotify.error(error);
        }
      } else {
        toastNotify.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute w-full h-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-emerald-500/5 rounded-full"
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.2
              }}
              animate={{ 
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3]
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                filter: "blur(80px)",
              }}
            />
          ))}
        </div>
        
        <div className="absolute w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
              initial={{ opacity: 0.1 + Math.random() * 0.3 }}
              animate={{ opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.4] }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{
                height: `${Math.random() * 30 + 15}%`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(144,_238,_144,_0.03)_1px,_transparent_1px),_linear-gradient(to_right,_rgba(144,_238,_144,_0.03)_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/student/signin" 
            className="group inline-flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Sign Up</span>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-md mx-auto bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-0.5">
            <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-t-xl"></div>
          </div>
          
          <div className="p-8">
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="p-4 rounded-full bg-emerald-500/10">
                <KeyRound className="h-8 w-8 text-emerald-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-emerald-500">
                Verify Your Account
              </h2>
              <p className="text-gray-400 text-sm">
                Please enter the 6-digit PIN sent to your email
              </p>
              
              {maxAttempts < 3 && (
                <div className="mt-3 text-amber-400 text-sm font-medium">
                  {maxAttempts} {maxAttempts === 1 ? 'attempt' : 'attempts'} remaining
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <input
                              type="password"
                              placeholder="••••••"
                              className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                              autoFocus
                              maxLength={6}
                              inputMode="numeric"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mt-2 text-center text-red-400" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl hover:from-emerald-500 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg font-medium shadow-lg shadow-emerald-600/20"
                    disabled={isLoading || !form.getValues("pin") || maxAttempts <= 0}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying
                      </span>
                    ) : (
                      "Verify Account"
                    )}
                  </motion.button>
                </form>
              </Form>
            </motion.div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Link href="/student/signin" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Back to sign up
                </Link>
                <span className="text-gray-600">•</span>
                <button 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  onClick={() => toastNotify.info("PIN resend feature coming soon")}
                >
                  Resend PIN
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-md mx-auto mt-8 text-center text-gray-500 text-xs"
        >
          <p>© {new Date().getFullYear()} e-Voting. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Auth_Page;
