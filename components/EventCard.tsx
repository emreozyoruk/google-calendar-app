import { MdLocationOn, MdAccessTime } from 'react-icons/md';

interface EventCardProps {
  event: {
    id: string;
    summary: string;
    description?: string;
    location?: string;
    colorId?: string;
    start: {
      dateTime?: string;
      date?: string;
    };
  };
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = event.start.dateTime || event.start.date;
  if (!eventDate) return null;

  return (
    <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
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
              <time dateTime={eventDate} className="text-sm">
                {new Date(eventDate).toLocaleString(undefined, {
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
  );
} 