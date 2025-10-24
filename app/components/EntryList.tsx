'use client'

import { useState } from 'react'
import { JournalEntry } from '@/lib/database/entries'
import { EntryCard } from './EntryCard'
import { SearchBar } from './SearchBar'
import { EntryStats } from './EntryStats'

interface EntryListProps {
  entries: JournalEntry[]
}

export function EntryList({ entries }: EntryListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEntries = entries.filter(entry =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (entries.length === 0) {
    return (
      <div className="mt-12 text-center text-gray-500">
        <p className="text-lg">No entries yet. Start preserving your thoughts above.</p>
      </div>
    )
  }

  return (
    <>
      <EntryStats entries={entries} />

      <div className="mt-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalEntries={entries.length}
          filteredCount={filteredEntries.length}
        />

        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          Your Journal Entries
          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
            {entries.length}
          </span>
        </h2>

        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </>
  )
}