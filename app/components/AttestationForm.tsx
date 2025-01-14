"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { AttestionSchema } from "@/Models/schema/attestationSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMetaMask } from "../hooks/useMetamask";


export default function AttestationForm() {
    const labelStyle = "text-black text-xl font-medium";
    const { wallet } = useMetaMask();
    const inputStyle = "bg-blue-100/60 p-5 text-black rounded-2xl";
    const [errormsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    // || 'http://localhost:3000';


    const form = useForm<z.infer<typeof AttestionSchema>>({
        resolver: zodResolver(AttestionSchema),
    });

    async function onSubmit(values: z.infer<typeof AttestionSchema>) {
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/sendAttestation`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                ...values,
            }),
        });
        const data = await response.json();
        console.log(data.message)
        if (response.ok) {
            setErrormsg("")
        }
        else {
            setErrormsg(data.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (wallet.accounts[0] != process.env.NEXT_PUBLIC_ADMIN_WALLET_ID?.toLowerCase()) {
            router.push("/");
        }
    })

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
                    name="yearOfPassing"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className={labelStyle}>Year Of Passing</FormLabel>
                            <FormControl>
                                <input
                                    type="number"
                                    className={inputStyle}
                                    placeholder="Enter the year"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="recipient_wallet_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className={labelStyle}>student wallet address</FormLabel>
                            <FormControl>
                                <input
                                    type="text"
                                    className={inputStyle}
                                    placeholder="Enter the wallet address"
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
                    Create attestation
                </button>
            </form>
            <p className="text-red-500 text-md w-full text-center">{errormsg}</p>
        </Form>
    );
}