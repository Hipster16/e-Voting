"use client";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CandidateType } from "@/Models/types/candidates";
import Loader from "@/app/components/LoadingSpinner";
import VoteDialog from "./VoteDialog";
import { AlertCircle } from "lucide-react";

interface CandidatesTableProps {
  data: CandidateType[];
  isLoading: boolean;
  electionId: string;
  electionName: string;
}

export default function CandidatesTable({ data, isLoading, electionId, electionName }: CandidatesTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader color="emerald-500" size="12" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg overflow-hidden border border-gray-700/50 shadow-lg"
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-800/50">
              <TableHead className="text-center font-medium text-gray-300 py-4">
                Candidate Email
              </TableHead>
              <TableHead className="text-center font-medium text-gray-300 py-4">
                ID
              </TableHead>
              <TableHead className="text-center font-medium text-gray-300 py-4">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((el, index) => (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-800/30 transition-colors ${
                    index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/10"
                  }`}
                >
                  <TableCell className="text-center py-4 px-6">
                    <span className="font-medium text-gray-200">{el.email}</span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full font-mono text-sm">
                      {el.clgid || "ID not available"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    {/*<div className="text-xs text-gray-500 mb-1">Debug - ID: {JSON.stringify(el)}</div>*/}
                    <VoteDialog 
                      email={el.email} 
                      clgId={el.clgid} 
                      electionId={electionId} 
                      electionName={electionName}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-gray-400"
                >
                  No candidates found for this election.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-emerald-900/20 rounded-lg p-6 border border-emerald-800/50"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-emerald-500/10">
            <AlertCircle className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-medium text-lg text-emerald-300">
              Important Information
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Your vote is permanently recorded on the blockchain and
              cannot be changed once submitted. Please ensure
              you&apos;ve selected the right candidate before
              confirming your vote.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
} 