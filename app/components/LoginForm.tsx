"use client";
import { useDropzone } from "react-dropzone"
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMetaMask } from "../hooks/useMetamask";
import MetamaskConnect from "./MetamaskConnect";
import { ethers } from "ethers";
import {
  Offchain,
  OffchainConfig,
  OffchainAttestationVersion,
  SignedOffchainAttestation,
  EAS,
  SchemaEncoder
} from "@ethereum-attestation-service/eas-sdk";


export default function LoginForm() {
  const { wallet, setUser, disconnectMetaMask } = useMetaMask();
  const router = useRouter();
  const [jsonData, setJsonData] = useState<SignedOffchainAttestation | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length == 0) return

    const file = acceptedFiles[0]
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parseData = JSON.parse(reader.result as string)
        setJsonData(parseData);
      } catch (err) {
        console.log("Error has occured")
      }
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/json': ['.json'] }
  })

  const handleLogin = () => {
    try {
      console.log(jsonData)
      const attestation = {
        signer: "0x93f62C99e8640Ab6c30d9AAD1F95b576Ce5AFAb9",
      };

      const easContractAddress = "0xb101275a60d8bfb14529C4421899aD7CA1Ae5B5Fc";
      const eas = new EAS(easContractAddress);
      if (!jsonData) return;
      const sign: SignedOffchainAttestation = jsonData
      const EAS_CONFIG: OffchainConfig = {
        address: sign.domain.verifyingContract,
        version: sign.domain.version,
        chainId: ethers.toBigInt(sign.domain.chainId),
      };

      // Create an Offchain instance
      const offchain = new Offchain(
        EAS_CONFIG,
        OffchainAttestationVersion.Version2,
        eas
      );

      // Verify the offchain attestation signature
      const isValidAttestation = offchain.verifyOffchainAttestationSignature(
        attestation.signer,
        sign
      );
      console.log(isValidAttestation)
      if (!isValidAttestation) {
        console.error("Invalid attestation signature");
        disconnectMetaMask();
        setJsonData(null);
        return
      }
      else if (sign.message.recipient.toLowerCase() != wallet.accounts[0]) {
        console.log("Not the correct user");
        disconnectMetaMask();
        setJsonData(null);
        return
      }
      else {
        console.log("Valid attestation signature");
        const schemaEncoder = new SchemaEncoder(
          "string studentName,uint16 yearOfPassing"
        );
        const data = schemaEncoder.decodeData(sign.message.data)
        setUser(data[0].value.value.toString())
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (wallet.accounts[0] && wallet.userName) {
      router.push("/student/dashboard");
    }
  });
  return (
    <div>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-5 text-center transition-colors cursor-pointer ${isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <p className={`${jsonData ? "text-green-500" : "text-gray-500"}`}>
            {isDragActive
              ? 'Drop the JSON file here...'
              : jsonData ? "the json file is accepted" : 'Drag & drop a JSON file here, or click to select one'}
          </p>
          {!jsonData && <button
            className={`mt-2 px-4 py-2 ${jsonData ? "bg-green-500" : "bg-blue-600"} text-white rounded shadow hover:bg-blue-500 focus:outline-none`}
          >
            {jsonData ? "Browse " : "Browse Files"}
          </button>}
        </div>
      </div>
      <MetamaskConnect />
      <button className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-black mt-5 w-full disabled:opacity-50" disabled={!jsonData || !wallet.accounts[0]} onClick={handleLogin}> Login </button>
    </div>
  )
}
