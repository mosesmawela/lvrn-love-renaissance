import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingForm } from './BookingForm';
import { ExperienceProvider } from './ExperienceProvider';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock framer-motion to prevent issues in JSDOM
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react to avoid issues with missing SVGs in JSDOM
vi.mock('lucide-react', () => {
  return new Proxy({}, {
    get: function (target, prop) {
      if (prop === '__esModule') return true;
      return function MockIcon() {
        return <span data-testid={`icon-${String(prop)}`} />;
      };
    }
  });
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ExperienceProvider>{ui}</ExperienceProvider>);
};

describe('BookingForm', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders initial step correctly', () => {
    renderWithProviders(<BookingForm onClose={mockOnClose} />);

    expect(screen.getByText('Artist Booking Request')).toBeInTheDocument();
    expect(screen.getByText(/Promoter Details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('can navigate to the next step after filling required fields', () => {
    renderWithProviders(<BookingForm onClose={mockOnClose} />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });

    // Click Next
    fireEvent.click(screen.getByRole('button', { name: /Next Step/i }));

    // Should be on Step 2
    expect(screen.getByText(/Event Overview/i)).toBeInTheDocument();
  });
});
