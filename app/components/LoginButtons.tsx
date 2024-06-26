"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import auth from "@/firebase/auth";


export default function LoginButtons() {
  const [visible, setVisible] = useState(false);
  const [logggedIn, setLogggedIn] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    setVisible(true);
  };

  const handleAdminLogin = () => {
    router.push("/login/admin");
  };

  const handleStudentLogin = () => {
    router.push("/student/login");
  };

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth.authState, (user) => {
      if (user) {
        setLogggedIn(true);
      } else {
        setLogggedIn(false);
      }
    });
    return unsbscribe;
  });
  if (!logggedIn) {
    return (
      <div className="w-[30%]">
        {!visible ? (
          <button
            className="bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600"
            onClick={handleClick}
          >
            Login
          </button>
        ) : (
          <div className="w-full flex justify-between">
            <button
              className="bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600"
              onClick={handleAdminLogin}
            >
              Admin
            </button>
            <button
              className="bg-blue-600 text-xl font-semibold py-4 px-10 rounded-full hover:bg-white hover:text-blue-600"
              onClick={handleStudentLogin}
            >
              student
            </button>
          </div>
        )}
      </div>
    );
  }
}
