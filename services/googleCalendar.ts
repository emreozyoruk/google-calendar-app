export const getGoogleCalendarEvents = async () => {
  try {
    const response = await fetch('/api/calendar');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}; 