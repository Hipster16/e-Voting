'use client'
import React from 'react'
import { useMetaMask } from '../hooks/useMetamask';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MetamaskConnect() {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  const router = useRouter()
  if(hasProvider && wallet.accounts.length > 0 ) {
    if(wallet.accounts[0] == process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()){
      console.log(wallet.accounts[0])
      router.push("/admin/dashboard");
    }
    else{

    }
  }
  
  return (
    <>
      {!hasProvider && (
        <a
          href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?pli=1"
          className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-black"
        >
          Install Metamask
        </a>
      )}
      {hasProvider && wallet.accounts.length == 0 && (
        <div className='w-full'>
          <button
            disabled={isConnecting}
            onClick={connectMetaMask}
            className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-black w-full flex justify-evenly"
          >
            <Image
              src="/metamask.png"
              alt=""
              width={20}
              height={20}
              className="m-1 mr-2"
            />
            Connect Metamask
          </button>
        </div>
      )}
      {hasProvider && wallet.accounts.length > 0 && (
        <div className='bg-red-600 text-sm font-extrabold py-4 px-10 rounded-full hover:bg-black w-full flex justify-evenly'>
          Signed in account is not admin... disconnect and reconnect
        </div>
      )}
    </>
  )
}
