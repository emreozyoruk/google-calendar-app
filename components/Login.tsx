import { FiCalendar } from 'react-icons/fi';
import { signIn } from 'next-auth/react';

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-md w-full space-y-10 hover:shadow-3xl transition-all duration-300">
        <div className="text-center space-y-6">
          <div className="bg-blue-500 rounded-full p-4 w-20 h-20 mx-auto shadow-lg">
            <FiCalendar className="w-full h-full text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Calendar Integration</h1>
          <p className="text-lg text-gray-600">Manage your schedule effortlessly</p>
        </div>
        <button
          onClick={() => signIn('google')}
          className="w-full group relative flex items-center justify-center px-8 py-4 border-2 border-transparent text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <img src="/google.svg" alt="Google" className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
} 