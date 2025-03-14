"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connectContract } from "../utils";

type ElectionCardProps = {
  name: string;
  desc: string;
  endDate: string;
  address: string;
};
export default function ElectionCard(props: ElectionCardProps) {
  const [ended, setEnded] = useState(false);
  const checkChars = (str: string) => {
    var max = 120;
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  const checkStatus = async () => {
    const contract = await connectContract(props.address);
    try {
      const response = await contract.status();
      setEnded(!response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="w-[1fr] h-[1fr] min-w-[375px] min-h-[325px] max-w-[300px] bg-blue-300/15 p-6 flex flex-col justify-between rounded-3xl">
      <h1 className="text-2xl font-semibold">{props.name}</h1>
      <p className="text-md font-medium">{checkChars(props.desc)}</p>
      <p className="w-min text-nowrap py-1 px-2 text-sm font-bold rounded-full bg-slate-50/15">
        {props.endDate}
      </p>
      {ended ? (
        <Link
          href={`/result/${props.address}`}
          className="bg-green-600 text-xl text-center font-medium py-2 px-10 rounded-full hover:bg-white hover:text-black"
        >
          View Results
        </Link>
      ) : (
        <Link
          href={`/election/student/${props.address}`}
          className="bg-blue-600 text-xl text-center font-medium py-2 px-10 rounded-full hover:bg-white hover:text-black"
        >
          Vote
        </Link>
      )}
    </div>
  );
}
