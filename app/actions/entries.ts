'use server'

import { revalidatePath } from 'next/cache'
import { 
  createEntry as dbCreateEntry,
  updateEntry as dbUpdateEntry,
  deleteEntry as dbDeleteEntry
} from '@/lib/database/entries'

// Server action to create a new entry
export async function createEntryAction(content: string) {
  if (!content.trim()) {
    return { success: false, error: 'Content cannot be empty' }
  }

  const result = await dbCreateEntry({
    user_id: '00000000-0000-0000-0000-000000000000', // Placeholder for now
    content: content.trim(),
    entry_type: 'freeform'
  })

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  return { success: true, data: result.data }
}

// Server action to update an entry
export async function updateEntryAction(id: number, content: string) {
  if (!content.trim()) {
    return { success: false, error: 'Content cannot be empty' }
  }

  const result = await dbUpdateEntry(id, { content: content.trim() })

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  return { success: true, data: result.data }
}

// Server action to delete an entry
export async function deleteEntryAction(id: number) {
  const result = await dbDeleteEntry(id)

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  return { success: true }
}