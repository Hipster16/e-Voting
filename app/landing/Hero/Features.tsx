export function Features(){
    return (
        <section className="py-20 bg-gray-800" id = "features">
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
    )
}