'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { loginSchema } from "@/Models/schema/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function LoginForm() {

  const labelStyle = "text-black text-xl font-medium";
  const inputStyle = "bg-blue-100/60 p-5 text-black rounded-2xl";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className={labelStyle}>Email</FormLabel>
            <FormControl>
              <input type="text" className={inputStyle} placeholder="Enter the college mail id" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel className={labelStyle}>Password</FormLabel>
            <FormControl>
              <input type="text" className={inputStyle} placeholder="Enter the password" {...field}/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )} />
        <button className="bg-blue-600 text-lg font-semibold py-4 px-10 mt-7 rounded-full hover:bg-black" type="submit">
          Login
        </button>
      </form>
    </Form>
  );
}
