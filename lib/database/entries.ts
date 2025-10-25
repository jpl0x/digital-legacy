import { supabase } from '@/lib/supabase'

export interface JournalEntry {
  id: number
  created_at: string
  updated_at: string
  user_id: string
  content: string
  entry_type: string
}

export interface CreateEntryData {
  user_id: string
  content: string
  entry_type?: string
}

export interface UpdateEntryData {
  content: string
}

/**
 * Fetches all journal entries for a specific user, ordered by creation date (newest first)
 * 
 * @param userId - The UUID of the user whose entries to fetch. Defaults to placeholder ID for single-user mode
 * @returns Object containing either the entry data array or an error object
 * 
 * @example
 * const { data, error } = await fetchEntries('user-uuid-123')
 * if (error) {
 *   console.error('Failed to fetch entries:', error)
 * }
 */
export async function fetchEntries(userId: string = '00000000-0000-0000-0000-000000000000') {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching entries:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

/**
 * Creates a new journal entry in the database
 * 
 * @param entryData - Object containing the entry content and user information
 * @param entryData.user_id - UUID of the user creating the entry
 * @param entryData.content - The text content of the journal entry
 * @param entryData.entry_type - Optional entry type, defaults to 'freeform'
 * @returns Object containing the created entry data or an error
 * 
 * @example
 * const { data, error } = await createEntry({
 *   user_id: 'user-123',
 *   content: 'Today was a good day...',
 *   entry_type: 'freeform'
 * })
 */
export async function createEntry(entryData: CreateEntryData) {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: entryData.user_id,
      content: entryData.content,
      entry_type: entryData.entry_type || 'freeform'
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating entry:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

/**
 * Updates an existing journal entry's content and timestamp
 * 
 * @param id - The numeric ID of the entry to update
 * @param updateData - Object containing the updated content
 * @param updateData.content - The new text content for the entry
 * @returns Object containing the updated entry data or an error
 * 
 * @example
 * const { data, error } = await updateEntry(42, {
 *   content: 'Updated entry text...'
 * })
 */
export async function updateEntry(id: number, updateData: UpdateEntryData) {
  const { data, error } = await supabase
    .from('journal_entries')
    .update({
      content: updateData.content,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating entry:', error)
    return { data: null, error }
  }

  return { data, error: null }
}

/**
 * Permanently deletes a journal entry from the database
 * 
 * @param id - The numeric ID of the entry to delete
 * @returns Object indicating success or containing an error
 * 
 * @example
 * const { success, error } = await deleteEntry(42)
 * if (success) {
 *   console.log('Entry deleted successfully')
 * }
 */
export async function deleteEntry(id: number) {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting entry:', error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

/**
 * Searches journal entries by content using case-insensitive pattern matching
 * 
 * @param searchTerm - The text to search for within entry content
 * @param userId - The UUID of the user whose entries to search. Defaults to placeholder ID
 * @returns Object containing matching entries or an error
 * 
 * @example
 * const { data, error } = await searchEntries('vacation', 'user-123')
 * // Returns all entries containing the word 'vacation'
 */
export async function searchEntries(
  searchTerm: string, 
  userId: string = '00000000-0000-0000-0000-000000000000'
) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .ilike('content', `%${searchTerm}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching entries:', error)
    return { data: null, error }
  }

  return { data, error: null }
}