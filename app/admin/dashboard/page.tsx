"use client";
import AdminGrid from "@/app/components/AdminGrid";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";

function AdminDashboard() {
  return (
    <main className="max-w-screen min-h-full h-screen p-10 bg-gradient-to-r from-[#12141d] to-[#0f1117]">
      <div className="w-full min-h-full rounded-3xl bg-[#1a1d24] p-10 flex flex-col items-center">
        <Navbar />
        <div className="w-[90%] mt-10 flex justify-between items-center">
          <h1 className="text-5xl font-semibold my-10">Elections</h1>
          <div className="flex gap-4">
            <Link
              href={"/createattest"}
              className="bg-blue-600 text-xl text-center font-semibold py-3 px-5 rounded-full hover:text-black hover:bg-white"
            >
              Create Attestation
            </Link>
            <Link
              href={"/create"}
              className="bg-blue-600 text-xl text-center font-semibold py-3 px-5 rounded-full hover:text-black hover:bg-white"
            >
              Create New Election
            </Link>
          </div>
        </div>
        <AdminGrid />
      </div>
      <div className="p-[30px]" />
    </main>
  );
}

export default AdminDashboard;
