'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getGoogleCalendarEvents } from '@/services/googleCalendar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '@/components/Login';
import { Header } from '@/components/Header';
import { EventList } from '@/components/EventList';

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
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <Header userName={session.user?.name} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EventList events={events} loading={loading} error={error} />
      </main>
    </div>
  );
}
