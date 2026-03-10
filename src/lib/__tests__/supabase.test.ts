import { describe, it, expect } from 'vitest';
import { isValidUrl } from '../supabase';

describe('isValidUrl', () => {
  it('should return true for a valid URL', () => {
    expect(isValidUrl('https://example.supabase.co')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('https://127.0.0.1:8000')).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('https://')).toBe(false);
    expect(isValidUrl('http//invalid')).toBe(false);
    expect(isValidUrl('example.supabase.co')).toBe(false); // Missing protocol
  });

  it('should return false for empty or undefined inputs', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl(undefined)).toBe(false);
  });

  it('should return false for whitespace strings', () => {
    expect(isValidUrl(' ')).toBe(false);
    expect(isValidUrl('   ')).toBe(false);
  });
});
