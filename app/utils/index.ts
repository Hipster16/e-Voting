type accountType = {
  address: string[];
  privateKey: string[];
}

type Datatype = {
  to: string;
  data: string;
}

import { ethers } from 'ethers';
import { Web3 } from 'web3';
import ElectionFactory from "@/artifacts/contracts/ElectionFactory/ElectionFactory.json"
import ElectionContract from "@/artifacts/contracts/ElectionContract/ElectionContract.json"
import { buildPoseidon } from 'circomlibjs';
import { createSmartAccountClient, PaymasterMode } from "@biconomy/account";

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string, num: number) => {
  return `${addr.substring(0, num)}...`;
};

export const createNewWallet = (num: number) => {
  let accounts: accountType = { address: [], privateKey: [] };
  const web3 = new Web3('https://polygon-amoy-bor-rpc.publicnode.com');
  for (let i = 0; i < num; i++) {
    const account = web3.eth.accounts.create();
    accounts.address.push(account.address);
    accounts.privateKey.push(account.privateKey)
  }
  return accounts
}

export const connectContractFactory = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  let contract = new ethers.Contract(contractAddress, ElectionFactory, signer)
  return contract
}  

export const connectContract = async (address: string) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractAddress = address;
  let contract = new ethers.Contract(contractAddress, ElectionContract, signer)
  return contract
} 

function stringToBigInt(input: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(input);
  const hexString = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return BigInt(`0x${hexString}`);
}

export async function getPoseidonHash(input1:string, input2:string) {
  const poseidon = await buildPoseidon();
  const hash1 = poseidon.F.toString(poseidon([stringToBigInt(input1)])); // First input hashed
  const hash2 = poseidon.F.toString(poseidon([stringToBigInt(input2)])); // Second input hashed
  return {
    hash1: hash1,
    hash2: hash2,
  };
}

export const config = {
  biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_KEY,
  bundlerUrl: "https://bundler.biconomy.io/api/v2/80002/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
};

export const gassless_transact = async (tx: Datatype) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const smartWallet = await createSmartAccountClient({
    signer,
    biconomyPaymasterApiKey: config.biconomyPaymasterApiKey,
    bundlerUrl: config.bundlerUrl
  })
  const saAddress = await smartWallet.getAccountAddress();
  console.log("SA Address", saAddress);
  const userOpResponse = await smartWallet.sendTransaction(tx, {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  });
  const { transactionHash } = await userOpResponse.waitForTxHash();
  console.log("Transaction Hash", transactionHash);
  const userOpReceipt = await userOpResponse.wait();
  if (userOpReceipt.success == "true") {
    console.log("UserOp receipt", userOpReceipt);
    console.log("Transaction receipt", userOpReceipt.receipt);
  }
  console.log("end")
}