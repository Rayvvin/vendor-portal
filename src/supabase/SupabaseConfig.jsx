import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
export const supabase = createClient(import.meta.env.VITE_BASE_URL, import.meta.env.VITE_ANON_KEY);




