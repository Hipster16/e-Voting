import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { MetaMaskContextProvider } from "./hooks/useMetamask";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "e-Voting",
  description: "A place to cast vote securely online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MetaMaskContextProvider>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </MetaMaskContextProvider>
  );
}
