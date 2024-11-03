/*import Navbar from "@/app/components/Navbar";
import LoginButtons from "@/app/components/LoginButtons";

export default function Home() {
  return (
    <main className="w-screen h-screen p-16">
      <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
        <Navbar />
        <div className="">
          <div className="flex flex-col gap-10 items-center text-center mt-20">
            <h1 className="text-8xl w-[70%] font-bold">Vote Without Rigging</h1>
            <p className="text-xl  w-[50%]">
              Experience secure and transparent online voting with eVoting,
              ensuring your vote is counted without any risk of tampering. Join
              our platform to participate in fair elections and make your voice
              heard with confidence.
            </p>
            {<LoginButtons />}
          </div>
        </div>
      </div>
    </main>
  );
}*/

import { LandingPage } from "../app/landing/LandingPage";
export default function Home() {
  return <LandingPage />;
}
