import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ethers } from "ethers";

export function decodeErrorMessage(errorData: any): string | null {
  try {
    console.log("Attempting to decode error:", errorData);

    // Handle empty error objects
    if (!errorData || (typeof errorData === 'object' && Object.keys(errorData).length === 0)) {
      console.log("Empty error object detected - defaulting to 'not a participant' error");
      // For empty objects, default to "not a participant" since most proof verification failures 
      // result in an empty error object in the blockchain response
      return "You are not a participant in this election";
    }

    if (typeof errorData === "string") {
      const lowerCaseError = errorData.toLowerCase();
      // Check for double vote indicators
      if (
        lowerCaseError.includes("this person has already voted") ||
        lowerCaseError.includes("already voted") ||
        lowerCaseError.includes("has voted") ||
        lowerCaseError.includes("double vote")
      ) {
        console.log("Found double vote indicator in raw error message");
        return "This person has already voted";
      }
      // Check for non-participant indicators
      else if (
        lowerCaseError.includes("not a participant") ||
        lowerCaseError.includes("not in the list") ||
        lowerCaseError.includes("invalid credentials") ||
        lowerCaseError.includes("hash not found") ||
        lowerCaseError.includes("verification failed") ||
        lowerCaseError.includes("proof invalid") ||
        lowerCaseError.includes("the proof presented is not correct") ||
        lowerCaseError.includes("proof not correct") ||
        lowerCaseError.includes("proof is not correct")
      ) {
        console.log("Found non-participant indicator in raw error message");
        return "You are not a participant in this election";
      }
      else {
        console.log("No direct match in error string");
      }
    }

    let dataHex: string | null = null;

    if (typeof errorData === "string") {
      const dataMatch = errorData.match(/"data":"(0x[0-9a-f]+)"/i);
      if (dataMatch) dataHex = dataMatch[1];
    } else if (errorData?.data) {
      dataHex = errorData.data;
    }

    if (!dataHex) {
      console.log("No data hex found in error");
      // For voting operations without specific error data, default to "not a participant"
      // since proof verification failures are more common than double voting
      return "You are not a participant in this election";
    }
    
    console.log("Extracted data hex:", dataHex);

    // Look for Solidity revert error signature (0x08c379a0)
    if (dataHex.startsWith("0x08c379a0")) {
      try {
        // Check for specific known error messages by their hex signatures before decoding
        if (dataHex.includes("5468652070726f6f662070726573656e746564206973206e6f7420636f7272656374")) {
          console.log("Found 'The proof presented is not correct' in hex data");
          return "You are not a participant in this election";
        }
        
        const decodedMessage = ethers.toUtf8String(
          "0x" + dataHex.substring(10) // Skip selector bytes
        );
        console.log("Decoded message from hex:", decodedMessage);
        
        // Check for non-participant messages in the decoded hex
        const lowerCaseDecoded = decodedMessage.toLowerCase().trim();
        if (
          lowerCaseDecoded.includes("not a participant") ||
          lowerCaseDecoded.includes("not in the list") ||
          lowerCaseDecoded.includes("invalid credentials") ||
          lowerCaseDecoded.includes("hash not found") ||
          lowerCaseDecoded.includes("verification failed") ||
          lowerCaseDecoded.includes("proof invalid") ||
          lowerCaseDecoded.includes("the proof presented is not correct") ||
          lowerCaseDecoded.includes("proof not correct") ||
          lowerCaseDecoded.includes("proof is not correct")
        ) {
          return "You are not a participant in this election";
        }
        
        return decodedMessage.trim();
      } catch (e) {
        console.error("Error decoding hex string:", e);
      }
    }

    if (errorData.logs && Array.isArray(errorData.logs)) {
      for (const log of errorData.logs) {
        if (log.data && typeof log.data === "string") {
          // Check for specific hex patterns before attempting to decode
          if (log.data.includes("5468652070726f6f662070726573656e746564206973206e6f7420636f7272656374")) {
            console.log("Found 'The proof presented is not correct' in logs");
            return "You are not a participant in this election";
          }
          
          try {
            const decodedLog = ethers.toUtf8String(log.data);
            if (decodedLog.includes("This person has already voted")) {
              console.log("Found 'This person has already voted' in logs");
              return "This person has already voted";
            }
            // Check for non-participant messages in logs
            if (
              decodedLog.toLowerCase().includes("not a participant") ||
              decodedLog.toLowerCase().includes("not in the list") ||
              decodedLog.toLowerCase().includes("invalid credentials") ||
              decodedLog.toLowerCase().includes("hash not found") ||
              decodedLog.toLowerCase().includes("verification failed") ||
              decodedLog.toLowerCase().includes("proof invalid")
            ) {
              console.log("Found 'not a participant' indicator in logs");
              return "You are not a participant in this election";
            }
          } catch (e) {
            console.error("Error decoding log data:", e);
          }
        }
      }
    }

    // Check for ZK proof verification failures which often indicate non-participants
    if (
      (typeof errorData === "string" && 
       (errorData.includes("proof") || errorData.includes("verification"))) || 
      (errorData?.message && 
       (errorData.message.includes("proof") || errorData.message.includes("verification")))
    ) {
      console.log("ZK proof verification failure detected - likely not a participant");
      return "You are not a participant in this election";
    }

    // Default error handling when no specific error is detected
    console.log("No specific error detected - defaulting to 'not a participant' error");
    return "You are not a participant in this election";
  } catch (error) {
    console.error("Error decoding blockchain error:", error);
    // For unhandled exceptions, default to not participant error
    return "You are not a participant in this election";
  }
}

import ElectionContent from "./components/ElectionContent";

const AnimatedBackground = dynamic(
  () => import("@/app/components/background/AnimatedBackground"),
  { ssr: false }
);

export default function ElectionInfo({ params }: { params: { id: string } }) {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-950" />}>
          <AnimatedBackground />
        </Suspense>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <ElectionContent electionId={params.id} />
        </div>
      </main>
    </ErrorBoundary>
  );
}