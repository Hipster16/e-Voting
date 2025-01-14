"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMetaMask } from "../hooks/useMetamask";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setuser] = useState("none");
  const { wallet, disconnectMetaMask } = useMetaMask();
  const router = useRouter();
  let poppup;

  const handleLogout = () => {
    disconnectMetaMask()
    router.push("/");
  };

  if (user === "student") {
    poppup = (
      <Popover>
        <PopoverTrigger>
          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            hello{" "}
            <span className="text-blue-600 font-semibold">
              {wallet.userName}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-gray-800 border border-slate-700 rounded-lg mt-2">
          <button
            className="w-full text-white text-center py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </PopoverContent>
      </Popover>
    );
  } else if (user === "admin") {
    poppup = (
      <Popover>
        <PopoverTrigger>
          <div className="text-gray-400 hover:text-white transition-colors">
            hello <span className="text-blue-600 font-semibold">admin</span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-gray-800 border border-slate-700 rounded-lg mt-2">
          <button
            className="w-full text-white text-center py-2 px-4 hover:bg-blue-600 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </PopoverContent>
      </Popover>
    );
  } else {
    poppup = (
      <Popover>
        <PopoverTrigger>
          <div className="text-gray-400 hover:text-white cursor-pointer transition-colors">
            Login
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-48 bg-gray-800 border border-slate-700 rounded-lg mt-2 p-2 space-y-2">
          <Link
            href={"/admin/login"}
            className="block text-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Admin
          </Link>
          <Link
            href={"/student/login"}
            className="block text-center text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Student
          </Link>
        </PopoverContent>
      </Popover>
    );
  }

  useEffect(() => {
    if (wallet.accounts[0] && wallet.userName) {
      setuser("student")
    }
    else if (wallet.accounts[0] == process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
      setuser("admin")
    }
    else {
      setuser("none")
    }
  }, [wallet]);

  return (
    <div className="w-full flex justify-between items-center px-4 py-3 mt-6 bg-gradient-to-r from-[#12141d] to-[#0f1117] rounded-xl border-b border-gray-700 shadow-lg">
      <h1
        className="text-2xl font-semibold text-white cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-blue-600">e</span>Voting
      </h1>
      <div>{poppup}</div>
    </div>
  );
}
