import { Film, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <Film className="w-24 h-24 text-blue-600 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Session Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The analytics session you&apos;re looking for doesn&apos;t exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
