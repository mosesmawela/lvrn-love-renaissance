
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust check to prevent crash on invalid URL
export const isValidUrl = (url: string | undefined) => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const urlToUse = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder-project.supabase.co';
const keyToUse = supabaseAnonKey || 'placeholder-key';

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is invalid or missing. Using placeholder to prevent crash.');
}

export const supabase = createClient(urlToUse, keyToUse);
