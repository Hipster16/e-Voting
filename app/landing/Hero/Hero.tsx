import { Features } from './Features'
import { BlockchainFeatures } from './BlockChainFeatures'
import { GetStarted } from './GetStarted'
import { useRouter } from "next/navigation";

export function Hero(){
    const router = useRouter()

  const handleButton = () => {
    router.push("/home");
  };
    return (
        <>
            <section className="py-20 text-center">
                <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-white tracking-tight">
                    Innovative e<span className="text-blue-400">Voting</span> Solution
                </h1>
                <p className="text-xl sm:text-2xl text-gray-400 mb-12">
                    Vote without rigging
                </p>
                <button
                    onClick={handleButton}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold
                            text-white transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20 
                            transform hover:-translate-y-0.5"
                >
                    Try for free
                </button>
            </section>
            <Features />
           <BlockchainFeatures />
           <GetStarted />
        </>
    )
}