import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';

// Mock Supabase
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

const TestComponent = () => {
  const { session, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div data-testid="session">{session ? 'Has Session' : 'No Session'}</div>
      <div data-testid="user">{user ? user.email : 'No User'}</div>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides initial loading state and handles missing session', async () => {
    // Setup mock
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

    // Initial state should be loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the auth check to resolve
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check states after load
    expect(screen.getByTestId('session')).toHaveTextContent('No Session');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');
  });

  it('provides session and user when session exists', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'fake-token',
    };

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

    // Wait for load to finish
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check states
    expect(screen.getByTestId('session')).toHaveTextContent('Has Session');
    expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');
  });

  it('updates state when auth state changes', async () => {
    const initialSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'fake-token',
    };

    const newSession = {
      user: { id: '456', email: 'new@example.com' },
      access_token: 'new-fake-token',
    };

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: initialSession },
    } as any);

    let authStateCallback: any = null;
    vi.mocked(supabase.auth.onAuthStateChange).mockImplementation((callback) => {
      authStateCallback = callback;
      return {
        data: { subscription: { unsubscribe: vi.fn() } },
      } as any;
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for initial load to finish
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('test@example.com');

    // Simulate auth state change
    act(() => {
      authStateCallback('SIGNED_IN', newSession);
    });

    // Check states after auth state change
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('new@example.com');
    });
  });

  it('provides sign in and sign out functions', async () => {
    const user = userEvent.setup();

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    vi.mocked(supabase.auth.signInWithOAuth).mockResolvedValue({} as any);
    vi.mocked(supabase.auth.signOut).mockResolvedValue({} as any);

    const ActionComponent = () => {
      const { signInWithGoogle, signOut } = useAuth();
      return (
        <div>
          <button onClick={signInWithGoogle}>Sign In</button>
          <button onClick={signOut}>Sign Out</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <ActionComponent />
      </AuthProvider>
    );

    await user.click(screen.getByText('Sign In'));
    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({ provider: 'google' });

    await user.click(screen.getByText('Sign Out'));
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });
});
