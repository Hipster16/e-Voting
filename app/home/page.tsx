import Navbar from "@/app/components/Navbar";
import LoginButtons from "@/app/components/LoginButtons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <main className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12">
        <nav className="flex justify-between items-center mb-12">
          <div className="text-2xl font-bold text-white">
            e<span className="text-blue-400">Voting</span>
          </div>
          <div className="py-2 px-4 rounded-full text-white">
            <LoginButtons />
          </div>
        </nav>
        
        <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text text-center leading-tight md:leading-none p-4 md:p-8 ">
          Vote Without Rigging
        </h1>

          <p className="text-lg text-gray-300 my-8 max-w-2xl mx-auto">
            Experience secure and transparent online voting with eVoting,
            ensuring your vote is counted without any risk of tampering. Join
            our platform to participate in fair elections and make your voice
            heard with confidence.
          </p>
        </div>
      </main>
    </div>
  );
}