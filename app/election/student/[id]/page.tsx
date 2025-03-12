"use client";
import Navbar from "@/app/components/Navbar";
import * as snarkjs from "snarkjs";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useRouter } from "next/navigation";
import { useMetaMask } from "@/app/hooks/useMetamask";
import {
  connectContract,
  gassless_transact,
  getPoseidonHash,
} from "@/app/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { votingSchema } from "@/Models/schema/votingSchema";

function ElectionInfo({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const { wallet } = useMetaMask();

  const getElectionDetails = async () => {
    setIsLoading(true);
    try {
      const contract = await connectContract(params.id);
      const _name = await contract.name();
      const status = await contract.status();
      if (!status) {
        router.push("/");
      }
      setName(_name);
      const response = await contract.get_All_candidates();
      const value = response.map((el: any) => {
        return {
          email: el[0],
          clgId: el[1],
        };
      });
      setData(value);
    } catch (error) {
      console.error("Failed to fetch election details:", error);
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
    }
    getElectionDetails();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Navbar />

        <div className="mt-8 bg-slate-800/50 border border-slate-700 shadow-xl rounded-xl p-6">
          <div className="text-center pb-6">
            <div className="mb-2 mx-auto inline-block px-3 py-1 text-blue-400 border border-blue-400 rounded-full text-sm">
              Election ID: {params.id.slice(0, 7).concat("...")}
            </div>
            <div className="mb-2 mx-auto inline-block px-3 py-1 text-blue-400 border border-blue-400 rounded-full text-sm">
              Election Name:{" "}
              {name.length <= 7 ? name : name.slice(0, 7).concat("...")}
            </div>
            <h1 className="text-4xl font-bold text-white">
              {isLoading
                ? "Loading election details..."
                : data?.name || "Election Voting Portal"}
            </h1>
            <p className="text-lg text-slate-300 mt-4 max-w-3xl mx-auto">
              {data?.desc ||
                "Select a candidate below to cast your vote. Your vote is secure and confidential through blockchain technology."}
            </p>
          </div>

          <div className="pt-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="rounded-lg overflow-hidden border border-slate-700 shadow-lg">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="bg-slate-700">
                        <TableHead className="text-center font-bold text-white w-1/2 py-4">
                          Candidate Email
                        </TableHead>
                        <TableHead className="text-center font-bold text-white w-1/4 py-4">
                          ID
                        </TableHead>
                        <TableHead className="text-center font-bold text-white w-1/4 py-4">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data && data.length > 0 ? (
                        data.map((el: any, index: number) => (
                          <Row
                            key={index}
                            email={el.email}
                            clgId={el.clgId}
                            data={data}
                            id={params.id}
                            isEven={index % 2 === 0}
                          />
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-center py-8 text-slate-400"
                          >
                            No candidates found for this election.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-8 bg-blue-900/20 rounded-lg p-6 border border-blue-800">
                  <div className="flex items-start gap-4">
                    <div className="text-blue-400 flex-shrink-0 mt-1">⚠️</div>
                    <div>
                      <h3 className="font-medium text-lg text-blue-300">
                        Important Information
                      </h3>
                      <p className="text-slate-300 mt-2">
                        Your vote is permanently recorded on the blockchain and
                        cannot be changed once submitted. Please ensure
                        you&apos;ve selected the right candidate before
                        confirming your vote.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Row(props: {
  email: string;
  clgId: string;
  data: any;
  id: string;
  isEven: boolean;
}) {
  const router = useRouter();
  const [isVoting, setIsVoting] = useState(false);
  const form = useForm<z.infer<typeof votingSchema>>({
    resolver: zodResolver(votingSchema),
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
  async function handleVote(values: z.infer<typeof votingSchema>) {
    try {
      setIsVoting(true);
      console.log(values);
      const inputHash = await getPoseidonHash(values.name, values.passphrase);
      const contract = await connectContract(props.id);
      const hashArray = await contract.get_hash_array();
      console.log([inputHash, hashArray]);
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        { ...inputHash, hashArray, contractAddress: props.id },
        "/election_circuit.wasm",
        "/election_circuit_0001.zkey"
      );
      const calldata: string[][] = await snarkjs.groth16
        .exportSolidityCallData(proof, publicSignals)
        .then((res) => {
          return parseArrayString(res);
        });

      console.log(calldata);
      const data = contract.interface.encodeFunctionData("vote", [
        calldata[0],
        calldata[1],
        calldata[2],
        calldata[3],
        props.clgId,
      ]);
      await gassless_transact({
        to: props.id,
        data,
      });
      router.push("/student/dashboard");
    } catch (e) {
      console.error("Voting failed:", e);
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <TableRow
      className={`hover:bg-slate-700/30 transition-colors ${
        props.isEven ? "bg-slate-800/50" : "bg-slate-800/30"
      }`}
    >
      <TableCell className="text-center py-4 px-6">
        <span className="font-medium text-slate-200">{props.email}</span>
      </TableCell>
      <TableCell className="text-center py-4">
        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded font-mono text-sm">
          {props.clgId}
        </span>
      </TableCell>
      <TableCell className="text-center py-4 flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 flex items-center gap-2 transition-all"
              disabled={isVoting}
            >
              {isVoting ? "Processing..." : "Vote"}
            </button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border border-slate-700 text-white">
            <DialogHeader>
              <h2 className="text-xl font-bold text-white">
                Confirm Your Vote
              </h2>
              <DialogDescription className="text-slate-300 mt-2">
                You are about to vote for:{" "}
                <span className="font-medium text-blue-400">{props.email}</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleVote)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-slate-300">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <input
                          placeholder="Enter your full name"
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.name.message}
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
                      <FormLabel className="text-sm font-medium text-slate-300">
                        Security Passphrase
                      </FormLabel>
                      <FormControl>
                        <input
                          type="password"
                          placeholder="Enter your security passphrase"
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.passphrase && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.passphrase.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <p className="text-sm text-slate-300">
                    Warning: Your vote will be permanently recorded on the
                    blockchain and cannot be changed after confirmation.
                  </p>
                </div>

                <DialogFooter className="flex justify-between gap-4">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="border border-slate-600 bg-transparent text-white hover:bg-slate-800 px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    disabled={isVoting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    {isVoting ? "Processing..." : "Confirm Vote"}
                  </button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default ElectionInfo;
