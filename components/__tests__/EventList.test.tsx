import { render, screen } from '@testing-library/react';
import { EventList } from '../EventList';
import { mockEvents } from '../../test/test-utils';

describe('EventList', () => {
  it('renders loading state correctly', () => {
    render(<EventList events={[]} loading={true} error={null} />);
    expect(screen.getByText('Loading your events...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch events';
    render(<EventList events={[]} loading={false} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders empty state correctly', () => {
    render(<EventList events={[]} loading={false} error={null} />);
    expect(screen.getByText('No upcoming events found')).toBeInTheDocument();
  });

  it('renders events correctly', () => {
    render(<EventList events={mockEvents} loading={false} error={null} />);
    
    // Test that both events are rendered
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();

    // Test that event details are rendered
    expect(screen.getByText('Test Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Location 1')).toBeInTheDocument();
  });
}); 