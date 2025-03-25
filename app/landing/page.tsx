import dynamic from "next/dynamic"

const LandingContent = dynamic(() => import("./components/LandingContent"), { ssr: false })

export default function LandingPage() {
  return <LandingContent />
}

