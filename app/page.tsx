'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [entry, setEntry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000', // Temporary, we'll add auth later
          content: entry,
          entry_type: 'freeform'
        })

      if (error) throw error

      setMessage('Entry saved successfully!')
      setEntry('') // Clear the form
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Digital Legacy - For My Son
        </h1>
        <p className="text-gray-600 mb-8">
          Start preserving your thoughts, memories, and wisdom.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Write your journal entry:
          </label>
          
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="What's on your mind? What do you want your loved ones to know?"
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={loading}
          />

          <div className="mt-4 flex items-center justify-between">
            <button
              type="submit"
              disabled={loading || !entry.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Entry'}
            </button>

            {message && (
              <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}