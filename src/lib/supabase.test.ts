import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isValidUrl } from './supabase';

describe('isValidUrl', () => {
  it('returns true for a valid URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://xyz123.supabase.co')).toBe(true);
  });

  it('returns false for an invalid URL', () => {
    expect(isValidUrl('not a url')).toBe(false);
    expect(isValidUrl('example.com')).toBe(false);
    expect(isValidUrl('htp:/invalid.com')).toBe(false);
  });

  it('returns false for undefined or empty string', () => {
    expect(isValidUrl(undefined)).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });
});

describe('Supabase Initialization', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY when valid', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://valid-project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'valid-key');

    const { supabase } = await import('./supabase');
    expect(supabase).toBeDefined();
    expect((supabase as any).supabaseUrl).toBe('https://valid-project.supabase.co');
    expect((supabase as any).supabaseKey).toBe('valid-key');
  });

  it('falls back to placeholders when VITE_SUPABASE_URL is invalid', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'invalid-url');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'some-key');

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { supabase } = await import('./supabase');
    expect(supabase).toBeDefined();
    expect((supabase as any).supabaseUrl).toBe('https://placeholder-project.supabase.co');
    expect((supabase as any).supabaseKey).toBe('some-key');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Supabase URL or Anon Key is invalid or missing. Using placeholder to prevent crash.');

    consoleWarnSpy.mockRestore();
  });

  it('falls back to placeholders when VITE_SUPABASE_ANON_KEY is missing', async () => {
    vi.stubEnv('VITE_SUPABASE_URL', 'https://valid-project.supabase.co');
    vi.stubEnv('VITE_SUPABASE_ANON_KEY', '');

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { supabase } = await import('./supabase');
    expect(supabase).toBeDefined();
    expect((supabase as any).supabaseUrl).toBe('https://valid-project.supabase.co');
    expect((supabase as any).supabaseKey).toBe('placeholder-key');
    expect(consoleWarnSpy).toHaveBeenCalledWith('Supabase URL or Anon Key is invalid or missing. Using placeholder to prevent crash.');

    consoleWarnSpy.mockRestore();
  });
});
