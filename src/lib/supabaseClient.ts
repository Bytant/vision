
import { createClient } from '@supabase/supabase-js';

// Use explicit fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

// Log whether environment variables are set
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase environment variables are not set. Using fallback values for development. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables for production use.'
  );
}

// Create a single instance of the Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});
