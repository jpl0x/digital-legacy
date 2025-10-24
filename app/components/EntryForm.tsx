'use client'

import { useState } from 'react'
import { countWords, countCharacters } from '@/lib/utils/text'
import { createEntryAction } from '@/app/actions/entries'

export function EntryForm() {
  const [entry, setEntry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const result = await createEntryAction(entry)

    if (result.success) {
      setMessage('Entry saved successfully!')
      setEntry('')
    } else {
      setMessage(`Error: ${result.error}`)
    }

    setLoading(false)

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const wordCount = countWords(entry)
  const charCount = countCharacters(entry)

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Write your journal entry:
        </label>
        <span className="text-sm text-gray-500">
          {wordCount} words · {charCount} characters
        </span>
      </div>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="What's on your mind? What do you want your loved ones to know?"
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-500"
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
  )
}