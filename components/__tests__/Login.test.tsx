import { render, screen, fireEvent } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { Login } from '../Login';

jest.mock('next-auth/react');

describe('Login', () => {
  const mockSignIn = signIn as jest.Mock;

  beforeEach(() => {
    mockSignIn.mockClear();
  });

  it('renders login page correctly', () => {
    render(<Login />);
    
    // Test title and description
    expect(screen.getByText('Calendar Integration')).toBeInTheDocument();
    expect(screen.getByText('Manage your schedule effortlessly')).toBeInTheDocument();

    // Test sign in button
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('calls signIn when Google button is clicked', () => {
    render(<Login />);
    
    const signInButton = screen.getByText('Sign in with Google');
    fireEvent.click(signInButton);

    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith('google');
  });

  it('renders Google logo', () => {
    render(<Login />);
    
    const googleLogo = screen.getByAltText('Google');
    expect(googleLogo).toBeInTheDocument();
    expect(googleLogo.tagName).toBe('IMG');
    expect(googleLogo).toHaveAttribute('src', '/google.svg');
  });
}); 