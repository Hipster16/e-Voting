import { ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation";

export function GetStarted(){
    const router = useRouter()

    const handleButton = () => {
    router.push("/home");
  };
    return (
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
                <p className="text-xl text-gray-400 mb-8">Join thousands of organizations using our eVoting solution</p>
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold inline-flex items-center" onClick={handleButton}>
                    Get started <ArrowRight className="ml-2" />
                </button>
            </div>
        </section>
    )
}