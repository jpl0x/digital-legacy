import { fetchEntries } from '@/lib/database/entries'
import { EntryForm } from './components/EntryForm'
import { EntryList } from './components/EntryList'

export default async function Home() {
  // Fetch entries on the server
  const { data: entries, error } = await fetchEntries()

  if (error) {
    console.error('Error loading entries:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          Digital Legacy - For My Son
        </h1>
        <p className="text-gray-600 mb-8">
          Start preserving your thoughts, memories, and wisdom.
        </p>

        <EntryForm />

        <EntryList entries={entries || []} />
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>Digital Legacy &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">Building something meaningful, one entry at a time.</p>
      </footer>
    </div>
  )
}