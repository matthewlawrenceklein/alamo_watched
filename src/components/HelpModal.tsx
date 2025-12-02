'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between flex-shrink-0">
                <h2 className="text-3xl font-bold text-white">How to Get Your Data</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1">
                <div className="p-8">
                  {/* Video/GIF */}
                  <div className="mb-8 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                    <Image
                      src="/assets/alamo_get_json.gif"
                      alt="Tutorial showing how to extract purchase history"
                      width={800}
                      height={450}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>

                  {/* Instructions */}
                  <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
                      <p className="text-blue-900 font-semibold">
                        Follow these steps to export your Alamo Drafthouse purchase history:
                      </p>
                    </div>

                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        1
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Log in to Alamo Drafthouse</h3>
                        <p className="text-gray-700 mb-2">
                          Navigate to{' '}
                          <a
                            href="https://drafthouse.com/victory/purchase-history"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline font-medium"
                          >
                            drafthouse.com/victory/purchase-history
                          </a>
                        </p>
                        <p className="text-gray-600 text-sm">
                          Make sure you&apos;re logged in to see your purchase history.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        2
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Open Chrome Developer Tools</h3>
                        <p className="text-gray-700 mb-2">
                          Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">F12</kbd> or{' '}
                          <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Cmd+Option+I</kbd> (Mac) /{' '}
                          <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Ctrl+Shift+I</kbd> (Windows)
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          <li>Click on the <strong>Network</strong> tab</li>
                          <li>Click the <strong>Fetch/XHR</strong> filter button</li>
                          <li>Make sure <strong>Response</strong> is selected in the preview pane</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        3
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Reload the Page</h3>
                        <p className="text-gray-700 mb-2">
                          Press <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Cmd+R</kbd> (Mac) /{' '}
                          <kbd className="px-2 py-1 bg-gray-200 rounded text-sm font-mono">Ctrl+R</kbd> (Windows) to reload
                        </p>
                        <p className="text-gray-600 text-sm">
                          This will capture the network requests in the Developer Tools.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        4
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Load All Your Purchases</h3>
                        <p className="text-gray-700 mb-2">
                          Click the <strong>&quot;Load More&quot;</strong> button repeatedly until all your 2025 movies are visible
                        </p>
                        <p className="text-gray-600 text-sm">
                          Each click loads another page of purchases. Keep clicking until you see all your movies from the year.
                        </p>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        5
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Find the Purchase History Requests</h3>
                        <p className="text-gray-700 mb-2">
                          In the Network tab, look for requests named <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">purchase-history</code>
                        </p>
                        <p className="text-gray-600 text-sm">
                          You&apos;ll see multiple requests (one for each page you loaded). You need to copy the JSON from each one.
                        </p>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        6
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Copy Each Response</h3>
                        <p className="text-gray-700 mb-2">
                          For each <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">purchase-history</code> request:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                          <li>Double-click the request name to open it in a new tab</li>
                          <li>The raw JSON will be displayed</li>
                          <li>Select all (<kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs font-mono">Cmd+A</kbd> / <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs font-mono">Ctrl+A</kbd>) and copy (<kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs font-mono">Cmd+C</kbd> / <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs font-mono">Ctrl+C</kbd>)</li>
                        </ul>
                      </div>
                    </div>

                    {/* Step 7 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        7
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Paste Into the App</h3>
                        <p className="text-gray-700 mb-2">
                          Return to this page and paste each JSON response into a separate tab
                        </p>
                        <p className="text-gray-600 text-sm">
                          Click <strong>&quot;Add Another Tab&quot;</strong> for each additional page of purchases you need to paste.
                        </p>
                      </div>
                    </div>

                    {/* Tip */}
                    <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
                      <p className="text-green-900 font-semibold mb-1">💡 Pro Tip</p>
                      <p className="text-green-800 text-sm">
                        If you only have a few movies, you might only need to paste one tab. If you have many purchases, you&apos;ll need to paste multiple tabs (one for each &quot;Load More&quot; page).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-6 border-t border-gray-200 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
