"use client";
import React, { useState } from "react";
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

function Auth_Page({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    try {
      const authpin = Number(data.pin);
      const docRef = doc(db, "Voters", params.id);
      const userDocument = await getDoc(docRef);
      if (!userDocument.exists()) {
        router.push("/");
      }
      if (userDocument.data()?.authpin == authpin) {
        await updateDoc(docRef, {
          verified: true,
        });
      }
      router.push("/student/login");
    } catch (e) {
      console.log(`Auth fallied ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
      <div className="w-full max-w-md p-8 backdrop-blur-sm bg-gray-900/80 rounded-2xl shadow-xl border border-gray-800/50">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-indigo-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-400"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          2FA Authentication
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Please enter your PIN to Verify
        </p>

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
                        className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-2 text-center text-red-400" />
                  </div>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full py-4 px-6 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg font-medium"
              disabled={isLoading || !form.getValues("pin")}
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
                "Authenticate"
              )}
            </button>
          </form>
        </Form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            Forgot your PIN?{" "}
            <span className="text-indigo-400 cursor-pointer hover:underline transition-colors">
              Contact support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth_Page;
