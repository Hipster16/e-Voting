"use client";
import { ChangeEvent, useState } from "react";
import ElectionCard from "./ElectionCard";

export default function ElectionGrid() {
  const [Search, setSearch] = useState("");
  const electionNames = [
    "Election 1",
    "Election 2",
    "Election 3",
    "Election 4",
    "Election 5",
    "Election 6",
  ];

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (elem: string) => {
    if (!Search && elem.includes(Search)) {
      return elem;
    } else {
      return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <input
        type="search"
        placeholder="Search"
        className="w-[500px] bg-slate-50/25 px-4 py-4 text-black rounded-full focus:bg-white"
        onChange={handleSearch}
      />

      {electionNames.filter(handleFilter).length == 0 ? (
        <p className="p-20 text-center text-2xl">No Elections found</p>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-[repeat(auto-fill,375px)] gap-[50px] justify-center">
          {electionNames.filter(handleFilter).map((election) => {
            return (
              <ElectionCard
                key={election}
                name={election}
                desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus culpa amet ab? Sequi quisquam officiis magnam."
                endDate="Wed Nov 2, 2024"
                pagelink="/login/student"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
