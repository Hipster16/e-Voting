import { Features } from './Features'
import { BlockchainFeatures } from './BlockChainFeatures'
import { GetStarted } from './GetStarted'

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
            <Features />
           <BlockchainFeatures />
           <GetStarted />
        </>
    )
}