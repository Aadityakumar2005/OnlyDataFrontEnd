import {
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

export default function SignedOutPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to access the more content.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </button>
      </div>
    </div>
  )
}
