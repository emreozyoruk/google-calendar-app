'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getGoogleCalendarEvents } from '@/services/googleCalendar';
import { FiCalendar, FiLogOut, FiAlertCircle } from 'react-icons/fi';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (session) {
        setLoading(true);
        setError(null);
        try {
          const calendarEvents = await getGoogleCalendarEvents();
          setEvents(calendarEvents || []);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch events';
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, [session]);

  if (!session) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-xl p-2 shadow-md">
                <FiCalendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Calendar</h1>
                <p className="text-gray-600">Welcome back, {session.user?.name}</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-6 text-lg text-gray-600">Loading your events...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
            <div className="flex flex-col items-center justify-center text-red-500">
              <FiAlertCircle className="h-16 w-16" />
              <p className="mt-6 text-lg text-center">{error}</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <FiCalendar className="h-16 w-16" />
              <p className="mt-6 text-lg">No upcoming events found</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  {event.colorId && (
                    <div
                      className="absolute top-0 left-0 w-full h-1.5"
                      style={{ backgroundColor: `var(--event-color-${event.colorId})` }}
                    />
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-4">
                      {event.summary}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <MdAccessTime className="flex-shrink-0 w-5 h-5 mr-3 text-blue-500" />
                        <time dateTime={event.start.dateTime || event.start.date} className="text-sm">
                          {new Date(event.start.dateTime || event.start.date).toLocaleString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <MdLocationOn className="flex-shrink-0 w-5 h-5 mr-3 text-blue-500" />
                          <p className="text-sm line-clamp-1">{event.location}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {event.description && (
                    <div className="px-8 pb-8">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
