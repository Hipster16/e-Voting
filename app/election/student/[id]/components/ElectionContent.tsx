"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMetaMask } from "@/app/hooks/useMetamask";
import { connectContract } from "@/app/utils";
import { CandidateType } from "@/Models/types/candidates";
import ElectionHeader from "./ElectionHeader";
import CandidatesTable from "./CandidatesTable";
import { AlertCircle } from "lucide-react";

interface ElectionContentProps {
  electionId: string;
}

export default function ElectionContent({ electionId }: ElectionContentProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [data, setData] = useState<CandidateType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { wallet } = useMetaMask();

  const getElectionDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const contract = await connectContract(electionId);
      
      const _name = await contract.name();
      const status = await contract.status();
      
      if (!status) {
        router.push("/student/login");
        return;
      }
      
      setName(_name);
      
      // Get list of candidates
      const response = await contract.get_All_candidates();
      const value: CandidateType[] = response.map((el: any) => ({
        email: el[0],
        clgid: el[1],
      }));
      
      setData(value);
      
    } catch (error: any) {
      console.error("Failed to fetch election details:", error);
      setError(error.message || "Failed to load election details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      !wallet.accounts[0] ||
      wallet.accounts.length > 1 ||
      wallet.accounts[0] === process.env.NEXT_PUBLIC_ADMIN_ADDRESS
    ) {
      router.push("/");
      return;
    }
    getElectionDetails();
  }, [wallet.accounts, router]);

  if (error) {
    const alreadyVotedError = error.toLowerCase().includes("already voted") || 
                              error.toLowerCase().includes("have voted");
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-900/70 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {alreadyVotedError ? "Already Voted" : "Error Loading Election"}
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          
          <div className="flex gap-4 justify-center">
            {alreadyVotedError ? (
              <button
                onClick={() => router.push("/student/dashboard")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={getElectionDetails}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            )}
            
            <button
              onClick={() => router.push("/")}
              className="border border-gray-700 bg-transparent text-white hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-md border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="p-0.5">
        <div className="h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 rounded-t-xl"></div>
      </div>

      <div className="p-8">
        <ElectionHeader electionId={electionId} name={name} isLoading={isLoading} />
        <div className="pt-6">
          <CandidatesTable 
            data={data || []} 
            isLoading={isLoading} 
            electionId={electionId} 
            electionName={name}
          />
        </div>
      </div>
    </motion.div>
  );
} 