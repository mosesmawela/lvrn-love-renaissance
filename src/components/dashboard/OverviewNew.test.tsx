import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Overview } from './OverviewNew';

// Mock framer-motion to prevent jsdom animation rendering issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock ArtistAnalytics to isolate testing for the Overview component
vi.mock('./ArtistAnalytics', () => ({
  ArtistAnalytics: () => <div data-testid="artist-analytics-mock">Artist Analytics Mock</div>,
}));

describe('Overview Component', () => {
  it('renders KPI labels and values correctly', () => {
    render(<Overview />);

    // Total Active Users
    expect(screen.getByText('Total Active Users')).toBeInTheDocument();
    expect(screen.getByText('842.5k')).toBeInTheDocument();

    // Monthly Listeners
    expect(screen.getByText('Monthly Listeners')).toBeInTheDocument();
    expect(screen.getByText('24.1M')).toBeInTheDocument();

    // Revenue (Today)
    expect(screen.getByText('Revenue (Today)')).toBeInTheDocument();
    expect(screen.getByText('$14,205')).toBeInTheDocument();

    // Conversion Rate
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('4.2%')).toBeInTheDocument();
  });

  it('renders Quick Actions correctly', () => {
    render(<Overview />);

    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Upload Release')).toBeInTheDocument();
    expect(screen.getByText('New Artist')).toBeInTheDocument();
    expect(screen.getByText('Schedule Drop')).toBeInTheDocument();
    expect(screen.getByText('Create Campaign')).toBeInTheDocument();
  });

  it('renders ArtistAnalytics mock', () => {
    render(<Overview />);
    expect(screen.getByTestId('artist-analytics-mock')).toBeInTheDocument();
  });

  it('renders AI Insights section', () => {
    render(<Overview />);
    expect(screen.getByText('AI Insights')).toBeInTheDocument();
    expect(screen.getByText(/Johannesburg/i)).toBeInTheDocument();
    expect(screen.getByText(/"Buya Ekhaya"/i)).toBeInTheDocument();
  });
});
