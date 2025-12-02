'use client'

import { useState } from 'react'
import { Film, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [jsonInput, setJsonInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationStatus, setValidationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const router = useRouter()

  const validateJSON = (input: string): boolean => {
    if (!input.trim()) {
      setValidationStatus('idle')
      setError(null)
      return false
    }

    try {
      const parsed = JSON.parse(input)
      
      if (!parsed.data?.purchaseHistory?.purchases) {
        setError('Invalid format: Missing data.purchaseHistory.purchases')
        setValidationStatus('invalid')
        return false
      }

      if (!Array.isArray(parsed.data.purchaseHistory.purchases)) {
        setError('Invalid format: purchases must be an array')
        setValidationStatus('invalid')
        return false
      }

      if (parsed.data.purchaseHistory.purchases.length === 0) {
        setError('No purchases found in the data')
        setValidationStatus('invalid')
        return false
      }

      setError(null)
      setValidationStatus('valid')
      return true
    } catch (e) {
      setError('Invalid JSON format. Please check your input.')
      setValidationStatus('invalid')
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setJsonInput(value)
    
    if (value.trim()) {
      const timeoutId = setTimeout(() => validateJSON(value), 500)
      return () => clearTimeout(timeoutId)
    } else {
      setValidationStatus('idle')
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!validateJSON(jsonInput)) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze data')
      }

      const result = await response.json()
      router.push(`/results/${result.sessionId}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred while analyzing your data')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Film className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Alamo Watched
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights about your movie-watching habits at Alamo Drafthouse
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">
            Paste your Alamo Drafthouse viewing history JSON data below to see your personalized analytics.
          </p>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="json-input" className="block text-sm font-medium text-gray-700">
                Your Viewing Data (JSON)
              </label>
              {validationStatus === 'valid' && (
                <div className="flex items-center text-green-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Valid JSON
                </div>
              )}
              {validationStatus === 'invalid' && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Invalid
                </div>
              )}
            </div>
            <textarea
              id="json-input"
              rows={12}
              value={jsonInput}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent font-mono text-sm transition-colors ${
                validationStatus === 'valid'
                  ? 'border-green-300 focus:ring-green-500'
                  : validationStatus === 'invalid'
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              placeholder='Paste your JSON data here...'
            />
            {error && (
              <div className="mt-2 flex items-start text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || validationStatus !== 'valid'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze My Movies'
            )}
          </button>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Your data is processed anonymously and used only for comparative statistics.</p>
        </div>
      </div>
    </main>
  )
}
