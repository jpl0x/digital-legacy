import { Metadata } from 'next'
import { fetchEntries } from '@/lib/database/entries'
import { EntryForm } from './components/EntryForm'
import { EntryList } from './components/EntryList'
import { APP_META } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${APP_META.name} - ${APP_META.tagline}`,
  description: APP_META.description,
}

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
          {APP_META.name} - {APP_META.tagline}
        </h1>
        <p className="text-gray-600 mb-8">
          {APP_META.description}
        </p>

        <EntryForm />

        <EntryList entries={entries || []} />
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>{APP_META.copyright}</p>
        <p className="mt-1">{APP_META.footer}</p>
      </footer>
    </div>
  )
}