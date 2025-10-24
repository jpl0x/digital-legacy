'use client'

import { useState } from 'react'
import { JournalEntry } from '@/lib/database/entries'
import { formatDate, wasEdited } from '@/lib/utils/text'
import { updateEntryAction, deleteEntryAction } from '@/app/actions/entries'

interface EntryCardProps {
  entry: JournalEntry
}

export function EntryCard({ entry }: EntryCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(entry.content)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    const result = await updateEntryAction(entry.id, editContent)
    
    if (result.success) {
      setIsEditing(false)
    } else {
      alert('Failed to update entry: ' + result.error)
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this entry?')
    if (!confirmed) return

    setIsDeleting(true)
    const result = await deleteEntryAction(entry.id)
    
    if (!result.success) {
      alert('Failed to delete entry: ' + result.error)
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setEditContent(entry.content)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-500">
          {formatDate(entry.created_at)}
          {wasEdited(entry.created_at, entry.updated_at) && (
            <span className="block text-xs text-gray-400 mt-1">
              Last edited: {formatDate(entry.updated_at)}
            </span>
          )}
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            disabled={isEditing || isDeleting}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
            disabled={isEditing || isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg mb-2 placeholder:text-gray-500"
            rows={6}
            disabled={isSaving}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 disabled:bg-gray-400"
              disabled={isSaving || !editContent.trim()}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm hover:bg-gray-400"
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
      )}
    </div>
  )
}