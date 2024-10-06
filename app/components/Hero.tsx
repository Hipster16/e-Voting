import { Check, ArrowRight } from 'lucide-react'

export function Hero(){
    return (
        <>
            <section className="py-20 text-center">
                <h1 className="text-5xl font-bold mb-6">Innovative eVoting Solution</h1>
                <p className="text-xl text-gray-400 mb-8">Vote without rigging</p>
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold">
                    Try for free
                </button>
            </section>
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Customize Your Vote Settings</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-700 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Feature {i}</h3>
                                <p className="text-gray-400">Description of feature {i} and its benefits for the eVoting process.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20">
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
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
                    <p className="text-xl text-gray-400 mb-8">Join thousands of organizations using our eVoting solution</p>
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold inline-flex items-center">
                        Get started <ArrowRight className="ml-2" />
                    </button>
                </div>
            </section>
        </>
    )
}