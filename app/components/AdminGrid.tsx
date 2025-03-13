"use client";
import { ChangeEvent, useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { connectContractFactory } from "../utils";
import { electionData } from "@/Models/types/electionCard";
import { useMetaMask } from "../hooks/useMetamask";
import { useRouter } from "next/navigation";

export default function ElectionGrid() {
  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setdata] = useState<electionData[]>([]);
  const { wallet } = useMetaMask();
  const getAll = async () => {
    const contract = await connectContractFactory();
    const transaction = await contract.get_all_elections();
    let elections: electionData[] = transaction.map(
      (election: any, index: number) => {
        return {
          electionName: election[0],
          electionDesc: election[1],
          id: Number(index),
          election_address: election[2],
        };
      }
    );
    setdata(elections);
    setDataFetched(true);
  };
  const [Search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (elem: electionData) => {
    if (!Search) {
      return elem;
    }
    if (Search && elem.electionName.includes(Search)) {
      return elem;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (
      !wallet.accounts.length ||
      wallet.accounts.length > 1 ||
      wallet.accounts[0] !=
        process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()
    ) {
      router.push("/admin/login");
      return;
    }
    if (!dataFetched) getAll();
  });

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

      {data.filter(handleFilter).length == 0 ? (
        <p className="p-20 text-center text-2xl">No Elections found</p>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-[repeat(auto-fill,375px)] gap-[50px] justify-center">
          {data.filter(handleFilter).map((election, index) => {
            return (
              <AdminCard
                key={index}
                address={election.election_address}
                name={election.electionName}
                desc={election.electionDesc}
                endDate="Wed Nov 2, 2024"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
