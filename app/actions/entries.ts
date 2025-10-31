'use server'

import { revalidatePath } from 'next/cache'
import { 
  createEntry as dbCreateEntry,
  updateEntry as dbUpdateEntry,
  deleteEntry as dbDeleteEntry
} from '@/lib/database/entries'
import { PLACEHOLDER_USER_ID, DEFAULT_ENTRY_TYPE } from '@/lib/constants'

/**
 * Server action to create a new journal entry
 * Validates content, creates entry in database, and revalidates the page cache
 * 
 * @param content - The text content of the journal entry
 * @returns Object containing success status and either data or error message
 * 
 * @example
 * const result = await createEntryAction('Today was a great day...')
 * if (result.success) {
 *   console.log('Entry created:', result.data)
 * }
 */
export async function createEntryAction(content: string) {
  if (!content.trim()) {
    return { success: false, error: 'Content cannot be empty' }
  }

  const result = await dbCreateEntry({
    user_id: PLACEHOLDER_USER_ID,
    content: content.trim(),
    entry_type: DEFAULT_ENTRY_TYPE
  })

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  return { success: true, data: result.data }
}

/**
 * Server action to update an existing journal entry
 * Validates content, updates entry in database, and revalidates the page cache
 * 
 * @param id - The numeric ID of the entry to update
 * @param content - The new text content for the entry
 * @returns Object containing success status and either updated data or error message
 * 
 * @example
 * const result = await updateEntryAction(42, 'Updated content...')
 * if (!result.success) {
 *   console.error('Update failed:', result.error)
 * }
 */
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

/**
 * Server action to permanently delete a journal entry
 * Removes entry from database and revalidates the page cache
 * 
 * @param id - The numeric ID of the entry to delete
 * @returns Object containing success status and error message if failed
 * 
 * @example
 * const result = await deleteEntryAction(42)
 * if (result.success) {
 *   console.log('Entry deleted successfully')
 * }
 */
export async function deleteEntryAction(id: number) {
  const result = await dbDeleteEntry(id)

  if (result.error) {
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  return { success: true }
}