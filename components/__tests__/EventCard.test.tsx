import { render, screen } from '@testing-library/react';
import { EventCard } from '../EventCard';
import { mockEvents } from '../../test/test-utils';

describe('EventCard', () => {
  it('renders event details correctly', () => {
    render(<EventCard event={mockEvents[0]} />);

    // Test event summary
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();

    // Test event description
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();

    // Test event location
    expect(screen.getByText('Test Location 1')).toBeInTheDocument();

    // Test event date/time is present (exact format may vary by locale)
    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('datetime', '2024-01-01T10:00:00Z');
  });

  it('renders minimal event details when optional fields are missing', () => {
    render(<EventCard event={mockEvents[1]} />);

    // Test event summary
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();

    // Test that optional fields are not rendered
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Location')).not.toBeInTheDocument();
  });

  it('handles missing date correctly', () => {
    const eventWithoutDate = {
      ...mockEvents[0],
      start: {},
    };

    // Component should return null when date is missing
    const { container } = render(<EventCard event={eventWithoutDate} />);
    expect(container).toBeEmptyDOMElement();
  });
}); 