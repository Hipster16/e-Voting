'use client'
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import auth from "@/firebase/auth";
import { motion } from "framer-motion";
import { UserCircle, Users, UserPlus, LogIn, ChevronRight } from "lucide-react";

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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };

  if (!loggedIn) {
    return (
      <div className="w-full max-w-md mx-auto">
        {!visible ? (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-base font-medium py-3 px-6 rounded-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={handleClick}
          >
            <UserCircle className="w-5 h-5 mr-1" />
            <span>Get Started</span>
          </motion.button>
        ) : (
          <div className="w-full flex flex-col sm:flex-row justify-between gap-3">
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="flex-1 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-base font-medium py-3 px-5 rounded-lg shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center"
              onClick={handleAdminLogin}
            >
              <Users className="w-4 h-4 mr-2" />
              <span>Admin</span>
            </motion.button>
            
            <Popover>
              <PopoverTrigger asChild>
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-base font-medium py-3 px-5 rounded-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center"
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  <span>Voter</span>
                  <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                </motion.button>
              </PopoverTrigger>
              
              <PopoverContent className="p-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl w-auto">
                <div className="flex flex-col gap-2 min-w-[180px]">
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-gradient-to-r from-emerald-600/90 to-emerald-500/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 flex items-center"
                    onClick={handleStudentSignin}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span>Register</span>
                  </motion.button>
                  
                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-gradient-to-r from-teal-600/90 to-teal-500/90 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:from-teal-500 hover:to-teal-400 transition-all duration-300 flex items-center"
                    onClick={handleStudentLogin}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    <span>Login</span>
                  </motion.button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    );
  }
  
  return null;
}