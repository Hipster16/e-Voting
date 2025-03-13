import MetamaskConnect from "@/app/components/MetamaskConnect";
import React from "react";

function AdminLogin() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-700/30 to-blue-900/50">
      <div className="w-[400px] h-min bg-white border-1 flex flex-col justify-between item-center gap-10 p-10 rounded-2xl">
        <p className="text-2xl text-center text-black font-extrabold">
          Connect to metamask
        </p>
        <MetamaskConnect />
      </div>
    </div>
  );
}

export default AdminLogin;
