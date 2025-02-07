import { render, screen, fireEvent } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import { Header } from '../Header';

jest.mock('next-auth/react');

describe('Header', () => {
  const mockSignOut = signOut as jest.Mock;

  beforeEach(() => {
    mockSignOut.mockClear();
  });

  it('renders user name when provided', () => {
    render(<Header userName="John Doe" />);
    expect(screen.getByText('Welcome back, John Doe')).toBeInTheDocument();
  });

  it('handles missing user name gracefully', () => {
    render(<Header userName={null} />);
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  it('calls signOut when sign out button is clicked', () => {
    render(<Header userName="John Doe" />);
    
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('renders the calendar title', () => {
    render(<Header userName="John Doe" />);
    expect(screen.getByText('Your Calendar')).toBeInTheDocument();
  });
}); 