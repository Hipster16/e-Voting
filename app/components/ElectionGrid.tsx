"use client";

import { ChangeEvent, useEffect, useState, useCallback } from "react";
import ElectionCard from "./ElectionCard";
import { electionData } from "@/Models/types/electionCard";
import { connectContractFactory } from "../utils";
import { useMetaMask } from "../hooks/useMetamask";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";
import { toastNotify } from "@/app/utils/toast";

export default function ElectionGrid() {
  const [elections, setElections] = useState<electionData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useMetaMask();
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredElections = elections.filter((election) => {
    if (!searchQuery) return true;
    return election.electionName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const fetchElections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!wallet || !wallet.accounts.length) {
        throw new Error("Wallet not connected");
      }

      const contract = await connectContractFactory();
      
      if (!contract) {
        throw new Error("Failed to connect to contract");
      }
      
      const response = await contract.get_all_elections();
      
      const formattedElections: electionData[] = response.map(
        (el: any, index: number) => ({
          electionName: el[0],
          electionDesc: el[1],
          id: Number(index),
          election_address: el[2],
        })
      );
      
      setElections(formattedElections);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching elections:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load elections";
      setError(errorMessage);
      toastNotify.error(errorMessage);
      setIsLoading(false);
    }
  }, [wallet]);

  useEffect(() => {
    if (wallet && wallet.accounts.length > 0) {
      fetchElections();
    }
  }, [wallet, fetchElections]);

  const handleRetry = () => {
    fetchElections();
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Loading elections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center">
        <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-6 max-w-md text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <div className="text-red-400 text-lg mb-2">Error Loading Elections</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-2 px-4 py-2 bg-gray-800 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full max-w-[500px] relative mb-8">
        <input
          type="search"
          placeholder="Search elections..."
          className="w-full bg-slate-50/20 px-4 py-3 text-white rounded-full focus:bg-slate-800/40 shadow-lg transition-all duration-200 ease-in-out border border-gray-700/50"
          onChange={handleSearch}
          value={searchQuery}
        />
        <div className="absolute top-0 left-0 w-full h-full border border-emerald-500/30 rounded-full pointer-events-none"></div>
      </div>
      
      {filteredElections.length === 0 ? (
        <div className="p-16 text-center">
          <p className="text-xl text-gray-400">No elections found</p>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search query
            </p>
          )}
          {!searchQuery && elections.length > 0 && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-emerald-400 hover:text-emerald-300"
            >
              Show all elections
            </button>
          )}
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {filteredElections.map((election, index) => (
            <ElectionCard
              key={index}
              name={election.electionName}
              desc={election.electionDesc}
              address={election.election_address}
              endDate="Wed Nov 2, 2024"
            />
          ))}
        </div>
      )}
    </div>
  );
}