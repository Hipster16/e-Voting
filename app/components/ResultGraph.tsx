"use client";
import { useEffect, useState } from "react";
import { BarDatumWithColor, ResponsiveBar } from "@nivo/bar";
import auth from "@/firebase/auth";
import db from "@/firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ethers, getBigInt } from "ethers";
import Evoting from "@/artifacts/contracts/Evoting.sol/Evoting.json";

export default function ResultGraph(props: { id: string }) {
  const router = useRouter();
  const [result, setResult] = useState<BarDatumWithColor[]>([])
  const [loading, setloading] = useState(false)
  const [winner, setWinner] = useState("");
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const data: BarDatumWithColor[] = [
    {
      CandidateName: "Candidate 1",
      Vote: 10,
      color: "pink",
    },
    {
      CandidateName: "Candidate 2",
      Vote: 20,
      color: "pink",
    },
    {
      CandidateName: "Candidate 3",
      Vote: 30,
      color: "lightgreen",
    },
    {
      CandidateName: "Candidate 4",
      Vote: 20,
      color: "pink",
    },
    {
      CandidateName: "Candidate 5",
      Vote: 10,
      color: "pink",
    },
  ];

 async function handleFetchResult(event: any) {
  setloading(true)
  console.log("fetch data...")
  try{
    const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        Evoting.abi,
        provider
      )
        const response = await contract.getResults(
          getBigInt(props.id)
        )
        let votes: number[] = response[1].map((x: any) => Number(x))
        const max = Math.max(...votes)
        let winner: string[] = []
        let allCandidates:BarDatumWithColor[] = response[0].map((el: string, index:number) => {
          if(votes[index] == max){
            winner.push(el)
            return {
              CandidateName: el,
              Vote: votes[index],
              color: "lightgreen"
            }
          }
          else{
            return {
              CandidateName: el,
              Vote: votes[index],
              color: "pink"
            }
          }
        })
        setResult(allCandidates);
        setWinner(winner.length == 1 ? `${winner[0]} Wins 🎉🎉` : "The election is draw 🥶🥶🥶")
        console.log("fetched")
        setloading(false)
  }catch(e){
    console.log(e);
  }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth.authState, async (userData) => {
      if (userData) {
        const q = query(
          collection(db, "Elections"),
          where("elid", "==", props.id),
        );
        const doc = await getDocs(q);
        if (doc.docs.length == 0 || doc.docs.length > 1) {
          console.log("no access to this election");
          router.push("/student/dashboard");
        }
      } else {
        router.push("/student/login");
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if(!provider){
      setProvider(new ethers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`));
    }
    if(!provider) return;
  })
  if (result.length == 0) {
    return (
      <button
        className="bg-green-600 px-20 py-6 rounded-full font-semibold text-xl hover:bg-white hover:text-black"
        onClick={handleFetchResult}
        disabled={loading}
      >
        show result
      </button>
    );
  } else {
    return (
      <>
        <h2 className="text-2xl font-bold">{winner}</h2>
        <div className="w-[900px] h-[500px] bg-white p-5">
          <h1 className="text-black text-xl text-center font-semibold">
            Vote distibution
          </h1>
          <ResponsiveBar
            data={result}
            groupMode="grouped"
            indexBy={"CandidateName"}
            keys={["Vote"]}
            colors={({ id, data }) => data.color}
            margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
            padding={0.4}
            enableLabel
            labelTextColor={"black"}
            motionConfig={"gentle"}
          />
        </div>
      </>
    );
  }
}
// setProvider(new ethers.JsonRpcProvider(`https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`))
// const contract = new ethers.Contract(
//   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
//   Evoting.abi,
//   provider
// )
//   const response = await contract.getResults(
//     getBigInt(props.id)
//   )
//   console.log(response);
