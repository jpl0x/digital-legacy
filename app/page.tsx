'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

// Performance Tracking

if (typeof window !== 'undefined') {
  console.log('Digital Legacy loaded:', new Date().toISOString())
}


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

  const deleteEntry = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if (!confirmed) return

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry.')
    } else {
      fetchEntries() // Refresh the list after deletion
    }
  }

  const startEdit = (id: number, content: string) => {
    setEditingId(id)
    setEditContent(content)
  }

  const saveEdit = async (id: number) => {
    const { error } = await supabase
      .from('journal_entries')
      .update({ content: editContent })
      .eq('id', id)

    if (error) {
      alert('Failed to update entry.')
    } else {
      setEditingId(null)
      fetchEntries() // Refresh the list after update
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
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
      setEntry('')
      fetchEntries()
    } catch (error: unknown) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              {entry.trim().split(/\s+/).filter(Boolean).length} words · {entry.length} characters
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

        {/* Display saved entries */}
        {entries.length > 0 ? (
          <div className="mt-12">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900">
                <strong>Total words preserved:</strong> {entries.reduce((total, e) => total + e.content.trim().split(/\s+/).filter(Boolean).length, 0).toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">{entries.length}</p>
                <p className="text-xs text-gray-600">Total Entries</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {entries.reduce((total, e) => total + e.content.trim().split(/\s+/).filter(Boolean).length, 0).toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">Words Preserved</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(entries.reduce((total, e) => total + e.content.trim().split(/\s+/).filter(Boolean).length, 0) / entries.length) || 0}
                </p>
                <p className="text-xs text-gray-600">Avg Words/Entry</p>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search your entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
              />
              {searchTerm && (
                <p className="text-sm text-gray-500 mt-2">
                  Found {filteredEntries.length} of {entries.length} entries
                </p>
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
              Your Journal Entries 
              <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                {entries.length}
              </span>
            </h2>
            
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-2"> 
                    <p className="text-sm text-gray-500">
                      {new Date(entry.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    {entry.updated_at && entry.updated_at !== entry.created_at && (
                      <span className="block text-xs text-gray-400 mt-1">
                        Last edited: {new Date(entry.updated_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                    </p>
                    <div className="flex gap-2">
                     
                      <button
                        onClick={() => startEdit(entry.id, entry.content)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {editingId === entry.id ? (
                    <div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg mb-2 placeholder:text-gray-500"
                        rows={6}
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => saveEdit(entry.id)} 
                          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button 
                          onClick={cancelEdit} 
                          className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center text-gray-500">
            <p className="text-lg">No entries yet. Start preserving your thoughts above.</p>
          </div>
        )}
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Digital Legacy &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Building something meaningful, one entry at a time.</p>
      </footer>
    </div>
  )
}