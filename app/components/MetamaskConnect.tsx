'use client'
import React from 'react'

export default function MetamaskConnect() {
    const handleConnect = () => {
        //Logic For metamask connection comes here...
    }
  return (
    <>
      <button className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-black" onClick={handleConnect}>
          Connect Wallet
      </button>
    </>
  )
}
