import { Shield, Network, Eye } from "lucide-react"

export function Features() {
    const features = [
        {
            title: "Secure",
            description:
                "Ensures a secure voting environment using advanced cryptographic techniques, safeguarding votes from tampering and unauthorized access, and providing voter anonymity.",
            icon: Shield,
        },
        {
            title: "Decentralized",
            description:
                "Uses blockchain to eliminate central control, distributing data across nodes to ensure that the voting process remains fair, transparent, and resilient against single points of failure.",
            icon: Network,
        },
        {
            title: "Transparent",
            description:
                "Allows verifiable vote tracking on the blockchain without compromising voter privacy, making it possible for stakeholders to audit and validate the election outcomes independently.",
            icon: Eye,
        },
    ]

    return (
        <section className="relative py-24 overflow-hidden" id="features">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800/80" />
                <div className="container relative mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">
                            Customize Your Vote Settings
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Experience the future of voting with our advanced blockchain technology
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6 transition-all duration-300 hover:scale-105 hover:bg-gray-800/40"
                                >
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
            </div>
        </section>
    )
}