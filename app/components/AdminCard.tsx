"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { connectContract, connectContractFactory } from "../utils";
import { useRouter } from "next/navigation";

type ElectionCardProps = {
  name: string;
  desc: string;
  endDate: string;
  address: string;
};

export default function ElectionCard(props: ElectionCardProps) {
  const [disabled, setDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const checkStatus = async () => {
    try {
      const contract = await connectContract(props.address);
      const status = await contract.status();
      setDisabled(!status);
    } catch (err) {
      console.log("Error in checking status", err);
    }
  };
  const checkChars = (str: string) => {
    var max = 120;
    return str.length > max ? str.substring(0, max) + "..." : str;
  };
  const handleEndElection = async () => {
    try {
      setSubmitting(true);
      const contract = await connectContractFactory();
      await contract.endElection(props.address);
      router.push("/admin/dashboard");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);
  return (
    <div className="w-[1fr] h-[1fr] min-w-[375px] min-h-[325px] max-w-[300px] bg-blue-300/15 p-6 flex flex-col justify-between rounded-3xl">
      <h1 className="text-2xl font-semibold">{props.name}</h1>
      <p className="text-md font-medium">{checkChars(props.desc)}</p>
      <p className="w-min text-nowrap py-1 px-2 text-sm font-bold rounded-full bg-slate-50/15">
        {props.endDate}
      </p>
      <Dialog>
        <DialogTrigger
          disabled={disabled}
          className="bg-red-600 text-lg font-medium py-2 px-5 rounded-full hover:bg-white hover:text-red-600 disabled:opacity-50 disabled:hover:bg-red-600 disabled:hover:text-white"
        >
          End Election
        </DialogTrigger>
        <DialogContent className="text-black">
          <DialogHeader className="text-lg">Confirm</DialogHeader>
          <DialogDescription>
            Are you sure? This decision cannot be changed.
          </DialogDescription>
          <DialogFooter>
            <DialogClose className="bg-red-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black ">
              No
            </DialogClose>
            <button
              onClick={handleEndElection}
              disabled={submitting}
              className="bg-blue-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black hover:text-white"
            >
              yes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
