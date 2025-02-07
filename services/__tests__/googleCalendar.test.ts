import { getGoogleCalendarEvents } from '../googleCalendar';
import { mockEvents } from '../../test/test-utils';

describe('googleCalendar service', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  it('fetches events successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockEvents,
    });

    const events = await getGoogleCalendarEvents();
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/calendar');
    expect(events).toEqual(mockEvents);
  });

  it('handles API error correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getGoogleCalendarEvents()).rejects.toThrow('Failed to fetch events');
  });

  it('handles network error correctly', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await expect(getGoogleCalendarEvents()).rejects.toThrow('Network error');
  });
}); 