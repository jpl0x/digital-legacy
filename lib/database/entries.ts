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

// Fetch all entries for a user
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

// Create a new entry
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

// Update an existing entry
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

// Delete an entry
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

// Search entries by content
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