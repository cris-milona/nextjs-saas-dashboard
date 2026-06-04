"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-6 h-6" />
        <p className="text-lg font-semibold">Something went wrong</p>
      </div>
      <p className="text-gray-500 text-sm">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
