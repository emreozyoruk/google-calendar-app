import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

// Mock session data
export const mockSession = {
  user: {
    name: 'Test User',
    email: 'test@example.com',
  },
  expires: '2100-01-01T00:00:00.000Z',
  accessToken: 'mock-access-token',
};

// Mock event data
export const mockEvents = [
  {
    id: '1',
    summary: 'Test Event 1',
    description: 'Test Description 1',
    location: 'Test Location 1',
    start: {
      dateTime: '2024-01-01T10:00:00Z',
    },
    colorId: '1',
  },
  {
    id: '2',
    summary: 'Test Event 2',
    start: {
      dateTime: '2024-01-02T14:00:00Z',
    },
  },
];

// Custom render function with providers
function render(ui: React.ReactElement, { session = null, ...options } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { render }; 