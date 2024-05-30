import Image from "next/image";
import Navbar from "./components/Navbar";
import LoginButtons from "./components/LoginButtons";

export default function Home() {
  return (
    <main className="w-screen h-screen p-16">
      <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
        <Navbar />
        <div className="">
          <div className="flex flex-col gap-10 items-center text-center mt-20">
            <h1 className="text-8xl w-[70%] font-extrabold">Vote Without Rigging</h1>
            <p className="text-xl  w-[50%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              et veritatis autem ipsa, a consectetur enim molestiae nostrum
              deserunt corporis suscipit, esse atque maxime quod voluptatibus
              quas vitae unde cumque.
            </p>
            <LoginButtons />
          </div>
        </div>
      </div>
    </main>
  );
}
