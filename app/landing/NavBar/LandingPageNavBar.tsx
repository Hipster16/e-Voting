import { useRouter } from "next/navigation";

export function LandingPageNavBar(){
  const router = useRouter()

  const handleButton = () => {
    router.push("/home/Home");
  };
  return (
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="text-2xl font-bold">eVote</div>
        <nav className="hidden md:flex space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          Home
        </a>
          <a href="#features" className="text-gray-400 hover:text-white">Features</a>
          <a href="#blockchain-features" className="text-gray-400 hover:text-white">Blockchain</a>
          <a href="#footer" className="text-gray-400 hover:text-white">Contact Us</a>
        </nav>
        <div className="space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded" onClick={ handleButton }>
            Get Started
          </button>
        </div>
      </header>
    )
}