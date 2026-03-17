import React from 'react';
import { render } from '@testing-library/react';
import { AiAssistant } from './AiAssistant';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GoogleGenAI } from '@google/genai';

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn(),
  };
});

vi.mock('./ExperienceProvider', () => ({
  useExperience: () => ({
    hasEntered: true,
    navigateTo: vi.fn(),
    showNotification: vi.fn(),
    targetSection: 'default',
  }),
}));

describe('AiAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should catch and log error if GoogleGenAI initialization fails', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Setup environment variables to trigger the initialization attempt
    const originalEnv = process.env;
    process.env = { ...originalEnv, API_KEY: 'test-key' };

    // Mock GoogleGenAI constructor to throw an error
    const mockError = new Error('Test Init Error');
    vi.mocked(GoogleGenAI).mockImplementation(function() {
      throw mockError;
    } as any);

    render(<AiAssistant />);

    expect(consoleErrorSpy).toHaveBeenCalledWith('AI Init Error', mockError);

    process.env = originalEnv;
  });
});
