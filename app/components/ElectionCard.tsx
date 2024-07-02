"use client";
import { ethers } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import Evoting from "@/artifacts/contracts/Evoting.sol/Evoting.json";

type ElectionCardProps = {
  electionid: number;
  name: string;
  desc: string;
  endDate: string;
};
export default function ElectionCard(props: ElectionCardProps) {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [ended, setEnded] = useState(false);
  const checkChars = (str: string) => {
    var max = 120;
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  const checkStatus = async () => {
    if (!provider) {
      setProvider(
        new ethers.JsonRpcProvider(
          `https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
        )
      );
    }
    if (!provider) return;

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      Evoting.abi,
      provider
    );
    try {
      await contract.getResults(ethers.getBigInt(props.electionid.toString()));
      setEnded(true);
    } catch (e) {
      setEnded(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [provider]);

  return (
    <div className="w-[1fr] h-[1fr] min-w-[375px] min-h-[325px] max-w-[300px] bg-blue-300/15 p-6 flex flex-col justify-between rounded-3xl">
      <h1 className="text-2xl font-semibold">{props.name}</h1>
      <p className="text-md font-medium">{checkChars(props.desc)}</p>
      <p className="w-min text-nowrap py-1 px-2 text-sm font-bold rounded-full bg-slate-50/15">
        {props.endDate}
      </p>
      {ended ? (
        <Link
          href={`/result/${props.electionid}`}
          className="bg-green-600 text-xl text-center font-medium py-2 px-10 rounded-full hover:bg-white hover:text-black"
        >
          View Results
        </Link>
      ) : (
        <Link
          href={`/election/student/${props.electionid}`}
          className="bg-blue-600 text-xl text-center font-medium py-2 px-10 rounded-full hover:bg-white hover:text-black"
        >
          Vote
        </Link>
      )}
    </div>
  );
}
