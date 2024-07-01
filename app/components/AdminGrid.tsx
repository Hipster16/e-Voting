"use client";
import { ChangeEvent, useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { connectContract } from "../utils";

type electionData = {
  electionName: string;
  electionDesc: string;
  id: number
}

export default function ElectionGrid() {
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setdata] = useState<electionData[]>([])
  const getAll = async () => {
    const contract = await connectContract();
    const transaction = await contract.getAllElection()
    let elections =transaction.map((election:any, index:number) => {
      return {
        electionName: election[1],
        electionDesc: election[2],
        id: Number(election[0])
      };
    })
    elections.pop()
    setdata(elections);
    setDataFetched(true)
  }
  const [Search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (elem: electionData) => {
    if(!Search) {
      return elem
    }
    if (Search && elem.electionName.includes(Search)) {
      return elem;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if(!dataFetched) getAll();
  })

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="search"
        placeholder="Search"
        className="w-[500px] bg-slate-50/25 px-4 py-4 text-black rounded-full focus:bg-white"
        onChange={handleSearch}
      />

      {data.filter(handleFilter).length == 0 ? (
        <p className="p-20 text-center text-2xl">No Elections found</p>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-[repeat(auto-fill,375px)] gap-[50px] justify-center">
          {data.filter(handleFilter).map((election) => {
            return (
              <AdminCard
                eletionid={election.id}
                name={election.electionName}
                desc={election.electionDesc}
                endDate="Wed Nov 2, 2024"
                pagelink="/admin/dashboard"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
