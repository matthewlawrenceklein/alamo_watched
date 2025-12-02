'use client'

import { useState } from 'react'
import { Film, Loader2, AlertCircle, CheckCircle2, Plus, X, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import HelpModal from '@/components/HelpModal'

interface JsonInput {
  id: string
  value: string
  status: 'idle' | 'valid' | 'invalid'
  error: string | null
}

export default function Home() {
  const [jsonInputs, setJsonInputs] = useState<JsonInput[]>([
    { id: '1', value: '', status: 'idle', error: null }
  ])
  const [activeTab, setActiveTab] = useState('1')
  const [isLoading, setIsLoading] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  const router = useRouter()

  const validateJSON = (input: string): { valid: boolean; error: string | null } => {
    if (!input.trim()) {
      return { valid: false, error: null }
    }

    try {
      const parsed = JSON.parse(input)
      
      if (!parsed.data?.purchaseHistory?.purchases) {
        return { valid: false, error: 'Invalid format: Missing data.purchaseHistory.purchases' }
      }

      if (!Array.isArray(parsed.data.purchaseHistory.purchases)) {
        return { valid: false, error: 'Invalid format: purchases must be an array' }
      }

      if (parsed.data.purchaseHistory.purchases.length === 0) {
        return { valid: false, error: 'No purchases found in the data' }
      }

      return { valid: true, error: null }
    } catch (e) {
      return { valid: false, error: 'Invalid JSON format. Please check your input.' }
    }
  }

  const handleInputChange = (id: string, value: string) => {
    setJsonInputs(prev => prev.map(input => {
      if (input.id === id) {
        const validation = validateJSON(value)
        return {
          ...input,
          value,
          status: value.trim() ? (validation.valid ? 'valid' : 'invalid') : 'idle',
          error: validation.error
        }
      }
      return input
    }))
  }

  const addNewInput = () => {
    const newId = String(Date.now())
    setJsonInputs(prev => [...prev, { id: newId, value: '', status: 'idle', error: null }])
    setActiveTab(newId)
  }

  const removeInput = (id: string) => {
    if (jsonInputs.length === 1) return
    
    setJsonInputs(prev => prev.filter(input => input.id !== id))
    
    if (activeTab === id) {
      const remainingInputs = jsonInputs.filter(input => input.id !== id)
      setActiveTab(remainingInputs[0]?.id || '')
    }
  }

  const allInputsValid = jsonInputs.length > 0 && jsonInputs.every(input => input.status === 'valid')

  const handleAnalyze = async () => {
    if (!allInputsValid) return

    setIsLoading(true)
    setGlobalError(null)

    try {
      const allPurchases = jsonInputs.flatMap(input => {
        const parsed = JSON.parse(input.value)
        return parsed.data.purchaseHistory.purchases
      })

      const combinedData = {
        data: {
          purchaseHistory: {
            purchases: allPurchases
          }
        }
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze data')
      }

      const result = await response.json()
      router.push(`/results/${result.sessionId}`)
    } catch (e) {
      setGlobalError(e instanceof Error ? e.message : 'An error occurred while analyzing your data')
      setIsLoading(false)
    }
  }

  const activeInput = jsonInputs.find(input => input.id === activeTab)

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">Get Started</h2>
              <button
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors"
                aria-label="How to get your data"
                title="How to get your data"
              >
                <HelpCircle className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={addNewInput}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add More Movies
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            Paste your Alamo Drafthouse purchase history JSON data. If you have multiple pages, click &quot;Add More Movies&quot; for each pagination response.
          </p>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {jsonInputs.map((input, index) => (
              <div key={input.id} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab(input.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === input.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-medium">Page {index + 1}</span>
                  {input.status === 'valid' && (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  )}
                  {input.status === 'invalid' && (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                </button>
                {jsonInputs.length > 1 && (
                  <button
                    onClick={() => removeInput(input.id)}
                    disabled={isLoading}
                    className="p-1 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Active Input */}
          {activeInput && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={`json-input-${activeInput.id}`} className="block text-sm font-medium text-gray-700">
                  JSON Data for Page {jsonInputs.findIndex(i => i.id === activeInput.id) + 1}
                </label>
                {activeInput.status === 'valid' && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Valid JSON
                  </div>
                )}
                {activeInput.status === 'invalid' && (
                  <div className="flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Invalid
                  </div>
                )}
              </div>
              <textarea
                id={`json-input-${activeInput.id}`}
                rows={12}
                value={activeInput.value}
                onChange={(e) => handleInputChange(activeInput.id, e.target.value)}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent font-mono text-sm transition-colors ${
                  activeInput.status === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : activeInput.status === 'invalid'
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                placeholder='Paste your JSON data here...'
              />
              {activeInput.error && (
                <div className="mt-2 flex items-start text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{activeInput.error}</span>
                </div>
              )}
            </div>
          )}

          {globalError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-700">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{globalError}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {jsonInputs.filter(i => i.status === 'valid').length} of {jsonInputs.length} page(s) valid
            </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !allInputsValid}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Your data is processed anonymously and used only for comparative statistics.</p>
        </div>
      </div>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </main>
  )
}
