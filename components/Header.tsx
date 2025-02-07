import { FiCalendar, FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  userName?: string | null;
}

export function Header({ userName }: HeaderProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 rounded-xl p-2 shadow-md">
              <FiCalendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Calendar</h1>
              <p className="text-gray-600">Welcome back, {userName}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center px-6 py-3 text-base font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <FiLogOut className="mr-2 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
} 