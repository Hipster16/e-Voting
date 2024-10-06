"use client";
import { LandingPageNavBar } from './NavBar/LandingPageNavBar'
import { Hero } from './Hero/Hero'
import { Footer } from './Footer/Footer'

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