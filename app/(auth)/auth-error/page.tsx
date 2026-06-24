import Link from "next/link";

import { Zap } from "lucide-react";

import { paths } from "@/lib/paths";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: "There is a problem with the server configuration. Please contact support.",
  AccessDenied: "You do not have permission to sign in.",
  OAuthSignin: "Something went wrong initiating sign-in. Please try again.",
  OAuthCallback: "Something went wrong during the sign-in callback. Please try again.",
  OAuthAccountNotLinked: "This email is already associated with another sign-in method.",
  Verification: "The sign-in link has expired or has already been used.",
  Default: "An unexpected error occurred. Please try again.",
};

const AuthErrorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const { error } = await searchParams;
  const message = ERROR_MESSAGES[error ?? ""] ?? ERROR_MESSAGES.Default;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-500 rounded-xl p-3 mb-4">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Authentication Error
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">{message}</p>
        </div>

        <Link
          href={paths.login()}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default AuthErrorPage;
