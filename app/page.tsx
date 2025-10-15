'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching entries:', error)
    } else {
      setEntries(data || [])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: '00000000-0000-0000-0000-000000000000', // Placeholder user ID
          content: entry,
          entry_type: 'freeform'
        })

      if (error) throw error

      setMessage('Entry saved successfully!')
      setEntry('') // Clear the form
      fetchEntries() // Refresh the list of entries
    } catch (error: unknown) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
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
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Write your journal entry:
            </label>
            <span className="text-sm text-gray-500">
              {entry.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          
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

        {/* Display saved entries */}
        {entries.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Your Journal Entries ({entries.length})
            </h2>
            
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(entry.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}