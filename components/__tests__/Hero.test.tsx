import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Hero } from '../Hero';
import { useExperience } from '../ExperienceProvider';

// Mock the dependencies
vi.mock('../ExperienceProvider', () => ({
  useExperience: vi.fn(),
}));

vi.mock('../../constants', () => ({
  SOCIAL_LINKS: [
    { name: 'Linktree', url: 'https://linktr.ee/lvrn' }
  ],
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, onClick, whileHover, whileTap, ...props }: any) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
  },
  useScroll: () => ({ scrollY: 0 }),
  useTransform: () => 0,
}));

// Mock gsap
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    timeline: () => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    }),
  },
}));

vi.mock('gsap/TextPlugin', () => ({
  TextPlugin: {},
}));

describe('Hero Component', () => {
  const mockShowNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useExperience as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      showNotification: mockShowNotification,
    });

    // Mock window.open
    window.open = vi.fn();

    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<Hero />);

    // Check if the logo is present
    const logo = screen.getByAltText('LVRN');
    expect(logo).toBeInTheDocument();

    // Check if the Connect button is present
    const connectButton = screen.getByText('Connect');
    expect(connectButton).toBeInTheDocument();
  });

  it('handles connect button click correctly', () => {
    render(<Hero />);

    const connectButton = screen.getByText('Connect');
    fireEvent.click(connectButton);

    // Should show notification
    expect(mockShowNotification).toHaveBeenCalledWith('Opening Linktree in new tab...', 'info');

    // Advance timers by 500ms
    vi.advanceTimersByTime(500);

    // Should open the link in a new tab
    expect(window.open).toHaveBeenCalledWith('https://linktr.ee/lvrn', '_blank');
  });
});
