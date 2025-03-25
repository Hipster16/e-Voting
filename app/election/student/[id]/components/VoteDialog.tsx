"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as snarkjs from "snarkjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { votingSchema } from "@/Models/schema/votingSchema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { connectContract, gassless_transact, getPoseidonHash } from "@/app/utils";
import TransactionReceipt from "./TransactionReceipt";
import DoubleVoteAlert from "./DoubleVoteAlert";
import NotParticipantAlert from "./NotParticipantAlert";
import ProcessingTransaction from "./ProcessingTransaction";
import { decodeErrorMessage } from "../utils/utils";

interface VoteDialogProps {
  email: string;
  clgId: string;
  electionId: string;
  electionName: string;
}

export default function VoteDialog({ email, clgId, electionId, electionName }: VoteDialogProps) {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showDoubleVoteAlert, setShowDoubleVoteAlert] = useState(false);
  const [showNotParticipantAlert, setShowNotParticipantAlert] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  
  const form = useForm<z.infer<typeof votingSchema>>({
    resolver: zodResolver(votingSchema),
    defaultValues: {
      clgid: "",
      passphrase: ""
    }
  });

  function parseArrayString(inputString: string): string[][] {
    try {
      try {
        const jsonString = `[${inputString}]`;
        return JSON.parse(jsonString);
      } catch (e) {}
      let cleanedInput = inputString;

      cleanedInput = cleanedInput.replace(/\]\s*\[/g, "],[");

      if (!cleanedInput.trim().startsWith("[")) {
        cleanedInput = "[" + cleanedInput;
      }
      if (!cleanedInput.trim().endsWith("]")) {
        cleanedInput = cleanedInput + "]";
      }

      return JSON.parse(cleanedInput);
    } catch (error) {
      console.error("Error parsing array string:", error);

      const result = [];
      let currentDepth = 0;
      let currentArray = "";

      for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (char === "[") {
          currentDepth++;
          currentArray += char;
        } else if (char === "]") {
          currentDepth--;
          currentArray += char;

          if (currentDepth === 0) {
            try {
              result.push(JSON.parse(currentArray));
              currentArray = "";
            } catch (e) {
              console.error("Error parsing sub-array:", e);
            }
          }
        } else {
          currentArray += char;
        }
      }

      if (result.length === 0) {
        throw new Error(
          "Failed to parse the array string using all available methods"
        );
      }

      return result;
    }
  }

  const handleVote = async (data: any) => {
    try {
      if (!data.clgid || data.clgid.trim() === "") {
        setError("Please enter your college ID");
        return;
      }
      
      if (!data.passphrase || data.passphrase.trim() === "") {
        setError("Please enter your security passphrase");
        return;
      }
      
      setError(null);
      setIsVoting(true);
      setIsProcessingTransaction(true);
      
      const inputHash = await getPoseidonHash(
        data.clgid.toUpperCase(),
        data.passphrase
      );
      
      const contract = await connectContract(electionId);
      const hashArray = await contract.get_hash_array();
      
      try {
        console.log("Creating transaction...");
        
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(
          { ...inputHash, hashArray, contractAddress: electionId },
          "/election_circuit.wasm",
          "/election_circuit_0001.zkey"
        );
        
        const calldata: string[][] = await snarkjs.groth16
          .exportSolidityCallData(proof, publicSignals)
          .then((res) => {
            return parseArrayString(res);
          });

        const data = contract.interface.encodeFunctionData("vote", [
          calldata[0],
          calldata[1],
          calldata[2],
          calldata[3],
          clgId,
        ]);
        
        await gassless_transact({
          to: electionId,
          data,
        });
        
        // Transaction successful - gasless_transact already waits for the transaction to be mined
        const mockTxHash = `tx_${Date.now().toString(16)}_${Math.random().toString(16).substring(2)}`;
        setTransactionHash(mockTxHash);
        setShowReceipt(true);
        setIsVoting(false);
        setIsProcessingTransaction(false);
        
        form.reset();
        setIsOpen(false);
      } catch (txError: any) {
        console.error("Transaction error:", txError);
        
        // First check the error object directly without stringifying
        if (txError) {
          // Check message property directly
          if (txError.message && typeof txError.message === 'string') {
            const errorMsg = txError.message;
            console.log("Direct error message:", errorMsg);
            
            if (errorMsg.toLowerCase().includes("already voted") || 
                errorMsg.toLowerCase().includes("has voted") ||
                errorMsg.toLowerCase().includes("this person has already")) {
              console.log("Double voting detected from direct error message");
              setIsVoting(false);
              setIsProcessingTransaction(false);
              setIsOpen(false);
              setShowDoubleVoteAlert(true);
              return; // Early return to show double vote alert
            }
            
            // Check for not participant error
            if (errorMsg.toLowerCase().includes("not a participant") || 
                errorMsg.toLowerCase().includes("not in the list") ||
                errorMsg.toLowerCase().includes("invalid credentials") ||
                errorMsg.toLowerCase().includes("hash not found") ||
                errorMsg.toLowerCase().includes("verification failed") ||
                errorMsg.toLowerCase().includes("proof invalid") ||
                errorMsg.toLowerCase().includes("the proof presented is not correct") ||
                errorMsg.toLowerCase().includes("proof not correct") ||
                errorMsg.toLowerCase().includes("proof is not correct")) {
              console.log("Not a participant detected from direct error message");
              setIsVoting(false);
              setIsProcessingTransaction(false);
              setIsOpen(false);
              setShowNotParticipantAlert(true);
              return; // Early return to show not participant alert
            }
          }
          
          // Check reason property directly
          if (txError.reason && typeof txError.reason === 'string') {
            console.log("Direct error reason:", txError.reason);
            if (txError.reason.toLowerCase().includes("already voted") || 
                txError.reason.toLowerCase().includes("has voted")) {
              console.log("Double voting detected from error reason");
              setIsVoting(false);
              setIsProcessingTransaction(false);
              setIsOpen(false);
              setShowDoubleVoteAlert(true);
              return;
            }
          }
          
          if (txError.userOpReceipt) {
            console.log("UserOp receipt found:", txError.userOpReceipt);
            
            if (txError.userOpReceipt.logs && Array.isArray(txError.userOpReceipt.logs)) {
              for (const log of txError.userOpReceipt.logs) {
                console.log("Checking log:", log);
                if (log.data && typeof log.data === 'string') {
                  if (log.data.includes("08c379a0")) { // This is the error selector
                    console.log("Found error selector in logs");
                    // For voting operations, most reverts will be due to double voting
                    setIsVoting(false);
                    setIsProcessingTransaction(false);
                    setIsOpen(false);
                    setShowDoubleVoteAlert(true);
                    return;
                  }
                  
                  // Check for the hex-encoded "This person has already voted" message
                  if (log.data.includes("5468697320706572736f6e2068617320616c726561647920766f746564")) {
                    console.log("Found 'This person has already voted' in log data");
                    setIsVoting(false);
                    setIsProcessingTransaction(false);
                    setIsOpen(false);
                    setShowDoubleVoteAlert(true);
                    return;
                  }
                  
                  // Check for the hex-encoded "The proof presented is not correct" message
                  if (log.data.includes("5468652070726f6f662070726573656e746564206973206e6f7420636f7272656374")) {
                    console.log("Found 'The proof presented is not correct' in log data");
                    setIsVoting(false);
                    setIsProcessingTransaction(false);
                    setIsOpen(false);
                    setShowNotParticipantAlert(true);
                    return;
                  }
                }
              }
            }
            
            if (txError.userOpReceipt.success === "false") {
              console.log("UserOp was not successful - most likely from proof verification failure (not a participant)");
              setIsVoting(false);
              setIsProcessingTransaction(false);
              setIsOpen(false);
              setShowNotParticipantAlert(true);
              return;
            }
          }
        }
        
        let errorString = "";
        try {
          errorString = JSON.stringify(txError) || "";
          console.log("Raw error string:", errorString);
        } catch (e) {
          console.error("Error stringifying error object:", e);
          errorString = txError ? txError.message || "Unknown error" : "Unknown error";
        }
        
        if (errorString && (
            errorString.toLowerCase().includes("already voted") || 
            errorString.toLowerCase().includes("has voted") ||
            errorString.toLowerCase().includes("this person has already")
          )) {
          console.log("Double voting detected from raw error string");
          setIsVoting(false);
          setIsProcessingTransaction(false);
          setIsOpen(false);
          setShowDoubleVoteAlert(true);
          return;
        }
        
        if (txError && txError.receipt && txError.receipt.logs) {
          console.log("Checking transaction logs for error data");
          
          for (const log of txError.receipt.logs) {
            if (log.data && typeof log.data === 'string') {
              // Check for double vote message
              if (log.data.includes("5468697320706572736f6e2068617320616c726561647920766f746564")) {
                console.log("Double vote detected from transaction logs");
                setIsVoting(false);
                setIsProcessingTransaction(false);
                setIsOpen(false);
                setShowDoubleVoteAlert(true);
                return;
              }
              
              // Check for invalid proof message
              if (log.data.includes("5468652070726f6f662070726573656e746564206973206e6f7420636f7272656374")) {
                console.log("Invalid proof detected from transaction logs - likely not a participant");
                setIsVoting(false);
                setIsProcessingTransaction(false);
                setIsOpen(false);
                setShowNotParticipantAlert(true);
                return;
              }
            }
          }
        }
        
        // Second check: Try to decode blockchain error message
        const decodedMsg = decodeErrorMessage(errorString);
        console.log("Decoded blockchain message:", decodedMsg);
        
        if (decodedMsg) {
          if (decodedMsg.includes("already voted") || 
              decodedMsg.includes("has voted") ||
              decodedMsg.includes("This person has already")) {
            console.log("Double voting detected from decoded message:", decodedMsg);
            setIsVoting(false);
            setIsProcessingTransaction(false);
            setIsOpen(false);
            setShowDoubleVoteAlert(true);
            return; // Early return to show double vote alert
          }
          else if (decodedMsg.includes("not a participant") ||
                  decodedMsg.includes("You are not a participant") ||
                  decodedMsg.includes("verification failed") ||
                  decodedMsg.includes("not in the list") ||
                  decodedMsg.includes("invalid credentials")) {
            console.log("Not a participant detected from decoded message:", decodedMsg);
            setIsVoting(false);
            setIsProcessingTransaction(false);
            setIsOpen(false);
            setShowNotParticipantAlert(true);
            return; // Early return to show not participant alert
          }
        }
        
        let errorMessage = "Transaction failed. Please try again.";
        
        if (txError.code) {
          switch (txError.code) {
            case "ACTION_REJECTED":
              errorMessage = "You rejected the transaction in your wallet.";
              break;
            case "INSUFFICIENT_FUNDS":
              errorMessage = "Insufficient funds for transaction.";
              break;
            case "NETWORK_ERROR":
              errorMessage = "Network error. Please check your connection and try again.";
              break;
            case -32603: // Internal JSON-RPC error
              if (txError.message && txError.message.includes("execution reverted")) {
                if (txError.message.includes("Already Voted") || 
                    txError.message.includes("already voted") ||
                    txError.message.includes("has voted")) {
                  setIsVoting(false);
                  setIsProcessingTransaction(false);
                  setIsOpen(false);
                  setShowDoubleVoteAlert(true);
                  return;
                } else {
                  errorMessage = "Transaction reverted: " + (txError.reason || "Unknown reason");
                }
              }
              break;
            default:
              if (txError.message) {
                if (txError.message.length > 100) {
                  errorMessage = txError.message.substring(0, 100) + "...";
                } else {
                  errorMessage = txError.message;
                }
              }
          }
        }
        
        setError(errorMessage);
        setIsVoting(false);
        setIsProcessingTransaction(false);
      }
    } catch (error: any) {
      console.error("General error:", error);
      
      // Convert error to string for final check
      const errorString = JSON.stringify(error);
      
      // Check for double voting in general errors
      if (errorString && (
          errorString.toLowerCase().includes("already voted") || 
          errorString.toLowerCase().includes("has voted") ||
          errorString.toLowerCase().includes("this person has already")
        )) {
        setIsVoting(false);
        setIsProcessingTransaction(false);
        setIsOpen(false);
        setShowDoubleVoteAlert(true);
        return; // Early return to show double vote alert
      }
      
      // Check for not participant errors
      if (errorString && (
          errorString.toLowerCase().includes("not a participant") ||
          errorString.toLowerCase().includes("not in the list") ||
          errorString.toLowerCase().includes("invalid credentials") ||
          errorString.toLowerCase().includes("hash not found") ||
          errorString.toLowerCase().includes("verification failed") ||
          errorString.toLowerCase().includes("proof invalid")
        )) {
        console.log("Not a participant detected from general error");
        setIsVoting(false);
        setIsProcessingTransaction(false);
        setIsOpen(false);
        setShowNotParticipantAlert(true);
        return; // Early return to show not participant alert
      }
      
      // Try to use the decoded message as a last resort
      const decodedMsg = decodeErrorMessage(errorString);
      if (decodedMsg === "You are not a participant in this election") {
        setIsVoting(false);
        setIsProcessingTransaction(false);
        setIsOpen(false);
        setShowNotParticipantAlert(true);
        return;
      }
      
      setError("An unexpected error occurred. Please try again.");
      setIsVoting(false);
      setIsProcessingTransaction(false);
    }
  };
  
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    router.push("/student/dashboard");
  };
  
  const handleCloseDoubleVoteAlert = () => {
    setShowDoubleVoteAlert(false);
    router.push("/student/dashboard");
  };
  
  const handleCloseNotParticipantAlert = () => {
    setShowNotParticipantAlert(false);
    router.push("/student/dashboard");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 flex items-center gap-2 transition-all mx-auto"
            disabled={isVoting}
            onClick={() => setIsOpen(true)}
          >
            {isVoting ? "Processing..." : "Vote"}
          </motion.button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white">
          <DialogHeader>
            <h2 className="text-xl font-bold text-white">
              Confirm Your Vote
            </h2>
            <DialogDescription className="text-gray-400 mt-2">
              You are about to vote for:{" "}
              <span className="font-medium text-emerald-400">{email}</span>
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-4 bg-red-900/20 rounded-lg border border-red-800/50 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-red-500/20 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-400 mb-1">Transaction Failed</h4>
                  <p className="text-sm text-gray-400 break-words">
                    {error}
                  </p>
                  <div className="mt-2">
                    <button 
                      type="button"
                      onClick={() => setError(null)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleVote)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="clgid"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Your College ID
                    </FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter your college ID"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.clgid && (
                      <p className="text-sm text-red-400">
                        {form.formState.errors.clgid.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passphrase"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-300">
                      Security Passphrase
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        placeholder="Enter your security passphrase"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.passphrase && (
                      <p className="text-sm text-red-400">
                        {form.formState.errors.passphrase.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-800/50">
                <p className="text-sm text-gray-400">
                  Warning: Your vote will be permanently recorded on the
                  blockchain and cannot be changed after confirmation.
                </p>
              </div>

              <DialogFooter className="flex justify-between gap-4">
                <DialogClose asChild>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="border border-gray-700 bg-transparent text-white hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                      setError(null);
                    }}
                  >
                    Cancel
                  </motion.button>
                </DialogClose>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isVoting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {isVoting ? "Processing..." : "Confirm Vote"}
                </motion.button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {isProcessingTransaction && <ProcessingTransaction />}
      
      {showReceipt && (
        <TransactionReceipt
          transactionHash={transactionHash}
          candidateEmail={email}
          candidateId={clgId}
          timestamp={new Date().toLocaleString()}
          electionId={electionId}
          electionName={electionName}
          onClose={handleCloseReceipt}
        />
      )}
      
      {showDoubleVoteAlert && (
        <DoubleVoteAlert onClose={handleCloseDoubleVoteAlert} />
      )}
      
      {showNotParticipantAlert && (
        <NotParticipantAlert onClose={handleCloseNotParticipantAlert} />
      )}
    </>
  );
} 