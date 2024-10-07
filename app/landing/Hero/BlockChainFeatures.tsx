import { Check } from 'lucide-react'

export function BlockchainFeatures(){
    return (
        <section className="py-20" id = "blockchain-features">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Blockchain</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {['Secure', 'Transparent', 'Easy to use'].map((plan) => (
                        <div key={plan} className="border border-gray-700 p-6 rounded-lg">
                            <h3 className="text-2xl font-semibold mb-4">{plan}</h3>
                            <ul className="mb-6 space-y-2">
                                {[1, 2, 3].map((feature) => (
                                    <li key={feature} className="flex items-center">
                                        <Check className="text-green-500 mr-2" />
                                        <span>Feature {feature}</span>
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