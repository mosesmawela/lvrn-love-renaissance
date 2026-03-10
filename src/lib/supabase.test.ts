import { describe, it, expect } from 'vitest';
import { isValidUrl } from './supabase';

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://supabase.co')).toBe(true);
    expect(isValidUrl('https://project.supabase.co')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('://bad-url')).toBe(false);
    expect(isValidUrl('http//missing-colon.com')).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isValidUrl(undefined)).toBe(false);
  });
});
