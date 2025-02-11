"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { StudentSigninSchema } from "@/Models/schema/studentSigninSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { buildPoseidon } from "circomlibjs"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMetaMask } from "../hooks/useMetamask";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/firestore";
export default function Signin() {
  const labelStyle = "text-black text-xl font-medium";
  const { wallet } = useMetaMask();
  const inputStyle = "bg-blue-100/60 p-5 text-black rounded-2xl";
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // || 'http://localhost:3000';

  const form = useForm<z.infer<typeof StudentSigninSchema>>({
    resolver: zodResolver(StudentSigninSchema),
  });

  function stringToBigInt(input: string) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(input);
    const hexString = Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return BigInt(`0x${hexString}`);
  }

  async function doublePoseidonHash(input1: string, input2: string) {
    const poseidon = await buildPoseidon();
    const hash1 = poseidon.F.toString(poseidon([stringToBigInt(input1)])); // First input hashed
    const hash2 = poseidon.F.toString(poseidon([stringToBigInt(input2)])); // Second input hashed
    const finalHash = poseidon.F.toString(poseidon([hash1, hash2])); // Hash of the two hashed values
    console.log(hash1, hash2);
    return finalHash;
  }

  async function onSubmit(values: z.infer<typeof StudentSigninSchema>) {
    setLoading(true);
    const q = query(collection(db, "Voters"), where("email", "==", values.email));
    const doc = await getDocs(q)
    if(!doc.empty) {
        console.log("already user with same exist");
        setLoading(false);
        return;
    }
    const _userhash = await doublePoseidonHash(values.name, values.passphrase)
    await addDoc(collection(db, "Voters"), {
        email: values.email,
        name: values.name,
        clgId: values.college_id.toUpperCase(),
        userhash: _userhash
      });
    setLoading(false);
    router.push("/")
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>Email</FormLabel>
              <FormControl>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Enter the college mail id"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>Name</FormLabel>
              <FormControl>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Enter the name of the student"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="college_id"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>College ID</FormLabel>
              <FormControl>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Enter the B2_ college id"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passphrase"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className={labelStyle}>
                Secret Passphrase
              </FormLabel>
              <FormControl>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Enter the secret passphrase"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="bg-blue-600 text-lg font-semibold py-4 px-10 mt-7 rounded-full hover:bg-black disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          Register
        </button>
      </form>
      <p className="text-red-500 text-md w-full text-center">{errormsg}</p>
    </Form>
  );
}
