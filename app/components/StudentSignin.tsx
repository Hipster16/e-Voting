"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { StudentSigninSchema } from "@/Models/schema/studentSigninSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { doublePoseidonHash } from "../utils";
import db from "@/firebase/firestore";
import { motion } from "framer-motion";
import { Loader2, Mail, User, CreditCard, KeyRound, AlertCircle } from "lucide-react";
import { toastNotify } from "@/app/utils/toast";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const form = useForm<z.infer<typeof StudentSigninSchema>>({
    resolver: zodResolver(StudentSigninSchema),
    defaultValues: {
      email: "",
      name: "",
      college_id: "",
      passphrase: "",
    },
  });

  // Watch the email field to provide immediate feedback
  const emailValue = form.watch("email");
  
  useEffect(() => {
    if (emailValue && emailValue.includes("@")) {
      if (!emailValue.endsWith("@mbcet.ac.in")) {
        setEmailError("Only MBCET institution emails are allowed (@mbcet.ac.in)");
      } else {
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }, [emailValue]);

  async function onSubmit(values: z.infer<typeof StudentSigninSchema>) {
    // Extra validation for email domain to ensure it's from mbcet.ac.in
    if (!values.email.endsWith("@mbcet.ac.in")) {
      toastNotify.error("Only MBCET institution emails are allowed (@mbcet.ac.in)");
      form.setError("email", { 
        type: "manual", 
        message: "Only MBCET institution emails are allowed (@mbcet.ac.in)" 
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const q = query(
        collection(db, "Voters"),
        where("email", "==", values.email)
      );
      const docs = await getDocs(q);
      
      if (!docs.empty) {
        for (const _doc of docs.docs) {
          if (_doc.data().verified) {
            toastNotify.error("This email has already been registered");
            setLoading(false);
            return;
          } else {
            try {
              await deleteDoc(_doc.ref);
              toastNotify.info("Previous unverified registration found and removed");
            } catch (deleteError) {
              console.error("Error deleting previous registration:", deleteError);
              toastNotify.error(deleteError, "Error processing your registration");
              setLoading(false);
              return;
            }
          }
        }
      }
      
      const authentication_pin = Math.floor(100000 + Math.random() * 900000);
      
      try {
        const _userhash = await doublePoseidonHash(
          values.college_id.toUpperCase(),
          values.passphrase
        );
        
        const new_doc = await addDoc(collection(db, "Voters"), {
          verified: false,
          email: values.email,
          name: values.name,
          clgId: values.college_id.toUpperCase(),
          userhash: _userhash,
          authpin: authentication_pin,
        });
        
        const emailPromise = fetch(`${baseUrl}/api/sendMail`, {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            pin: authentication_pin,
            email: values.email,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Email sending failed: ${errorData.message || response.statusText}`);
          }
          return response;
        });
        
        toastNotify.promise(emailPromise, {
          loading: "Sending verification email...",
          success: "Verification email sent!",
          error: (err) => `Email failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        });
        
        await emailPromise;
        
        router.push(`/student/signin/auth/${new_doc.id}`);
      } catch (hashError) {
        toastNotify.error(hashError, "Error processing your credentials");
        setLoading(false);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Email sending failed")) {
          toastNotify.error("Could not send verification email. Please try again.");
        } else if (error.message.includes("network")) {
          toastNotify.error("Network error. Please check your connection and try again.");
        } else if (error.message.includes("permission")) {
          toastNotify.error("Permission denied. You may not have access to this feature.");
        } else {
          toastNotify.error(error);
        }
      } else {
        toastNotify.error(error);
      }
      
      setLoading(false);
    }
  }

  const inputClasses = "bg-gray-800/50 border border-gray-700/50 text-white rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-colors duration-200";
  const labelClasses = "text-gray-200 font-medium text-sm";
  const iconClasses = "text-gray-400 h-5 w-5 absolute left-3 top-3";

  return (
    <Form {...form}>
      <form
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className={iconClasses} />
                  <input
                    type="email"
                    className={`${inputClasses} pl-10 ${emailError ? "border-red-500 focus:ring-red-500/50 focus:border-red-500/50" : ""}`}
                    placeholder="your-email@mbcet.ac.in"
                    {...field}
                  />
                  {emailError && (
                    <div className="absolute right-3 top-3 text-red-400">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </FormControl>
              {emailError ? (
                <div className="text-red-400 text-xs mt-1 flex items-start gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>{emailError}</span>
                </div>
              ) : (
                <FormMessage className="text-red-400 text-xs" />
              )}
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className={iconClasses} />
                  <input
                    type="text"
                    className={`${inputClasses} pl-10`}
                    placeholder="John Doe"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="college_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>College ID</FormLabel>
              <FormControl>
                <div className="relative">
                  <CreditCard className={iconClasses} />
                  <input
                    type="text"
                    className={`${inputClasses} pl-10`}
                    placeholder="B2XXXXXX"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="passphrase"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={labelClasses}>Secret Passphrase</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className={iconClasses} />
                  <input
                    type="password"
                    className={`${inputClasses} pl-10`}
                    placeholder="Create a secure passphrase"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />
        
        <motion.button
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium py-3 px-4 rounded-lg mt-2 flex items-center justify-center hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading || !!emailError}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Create Account"
          )}
        </motion.button>
      </form>
    </Form>
  );
}
