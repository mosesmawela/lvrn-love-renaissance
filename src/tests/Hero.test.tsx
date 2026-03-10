import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../../components/Hero';
import { ExperienceProvider } from '../../components/ExperienceProvider';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Hero Component', () => {
  it('renders the connect button and logo', () => {
    render(
      <ExperienceProvider>
        <Hero />
      </ExperienceProvider>
    );

    // Check if the Connect button exists
    const connectButton = screen.getByRole('button', { name: /connect/i });
    expect(connectButton).toBeInTheDocument();

    // Check if the logo image exists
    const logo = screen.getByAltText('LVRN');
    expect(logo).toBeInTheDocument();
  });

  it('handles connect button click correctly', () => {
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    vi.useFakeTimers();

    render(
      <ExperienceProvider>
        <Hero />
      </ExperienceProvider>
    );

    const connectButton = screen.getByRole('button', { name: /connect/i });
    fireEvent.click(connectButton);

    // Advance the timers by 500ms since there's a setTimeout in the component
    vi.advanceTimersByTime(500);

    // Verify window.open was called
    expect(windowOpenSpy).toHaveBeenCalled();

    // Cleanup
    windowOpenSpy.mockRestore();
    vi.useRealTimers();
  });
});
