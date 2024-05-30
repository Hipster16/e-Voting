"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginForm() {
  const labelStyle = "text-black text-xl font-medium";
  const inputStyle = "bg-blue-100 p-5 text-black rounded-2xl";
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleEmailChange =(e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Logic For login comes here...
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="id" className={labelStyle}>
        Email
      </label>
      <input
        id="id"
        type="text"
        className={inputStyle}
        placeholder="Enter the college mail id"
        onChange={handleEmailChange}
      />
      <label htmlFor="id" className={labelStyle}>
        Password
      </label>
      <input
        id="password"
        type="text"
        className={inputStyle}
        placeholder="Enter the password"
        onChange={handlePasswordChange}
      />
      <button className="bg-blue-600 text-lg font-semibold py-4 px-10 mt-7 rounded-full hover:bg-black" type="submit">
        Login
      </button>
    </form>
  );
}
