import { Link } from 'react-router-dom'
import DarkModeToggle from '@/DarkModeToggle'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-purple-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-purple-700 dark:text-purple-400 font-serif">
          VerseHaven
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 font-medium transition">
            Home
          </Link>
          <Link to="/write" className="text-gray-700 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 font-medium transition">
            Write
          </Link>
          <Link to="/lyra" className="text-gray-700 dark:text-gray-200 hover:text-purple-700 dark:hover:text-purple-400 font-medium transition">
  Lyra
</Link>
          {/* Add more links later */}
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}