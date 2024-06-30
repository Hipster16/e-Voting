"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import auth from "@/firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetamask";
import { formatAddress } from "../utils";

export default function Navbar() {
  const [user, setuser] = useState("none");
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  var poppup;

  const handleLogout = () => {
    signOut(auth.authState)
  }

  if (user == "student") {
    poppup = (
      <Popover>
        <PopoverTrigger>
          <div className="border-white border-2 text-black py-4 px-10 rounded-full bg-white cursor-pointer">
            hello <span className="text-blue-600 font-semibold">{auth.authState.currentUser?.email}</span> 
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-60 h-full bg-white border-2 border-slate-100/45 text-white m-5 ">
          <div className="flex flex-col justify-between h-full gap-6">
            <button
              className="bg-blue-600 text-xl text-center font-semibold py-4 px-10 rounded-full hover:bg-black"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
  else if(user == "admin") {
    poppup = (
      <div className="border-white border-2 text-black py-4 px-10 rounded-full bg-white">
            hello <span className="text-blue-600 font-semibold">admin</span> 
      </div>
    )
  }
    else{
      poppup = (
        <Popover>
          <PopoverTrigger>
            <div className="bg-blue-600 font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600 cursor-pointer">
              Login
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-60 h-full bg-white border-2 border-slate-100/45 text-white m-5 ">
            <div className="flex flex-col justify-between h-full gap-6">
              <Link
                href={"/admin/login"}
                className="bg-blue-600 text-xl text-center font-semibold py-4 px-10 rounded-full hover:bg-black"
              >
                Admin
              </Link>
              <Link
                href={"/student/login"}
                className="bg-blue-600 text-xl text-center font-semibold py-4 px-10 rounded-full hover:bg-black"
              >
                student
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      )
    }


  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth.authState, (user) => {
      if (user) {
        setuser("student")
      }
       else {
        if(wallet.accounts[0] == process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
          setuser("admin")
        }
        else{
        setuser("none")
        }
      }
    });
    return unsbscribe
  });
   

  return (
    <div className="w-full h-[100px] bg-slate-100/15 text-white flex justify-between items-center p-10 rounded-full border-1">
      <h1 className="font-semibold text-xl">
        <span className="text-blue-600">e</span>Voting
      </h1>
      {poppup}
    </div>
  );
}
