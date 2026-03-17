import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArtistAnalytics } from './ArtistAnalytics';
import { musicDataService } from '../../services/music-data-service';
import userEvent from '@testing-library/user-event';

vi.mock('../../services/music-data-service', () => ({
  musicDataService: {
    getUnifiedAnalytics: vi.fn(),
  },
}));

vi.mock('framer-motion', () => {
    return {
        motion: {
            div: ({ children, ...props }: any) => <div {...props}>{children}</div>
        },
        AnimatePresence: ({ children }: any) => <>{children}</>
    }
});


const mockData = {
  artist: {
    id: '1',
    name: 'Test Artist',
    images: [{ url: 'test.jpg' }],
    spotify: { popularity: 80, followers: 1000, listeners: 5000 },
    appleMusic: { plays: 15000000, listeners: 2000, shazams: 500 }, // Test > 1000000 for 'M'
    youtube: { views: 50000, subscribers: 1500 }
  },
  topTracks: [],
  globalMetrics: {
    totalReach: 15000000,
    engagementRate: 5.5,
    growthPercentage: 10.2
  }
};

describe('ArtistAnalytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    vi.mocked(musicDataService.getUnifiedAnalytics).mockImplementation(() => new Promise(() => {}));

    render(<ArtistAnalytics artistName="Test Artist" />);

    expect(screen.getByText('Hydrating Analytics...')).toBeInTheDocument();
  });

  it('renders overview analytics data after loading', async () => {
    vi.mocked(musicDataService.getUnifiedAnalytics).mockResolvedValue(mockData as any);

    render(<ArtistAnalytics artistName="Test Artist" />);

    await waitFor(() => {
      expect(screen.queryByText('Hydrating Analytics...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Precise Music Data')).toBeInTheDocument();
    expect(screen.getByText('Real-time performance metrics for Test Artist')).toBeInTheDocument();
    expect(screen.getByText('15.0M')).toBeInTheDocument(); // totalReach / 1000000
    expect(screen.getByText('5.5%')).toBeInTheDocument();
    expect(screen.getByText('+10.2%')).toBeInTheDocument();
  });

  it('renders platform stats correctly when tabs are clicked', async () => {
    const user = userEvent.setup();
    vi.mocked(musicDataService.getUnifiedAnalytics).mockResolvedValue(mockData as any);

    render(<ArtistAnalytics artistName="Test Artist" />);

    await waitFor(() => {
      expect(screen.queryByText('Hydrating Analytics...')).not.toBeInTheDocument();
    });

    const spotifyTab = screen.getByRole('button', { name: /spotify/i });
    await user.click(spotifyTab);

    expect(screen.getByText('popularity')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('followers')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('listeners')).toBeInTheDocument();
    expect(screen.getByText('5,000')).toBeInTheDocument();

    const appleTab = screen.getByRole('button', { name: /apple/i });
    await user.click(appleTab);

    expect(screen.getByText('plays')).toBeInTheDocument();
    expect(screen.getByText('15.0M')).toBeInTheDocument(); // Formatted M

    const youtubeTab = screen.getByRole('button', { name: /youtube/i });
    await user.click(youtubeTab);

    expect(screen.getByText('views')).toBeInTheDocument();
    expect(screen.getByText('50,000')).toBeInTheDocument();
  });

  it('returns null if no data is found after loading', async () => {
    vi.mocked(musicDataService.getUnifiedAnalytics).mockResolvedValue(null as any);

    const { container } = render(<ArtistAnalytics artistName="Test Artist" />);

    await waitFor(() => {
      expect(screen.queryByText('Hydrating Analytics...')).not.toBeInTheDocument();
    });

    expect(container).toBeEmptyDOMElement();
  });
});
