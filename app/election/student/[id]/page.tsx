"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/auth";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import db from "@/firebase/firestore";
import { useMetaMask } from "@/app/hooks/useMetamask";
import Image from "next/image";
import { connectContract } from "@/app/utils";
import { getBigInt } from "ethers";

function ElectionInfo({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<any>();
  const [key, setKey] = useState("key");
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

  const getRandom = (arr: string[]) => {
    if (!arr) return "";
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth.authState, async (userData) => {
      if (userData) {
        setUser(userData);
        const q = query(
          collection(db, "Elections"),
          where("elid", "==", params.id),
          where("participants", "array-contains", {
            email: userData.email,
            voted: false,
          })
        );
        const doc = await getDocs(q);
        if (doc.docs.length == 0 || doc.docs.length > 1) {
          console.log("no access to this election");
          router.push("/student/dashboard");
        }
        const value = doc.docs.map((d) => {
          return d.data();
        });
        setData(value[0]);
        setKey(getRandom(value[0]?.privateKeys));
      } else {
        router.push("/student/login");
      }
    });
    return unsubscribe;
  },[]);

  // useEffect(() => {
  //   if (user == null) {
  //     return;
  //   } else {
  //     const q = query(
  //       collection(db, "Elections"),
  //       where("id", "!=", params.id)
  //     );
  //     const dataFetch = onSnapshot(q, (snapshot) => {
  //       snapshot.docs.map((el) => {
  //         console.log(el);
  //       });
  //     });
  //     return dataFetch
  //   }
  // },[user]);

  return (
    <main className="h-screen p-16 ">
      <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
        <Navbar />
        <div className="w-full h-full mt-12 flex flex-col items-center gap-10">
          <h1 className="text-6xl font-semibold ">{data?.name}</h1>
          <p className="text-4xl text-center w-[70%]">{data?.desc}</p>
          <div className="w-[50%] flex flex-col mt-5 gap-5">
            {!wallet.accounts[0] ? (
              <Connect privatekey={key} />
            ) : (
              <Table className="bg-slate-100/10 rounded-lg ">
                <TableHeader className="">
                  <TableRow className="flex justify-between text-xl text-white pt-5">
                    <TableHead className="text-white font-semibold">
                      CandidateName
                    </TableHead>
                    {/* <TableHead className="text-white font-semibold">
                      Candidate ID
                    </TableHead> */}
                    <TableHead className="text-right text-white font-semibold">
                      Option
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="rounded-b-lg">
                  {data &&
                    data.Candidates.map((el: any, index: number) => {
                      return (
                        <Row
                          key={index}
                          email={el.email}
                          clgId={el.clgId}
                          user={user!}
                          data={data}
                          id={params.id}
                          privateKey={key}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Row(props: {
  email: string;
  clgId: string;
  user: User;
  data: any;
  id: string;
  privateKey: string;
}) {
  const router = useRouter()
  async function handleVote() {
    try {
      const contract = await connectContract()
      let transaction = await contract.vote(
        props.user.uid,
        getBigInt(props.id),
        props.email
      )
      await transaction.wait();
      console.log(transaction)
      const q = query(
        collection(db, "Elections"),
        where("elid", "==", props.id),
        where("participants", "array-contains", {
          email: props.user.email,
          voted: false,
        })
      );
      const document = await getDocs(q);
      let value = document.docs[0].data();
      const p = value.participants.map((obj: any) => {
        if (obj.email == props.user.email) {
          return { ...obj, voted: true };
        }
        return obj;
      });
      let k: string[] = value.privateKeys;
      k.splice(k.indexOf(props.privateKey), 1);
      await updateDoc(doc(db, "Elections", document.docs[0].id), {
        participants: p,
        privateKeys: k,
      });
      router.push("/student/dashboard")
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <TableRow className="flex justify-between items-center">
      <TableCell>
        <p className="text-lg">{props.email}</p>
      </TableCell>
      {/* <TableCell>
        <p className="text-lg font-medium text-center">{props.clgId}</p>
      </TableCell> */}
      <TableCell>
        <Dialog>
          <DialogTrigger className="bg-blue-600 text-lg font-medium py-2 px-5 rounded-full hover:bg-white hover:text-blue-600">
            Vote
          </DialogTrigger>
          <DialogContent className="text-black">
            <DialogHeader className="text-lg">Confirm Vote</DialogHeader>
            <DialogDescription>
              Are you sure? The vote cannot be changed.
            </DialogDescription>
            <DialogFooter>
              <DialogClose className="bg-red-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black ">
                No
              </DialogClose>
              <DialogClose
                onClick={handleVote}
                className="bg-blue-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black hover:text-white"
              >
                yes
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

function Connect(props: { privatekey: string }) {
  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();
  function handleCopy(event: any): void {
    navigator.clipboard.writeText(props.privatekey);
  }

  return (
    <div className="w-full flex items-center flex-col gap-7 pt-10">
      <h2 className="text-2xl font-semibold">private key</h2>
      <div className="w-min flex bg-slate-100/10 justify-evenly items-center rounded-xl">
        <p className="px-5">{props.privatekey}</p>
        <button
          className="px-5 bg-green-600 p-5 rounded-r-xl hover:bg-white hover:text-black"
          onClick={handleCopy}
        >
          copy
        </button>
      </div>
      {!hasProvider && (
        <a
          href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?pli=1"
          className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-black"
        >
          Install Metamask
        </a>
      )}
      {hasProvider && wallet.accounts.length == 0 && (
        <div className="w-full flex justify-center">
          <button
            disabled={isConnecting}
            onClick={connectMetaMask}
            className="bg-blue-600 text-lg font-extrabold py-4 px-10 rounded-full hover:bg-white hover:text-black w-[50%] flex justify-evenly"
          >
            <Image
              src="/metamask.png"
              alt=""
              width={20}
              height={20}
              className="m-1 mr-2"
            />
            Connect with private key above
          </button>
        </div>
      )}
      {hasProvider && wallet.accounts.length > 0 && (
        <div className="bg-red-600 text-sm font-extrabold py-4 px-10 rounded-full hover:bg-black w-full flex justify-evenly">
          Signed in account is not admin... disconnect and reconnect
        </div>
      )}
    </div>
  );
}
export default ElectionInfo;
