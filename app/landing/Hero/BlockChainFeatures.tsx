import { Check } from 'lucide-react'

export function BlockchainFeatures() {
    const features = {
        Secure: [
            "Advanced encryption protocols",
            "Immutable transaction records",
            "Distributed consensus mechanism"
        ],
        Transparent: [
            "Real-time transaction tracking",
            "Public ledger accessibility",
            "Verifiable audit trails"
        ],
            "Easy to use": [
            "Intuitive user interface",
            "Seamless integration",
            "Automated verification"
        ]
    }

  return (
    <section className="py-24 bg-gray-900" id="blockchain-features">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center text-white tracking-tight">
                We Use Blockchain
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(features).map(([plan, featureList]) => (
                    <div
                        key={ plan }
                        className="border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-8 rounded-xl
                                    transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/30
                                    hover:transform hover:-translate-y-1 hover:shadow-xl"
                        >
                        <h3 className="text-2xl font-semibold mb-6 text-white">{ plan }</h3>
                        <ul className="space-y-4">
                            {featureList.map((feature, index) => (
                            <li key={ index } className="flex items-center gap-3 text-gray-300">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                </span>
                                <span className="text-sm">
                                    { feature }
                                </span>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}