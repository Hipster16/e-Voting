export function LandingPageNavBar(){
    return (
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="text-2xl font-bold">eVote</div>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">Features</a>
          <a href="#" className="text-gray-400 hover:text-white">Blockchain</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </nav>
        <div className="space-x-2">
          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded">
            Get Started
          </button>
        </div>
      </header>
    )
}