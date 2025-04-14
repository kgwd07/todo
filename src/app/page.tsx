import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Organize Your Life</h1>
        <p className="text-xl mb-8">
          A simple todo app to keep track of your tasks and boost productivity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {userId ? (
            <Link 
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                href="/sign-in" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Easy to Use</h2>
          <p>Simple interface that lets you focus on what matters - your tasks.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Secure</h2>
          <p>Your data is protected with industry-standard authentication.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Free</h2>
          <p>Get organized at no cost. Start managing your tasks today.</p>
        </div>
      </div>
    </div>
  );
}