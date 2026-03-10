import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';

// Mock Supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

// Test component to consume the AuthContext
const TestComponent = () => {
  const { session, user, loading } = useAuth();

  if (loading) return <div data-testid="loading">Loading...</div>;

  return (
    <div>
      <div data-testid="user-id">{user ? user.id : 'No user'}</div>
      <div data-testid="session-status">{session ? 'Has session' : 'No session'}</div>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides initial loading state', () => {
    // Setup a promise that we won't resolve immediately to keep it in loading state
    vi.mocked(supabase.auth.getSession).mockReturnValue(new Promise(() => {}));
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('sets user and session when getSession returns data', async () => {
    const mockSession = { user: { id: 'test-user-id' } };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: mockSession },
    } as any);

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('user-id')).toHaveTextContent('test-user-id');
    expect(screen.getByTestId('session-status')).toHaveTextContent('Has session');
  });

  it('handles null session correctly', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('user-id')).toHaveTextContent('No user');
    expect(screen.getByTestId('session-status')).toHaveTextContent('No session');
  });
});
