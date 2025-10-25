import { JournalEntry } from '@/lib/database/entries'

/**
 * Counts the number of words in a text string
 * Words are defined as sequences of non-whitespace characters separated by whitespace
 * 
 * @param text - The text string to count words in
 * @returns The number of words found
 * 
 * @example
 * countWords('Hello world') // returns 2
 * countWords('  spaces   everywhere  ') // returns 2
 * countWords('') // returns 0
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Counts the number of characters in a text string
 * Includes spaces, punctuation, and all characters
 * 
 * @param text - The text string to count characters in
 * @returns The total number of characters
 * 
 * @example
 * countCharacters('Hello') // returns 5
 * countCharacters('Hello world') // returns 11 (includes space)
 */
export function countCharacters(text: string): number {
  return text.length
}

/**
 * Calculates the total word count across all journal entries
 * Useful for displaying aggregate statistics
 * 
 * @param entries - Array of journal entry objects
 * @returns The sum of words across all entries
 * 
 * @example
 * const entries = [
 *   { content: 'Hello world', ... },
 *   { content: 'Goodbye world', ... }
 * ]
 * calculateTotalWords(entries) // returns 4
 */
export function calculateTotalWords(entries: JournalEntry[]): number {
  return entries.reduce((total, entry) => total + countWords(entry.content), 0)
}

/**
 * Calculates the average number of words per entry
 * Returns 0 if the entries array is empty to avoid division by zero
 * 
 * @param entries - Array of journal entry objects
 * @returns The average word count per entry, rounded to nearest integer
 * 
 * @example
 * const entries = [
 *   { content: 'Two words', ... },
 *   { content: 'Also two words', ... }
 * ]
 * calculateAverageWords(entries) // returns 2
 */
export function calculateAverageWords(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0
  return Math.round(calculateTotalWords(entries) / entries.length)
}

/**
 * Formats a date string into a human-readable format
 * Uses British English date format (day month year, 24-hour time)
 * 
 * @param dateString - ISO 8601 date string (e.g., from database timestamp)
 * @returns Formatted date string (e.g., "24 October 2025, 13:45")
 * 
 * @example
 * formatDate('2025-10-24T13:45:00Z') // returns "24 October 2025, 13:45"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Checks if a journal entry has been edited after creation
 * Compares the created_at and updated_at timestamps
 * 
 * @param createdAt - ISO date string of when entry was created
 * @param updatedAt - ISO date string of when entry was last updated
 * @returns True if entry was edited, false if timestamps match
 * 
 * @example
 * wasEdited('2025-10-24T10:00:00Z', '2025-10-24T10:00:00Z') // returns false
 * wasEdited('2025-10-24T10:00:00Z', '2025-10-24T11:00:00Z') // returns true
 */
export function wasEdited(createdAt: string, updatedAt: string): boolean {
  return updatedAt !== createdAt
}