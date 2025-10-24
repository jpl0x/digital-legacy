import { JournalEntry } from '@/lib/database/entries'

// Count words in text
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

// Count characters in text
export function countCharacters(text: string): number {
  return text.length
}

// Calculate total words across all entries
export function calculateTotalWords(entries: JournalEntry[]): number {
  return entries.reduce((total, entry) => total + countWords(entry.content), 0)
}

// Calculate average words per entry
export function calculateAverageWords(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0
  return Math.round(calculateTotalWords(entries) / entries.length)
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Check if entry was edited
export function wasEdited(createdAt: string, updatedAt: string): boolean {
  return updatedAt !== createdAt
}