import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Overview } from './OverviewNew';

// Mock framer-motion to prevent jsdom issues with animations
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

// Mock ArtistAnalytics as it's not the focus of this test
vi.mock('./ArtistAnalytics', () => ({
  ArtistAnalytics: () => <div data-testid="artist-analytics-mock">Mocked Artist Analytics</div>,
}));

describe('Overview KPIs', () => {
  it('renders all KPI labels and values correctly', () => {
    render(<Overview />);

    // Verify KPI Labels
    expect(screen.getByText('Total Active Users')).toBeInTheDocument();
    expect(screen.getByText('Monthly Listeners')).toBeInTheDocument();
    expect(screen.getByText('Revenue (Today)')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();

    // Verify KPI Values
    expect(screen.getByText('842.5k')).toBeInTheDocument();
    expect(screen.getByText('24.1M')).toBeInTheDocument();
    expect(screen.getByText('$14,205')).toBeInTheDocument();
    expect(screen.getByText('4.2%')).toBeInTheDocument();
  });
});
