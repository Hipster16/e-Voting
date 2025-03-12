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
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { doublePoseidonHash } from "../utils";
import db from "@/firebase/firestore";
export default function Signin() {
  const labelStyle = "text-black text-xl font-medium";
  const inputStyle = "bg-blue-100/60 p-5 text-black rounded-2xl";
  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const form = useForm<z.infer<typeof StudentSigninSchema>>({
    resolver: zodResolver(StudentSigninSchema),
  });

  async function onSubmit(values: z.infer<typeof StudentSigninSchema>) {
    setLoading(true);
    const q = query(
      collection(db, "Voters"),
      where("email", "==", values.email)
    );
    const docs = await getDocs(q);
    if (!docs.empty) {
      for (const _doc of docs.docs) {
        if (_doc.data().verified) {
          setErrormsg("This email has already been registered");
          setLoading(false);
          return;
        } else {
          await deleteDoc(_doc.ref);
        }
      }
    }
    const authentication_pin = Math.floor(100000 + Math.random() * 900000);
    const _userhash = await doublePoseidonHash(values.name, values.passphrase);
    const new_doc = await addDoc(collection(db, "Voters"), {
      verified: false,
      email: values.email,
      name: values.name,
      clgId: values.college_id.toUpperCase(),
      userhash: _userhash,
      authpin: authentication_pin,
    });
    await fetch(`${baseUrl}/api/sendMail`, {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        pin: authentication_pin,
        email: values.email,
      }),
    });
    setLoading(false);
    router.push(`/student/signin/auth/${new_doc.id}`);
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
              <FormLabel className={labelStyle}>Secret Passphrase</FormLabel>
              <FormControl>
                <input
                  type="password"
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
