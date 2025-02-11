'use client'
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import auth from "@/firebase/auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LoginButtons() {
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    setVisible(true);
  };

  const handleAdminLogin = () => {
    router.push("/admin/login");
  };

  const handleStudentLogin = () => {
    router.push("/student/login");
  };

  const handleStudentSignin = () => {
    router.push("/student/signin");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth.authState, (user) => {
      setLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  if (!loggedIn) {
    return (
      <div className="w-full max-w-md mx-auto ">
        {!visible ? (
          <button
            className="w-full bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={handleClick}
          >
            Login
          </button>
        ) : (
          <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
            <button
              className="flex-1 bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleAdminLogin}
            >
              Admin
            </button>
            <Popover>
              <PopoverTrigger>
            <button
              className="flex-1 bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Voter
            </button>
            </PopoverTrigger>
            <PopoverContent className="bg-slate-600 border-0 flex flex-col gap-2 max-w-[200px]">
            <button
              className="flex-1 bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={handleStudentSignin}
            >
              Register
            </button>
            <button
              className="flex-1 bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              onClick={handleStudentLogin}
            >
              Login
            </button>
            </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    );
  }
}