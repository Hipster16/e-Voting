import React from "react";

function AdminLogin() {
    const handleConnect = () => {
            //Logic For metamask connection comes here...
    }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[400px] h-min bg-white border-1 flex flex-col justify-between item-center gap-10 p-10 rounded-2xl">
        <p className="text-2xl text-center text-black font-extrabold">
          Connect to metamask
        </p>
        <button className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-black" onClick={handleConnect}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
