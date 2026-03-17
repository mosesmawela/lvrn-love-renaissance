import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AiAssistant } from '../AiAssistant';
import { useExperience } from '../ExperienceProvider';

// Mock the ExperienceProvider hook
vi.mock('../ExperienceProvider', () => ({
  useExperience: vi.fn(),
}));

// Mock GoogleGenAI
const mockGenerateContent = vi.fn();
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: class MockGoogleGenAI {
      models = {
        generateContent: mockGenerateContent,
      };
      constructor() {}
    }
  };
});

describe('AiAssistant', () => {
  const mockShowNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useExperience as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      hasEntered: true,
      targetSection: 'home',
      showNotification: mockShowNotification,
      navigateTo: vi.fn(),
    });

    // Crucial: AiAssistant accesses process.env.API_KEY directly inside useEffect
    vi.stubEnv('API_KEY', 'test-api-key');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders correctly when active', () => {
    render(<AiAssistant />);
    expect(screen.getByLabelText('Toggle AI Assistant')).toBeInTheDocument();
  });

  it('handles message generation failure correctly', async () => {
    // We need to wait for the AiAssistant to finish initialization.
    // In AiAssistant.tsx, if process.env.API_KEY is not defined when the component mounts,
    // it will be disabled (system offline).

    // Setup the mock to throw an error
    mockGenerateContent.mockRejectedValue(new Error('API Error'));

    render(<AiAssistant />);

    // Open the assistant
    const toggleButton = screen.getByLabelText('Toggle AI Assistant');
    fireEvent.click(toggleButton);

    // Wait for the input to be available
    // It is important to ensure the input is not disabled.
    const input = await screen.findByRole('textbox') as HTMLInputElement;
    expect(input.disabled).toBe(false);
    expect(input.placeholder).toBe('Enter command...');

    // Type a message and send
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Assert that the error notification was called with the correct arguments
    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith('AI Connection Unstable', 'error');
    });

    // Assert that the error message was added to the chat
    expect(screen.getByText('Connection unstable. Unable to process request.')).toBeInTheDocument();
  });
});
