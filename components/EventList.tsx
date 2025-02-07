import { FiCalendar, FiAlertCircle } from 'react-icons/fi';
import { EventCard } from './EventCard';

interface EventListProps {
  events: any[];
  loading: boolean;
  error: string | null;
}

export function EventList({ events, loading, error }: EventListProps) {
  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-6 text-lg text-gray-600">Loading your events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
        <div className="flex flex-col items-center justify-center text-red-500">
          <FiAlertCircle className="h-16 w-16" />
          <p className="mt-6 text-lg text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FiCalendar className="h-16 w-16" />
          <p className="mt-6 text-lg">No upcoming events found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
} 