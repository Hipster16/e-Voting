"use client";
import { ChangeEvent, useEffect, useState } from "react";
import ElectionCard from "./ElectionCard";
import Evoting from "@/artifacts/contracts/Evoting.sol/Evoting.json"
import { ethers } from "ethers";
import { electionData } from "@/Models/types/electionCard";

export default function ElectionGrid() {
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [election, setElection] = useState<electionData[]>([])
  const [Search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (elem: electionData) => {
    if(!Search) {
      return elem
    }
    else if (Search && elem.electionName.includes(Search)) {
      return elem;
    } else {
      return null;
    }
  };

  async function getElections() {
    if(!provider) {
      setProvider(new ethers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`)) 
    }
    if(!provider) return

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      Evoting.abi,
      provider
    )
    try{
      const response = await contract.getAllElection()
      let allelection:electionData[] =response.map((el:any) => {
        return {
          electionName: el[1],
          electionDesc: el[2],
          id: Number(el[0])
        }
      })
      allelection.pop()
      setElection(allelection)
      console.log(allelection)
    }catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getElections()
  }, [provider])

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="search"
        placeholder="Search"
        className="w-[500px] bg-slate-50/25 px-4 py-4 text-black rounded-full focus:bg-white"
        onChange={handleSearch}
      />

      {election.filter(handleFilter).length == 0 ? (
        <p className="p-20 text-center text-2xl">No Elections found</p>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-[repeat(auto-fill,375px)] gap-[50px] justify-center">
          {election.filter(handleFilter).map((el:electionData) => {
            return (
              <ElectionCard
                electionid={el.id}
                name={el.electionName}
                desc={el.electionDesc}
                endDate="Wed Nov 2, 2024"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
