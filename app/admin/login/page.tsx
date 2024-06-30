"use client"
import MetamaskConnect from "@/app/components/MetamaskConnect";
import auth from "@/firebase/auth";
import React from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

function AdminLogin() {
  const router = useRouter()
  React.useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth.authState, (user) => {
      if (user) {
       router.push("/")
      }
    });
    return unsbscribe
  })
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[400px] h-min bg-white border-1 flex flex-col justify-between item-center gap-10 p-10 rounded-2xl">
        <p className="text-2xl text-center text-black font-extrabold">
          Connect to metamask
        </p>
        <MetamaskConnect/>
      </div>
    </div>
  );
}

export default AdminLogin;
