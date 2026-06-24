"use client";

import Link from "next/link";

import { AlertCircle } from "lucide-react";

import { paths } from "@/lib/paths";

const RootError = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle aria-hidden="true" className="w-6 h-6" />
        <p className="text-lg font-semibold text-gray-900">
          Something went wrong
        </p>
      </div>
      <p className="text-sm text-gray-500">
        An unexpected error occurred. You can try again or go back to the
        dashboard.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Try again
        </button>
        <Link
          href={paths.home()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default RootError;
