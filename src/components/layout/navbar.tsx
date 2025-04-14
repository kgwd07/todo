// components/layout/navbar.tsx
import Link from "next/link";
import { UserButton,
  //  SignInButton,
  //   SignUpButton
   } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-blue-600">
              TodoApp
            </Link>
          </div>
          
          <div className="flex items-center">
            {userId ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* <SignInButton mode="modal">
                  <button className="text-gray-700 hover:text-blue-600 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    Sign Up
                  </button>
                </SignUpButton> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}