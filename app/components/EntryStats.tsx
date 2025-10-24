import { JournalEntry } from '@/lib/database/entries'
import { calculateTotalWords, calculateAverageWords } from '@/lib/utils/text'

interface EntryStatsProps {
  entries: JournalEntry[]
}

export function EntryStats({ entries }: EntryStatsProps) {
  const totalWords = calculateTotalWords(entries)
  const avgWords = calculateAverageWords(entries)

  return (
    <div className="mt-12">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-900">
          <strong>Total words preserved:</strong> {totalWords.toLocaleString()}
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{entries.length}</p>
          <p className="text-xs text-gray-600">Total Entries</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {totalWords.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600">Words Preserved</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{avgWords}</p>
          <p className="text-xs text-gray-600">Avg Words/Entry</p>
        </div>
      </div>
    </div>
  )
}