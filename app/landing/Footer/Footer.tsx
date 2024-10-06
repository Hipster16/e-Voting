export function Footer(){
    return (
        <footer className="bg-gray-900 py-12 border-t border-gray-800" id = "footer">
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                <h4 className="text-lg font-semibold mb-4">About Us</h4>
                <p className="text-gray-400">blah blah</p>
                </div>
                <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                    {['Home', 'Features', 'Blockchain', 'Contact'].map((link) => (
                    <li key={link}><a href="#" className="text-gray-400 hover:text-white">{link}</a></li>
                    ))}
                </ul>
                </div>
                <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                    {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link) => (
                    <li key={link}><a href="#" className="text-gray-400 hover:text-white">{link}</a></li>
                    ))}
                </ul>
                </div>
                <div>
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
                <div className="flex">
                    <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-2 rounded-l" />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">Subscribe</button>
                </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; 2024 eVote. All rights reserved.</p>
            </div>
            </div>
        </footer>
    )
}