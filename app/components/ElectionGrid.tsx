"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ElectionCard from "./ElectionCard";
import { electionData } from "@/Models/types/electionCard";
import { connectContractFactory } from "../utils";
import { useMetaMask } from "../hooks/useMetamask";
import { useRouter } from "next/navigation";

export default function ElectionGrid() {
  const [election, setElection] = useState<electionData[]>([]);
  const [Search, setSearch] = useState("");
  const { wallet } = useMetaMask();
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (elem: electionData) => {
    if (!Search) {
      return elem;
    } else if (Search && elem.electionName.includes(Search)) {
      return elem;
    } else {
      return null;
    }
  };

  async function getElections() {
    const contract = await connectContractFactory();
    try {
      const response = await contract.get_all_elections();
      let allelection: electionData[] = response.map(
        (el: any, index: number) => {
          console.log(el);
          return {
            electionName: el[0],
            electionDesc: el[1],
            id: Number(index),
            election_address: el[2],
          };
        }
      );
      setElection(allelection);
      console.log(allelection);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (
      !wallet.accounts.length ||
      wallet.accounts.length > 1 ||
      wallet.accounts[0] ==
        process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()
    ) {
      router.push("/home");
      return;
    }
    getElections();
  }, [wallet]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[500px] relative">
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-slate-50/25 px-4 py-4 text-black rounded-full focus:bg-white shadow-lg transition-all duration-200 ease-in-out"
          onChange={handleSearch}
        />
        <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500 rounded-full pointer-events-none animate-pulse"></div>
      </div>
      {election.filter(handleFilter).length == 0 ? (
        <p className="p-20 text-center text-2xl">No Elections found</p>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-[repeat(auto-fill,375px)] gap-[50px] justify-center">
          {election
            .filter(handleFilter)
            .map((el: electionData, index: number) => {
              return (
                <ElectionCard
                  key={index}
                  name={el.electionName}
                  desc={el.electionDesc}
                  address={el.election_address}
                  endDate="Wed Nov 2, 2024"
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
