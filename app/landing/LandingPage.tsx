import { LandingPageNavBar } from './LandingPageNavBar'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <LandingPageNavBar />
      <main>
        <Hero />
      </main>
        <Footer />
    </div>
  )
}