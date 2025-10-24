'use client'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  totalEntries: number
  filteredCount: number
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  totalEntries, 
  filteredCount 
}: SearchBarProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search your entries..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
      />
      {searchTerm && (
        <p className="text-sm text-gray-500 mt-2">
          Found {filteredCount} of {totalEntries} entries
        </p>
      )}
    </div>
  )
}