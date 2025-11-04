import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-slate-300 mb-4">404</div>
        
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Page Not Found
        </h1>
        
        <p className="text-slate-600 mb-6">
          This memory doesn't exist yet. Perhaps it's waiting to be written?
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Return to Your Legacy
        </Link>
        
        <div className="mt-8 text-sm text-slate-500">
          <p>Lost memories can't be recovered,</p>
          <p>but new ones can always be created.</p>
        </div>
      </div>
    </div>
  )
}